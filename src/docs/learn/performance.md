---
title: 性能
outline: deep
---

# 构建 JavaScript 编译器中的性能追求

最初发布于 https://rustmagazine.org/issue-3/javascript-compiler/

## 关于性能

在编写了两年 Rust 之后，性能已经成为我根深蒂固的习惯——它归结为
**减少内存分配** 和 **减少 CPU 周期使用**。

然而，如果没有对问题域的了解或对潜在解决方案的认识，要实现最佳性能可能会很困难。

在接下来的章节中，我将带您踏上我的性能和优化之旅。
我喜欢的学习方式是结合研究、试错，因此接下来的章节将以此方式组织。

# 解析

Oxc 是一个标准的编译器，包含抽象语法树 (AST)、词法分析器和递归下降解析器。

## 抽象语法树 (AST)

编译器的第一个架构设计是其 AST。

所有 JavaScript 工具都在 AST 层面工作，例如：

- linter (例如 ESLint) 检查 AST 中的错误
- formatter (例如 prettier) 将 AST 打印回 JavaScript 文本
- minifier (例如 terser) 转换 AST
- bundler 连接不同文件 AST 之间的所有 import 和 export 语句

如果 AST 不够用户友好，构建这些工具将会很痛苦。

对于 JavaScript，最常用的 AST 规范是 [estree](https://github.com/estree/estree)。
我的第一个 AST 版本复制了 estree：

```rust
pub struct Program {
    pub node: Node,
    pub body: Vec<Statement>,
}

pub enum Statement {
    VariableDeclarationStatement(VariableDeclaration),
}

pub struct VariableDeclaration {
    pub node: Node,
    pub declarations: Vec<VariableDeclarator>,
}
```

在 Rust 中，声明树相对直接，因为它涉及使用结构体和枚举。

### 内存分配

在编写解析器期间，我花了几个月时间研究这个版本的 AST。
有一天，我决定对其进行性能分析。分析器显示程序花费了大量时间调用 `drop`。

💡 AST 的节点通过 `Box` 或 `Vec` 在堆上分配，它们是单独分配的，因此它们按顺序被释放。

有什么方法可以缓解这种情况吗？

因此，在研究解析器时，我研究了一些用 Rust 编写的其他 JavaScript 解析器，
主要是 [ratel](https://github.com/ratel-rust/ratel-core) 和 [jsparagus](https://github.com/mozilla-spidermonkey/jsparagus)。

这两个解析器都使用生命周期注解来声明它们的 AST，

```rust
pub enum Statement<'ast> {
    Expression(ExpressionNode<'ast>),
}
```

并且它们都有一个伴随的名为 `arena.rs` 的文件。

我不明白它有什么作用，所以一直忽略它，直到我开始阅读它们关于内存分配器的使用：
[bumpalo](https://docs.rs/bumpalo/latest/bumpalo/) 和 [toolshed](https://docs.rs/toolshed/latest/toolshed/struct.Arena.html)。

总而言之，内存分配器会预先以块或页的形式分配内存，并在分配器被释放时一次性释放所有内存。
AST 在分配器上分配，因此释放 AST 是一个快速操作。

这带来的另一个好处是，
AST 是按特定顺序构建的，树遍历也遵循相同的顺序，从而在访问过程中实现线性内存访问。
这种访问模式将是高效的，因为所有附近的内存都将以页为单位读入 CPU 缓存，从而加快访问速度。

不幸的是，对于 Rust 初学者来说，使用内存分配器可能具有挑战性，因为所有数据结构和相关函数都需要通过生命周期注解进行参数化。
我花了五次尝试才将 AST 分配到 `bumpalo` 中。

将 AST 更改为内存分配器带来了约 20% 的性能提升。

### 枚举大小

由于 AST 的递归性质，我们需要以避免“无间隙递归”错误的方式定义类型：

```
error[E0072]: recursive types `Enum` and `Variant` have infinite size
 --> crates/oxc_linter/src/lib.rs:1:1
  |
1 | enum Enum {
  | ^^^^^^^^^
2 |     Variant(Variant),
  |             ------- recursive without indirection
  |
3 | }
4 | struct Variant {
  | ^^^^^^^^^^^^^^
5 |     field: Enum,
  |            ---- recursive without indirection
  |
help: insert some indirection (e.g., a `Box`, `Rc`, or `&`) to break the cycle
  |
2 ~     Variant(Box<Variant>),
3 | }
4 | struct Variant {
5 ~     field: Box<Enum>,
```

有两种方法可以做到这一点。要么在枚举变体中装箱枚举，要么装箱结构体字段。

我在 2017 年的 Rust 论坛上找到了同样的问题，
[Is there a better way to represent an abstract syntax tree?](https://users.rust-lang.org/t/is-there-a-better-way-to-represent-an-abstract-syntax-tree/9549/4)

Aleksey (matklad) 告诉我们装箱枚举变体以保持 `Expression` 枚举较小。但这又意味着什么呢？

事实证明，Rust 枚举的内存布局取决于其所有变体的大小，其总字节大小取决于最大的变体。
例如，以下枚举将占用 56 字节（1 字节用于标签，48 字节用于有效负载，8 字节用于对齐）。

```rust
enum Enum {
    A, // 0 byte payload
    B(String), // 24 byte payload
    C { first: String, last: String }, // 48 byte payload
}
```

在典型的 JavaScript AST 中，`Expression` 枚举包含 45 个变体，`Statement` 枚举包含 20 个变体。如果不通过枚举变体装箱，它们将占用 200 多字节。
这 200 字节必须传递，并且每次我们执行 `matches!(expr, Expression::Variant(_))` 检查时都需要访问，这对于性能来说对缓存并不友好。

因此，为了使内存访问高效，最好装箱枚举变体。

[perf-book](https://nnethercote.github.io/perf-book/type-sizes.html) 提供了关于如何查找大型类型的额外信息。

我还复制了用于限制小型枚举大小的测试。

```rust
#[cfg(all(target_arch = "x86_64", target_pointer_width = "64"))]
#[test]
fn no_bloat_enum_sizes() {
    use std::mem::size_of;
    use crate::ast::*;
    assert_eq!(size_of::<Statement>(), 16);
    assert_eq!(size_of::<Expression>(), 16);
    assert_eq!(size_of::<Declaration>(), 16);
}
```

装箱枚举变体带来了约 10% 的速度提升。

### Span

有时，直到我们花一些额外时间检查数据结构后，才意识到可以实现更小的内存占用。

在这种情况下，所有 AST 节点的叶子都包含一个称为“span”的小数据结构，用于存储源文本的字节偏移量，并包含两个 `usize`。

```rust
pub struct Node {
    pub start: usize,
    pub end: usize,
}
```

[有人指出](https://github.com/oxc-project/oxc/pull/4#pullrequestreview-1294538874) 我可以安全地将 `usize` 更改为 `u32`
以减少峰值内存，因为大于 `u32` 的文件大小是 4GB。

更改为 `u32` 在[大型文件上将性能提高了高达 5%](https://github.com/oxc-project/oxc/pull/31)。

### 字符串和标识符

在 AST 中，人们可能会尝试使用对标识符名称和字符串字面量的源文本的字符串引用。

```rust
pub struct StringLiteral<'a> {
    pub value: &'a str,
}

pub struct Identifier<'a> {
    pub name: &'a str,
}
```

但不幸的是，在 JavaScript 中，字符串和标识符可以有[转义序列](https://mathiasbynens.be/notes/javascript-escapes)，
即 `'\251'`、`'\xA9'` 和 `'©'` 对于版权符号是相同的。

这意味着我们必须计算转义值并分配一个新的 `String`。

### 字符串驻留

当存在大量堆分配字符串时，
可以使用一种称为[字符串驻留](https://en.wikipedia.org/wiki/String_interning)的技术来存储每个不同字符串值的副本，从而减少总内存。

[string-cache](https://crates.io/crates/string_cache) 是 servo 团队发布的一个流行且广泛使用的库。
最初，我将 `string-cache` 库用于 AST 中的标识符和字符串。
解析器的性能在单线程中很快，
但当我开始实现 linter，其中有多个解析器使用 rayon 并行运行时，
CPU 利用率约为所有核心的 50%。

性能分析后，一个名为 `parking_lot::raw_mutex::RawMutex::lock_slow` 的方法出现在执行时间列表的顶部。
我对锁和多核编程了解不多，
但全局锁一开始就很奇怪，
所以我决定删除 `string-cache` 库以实现完整的 CPU 利用率。

从 AST 中删除 `string-cache` 将并行解析的性能提高了约 30%。

#### string-cache

半年后，在处理另一个性能关键项目时，
`string-cache` 库再次出现。它在并行文本解析期间阻塞了所有线程。

我决定研究 `string-cache` 的作用，因为这次我做好了准备，阅读了 Mara Bos 的著作 [Rust Atomics and Locks](https://marabos.nl/atomics/)。

这是围绕锁的[相关](https://github.com/servo/string-cache/blob/6c044c91bb3d8212dae931152a7895f498574f71/src/dynamic_set.rs#L41-L42)
[代码](https://github.com/servo/string-cache/blob/6c044c91bb3d8212dae931152a7895f498574f71/src/atom.rs#L204)。请注意，代码写于八年前的 2015 年。

```rust
pub(crate) static DYNAMIC_SET: Lazy<Mutex<Set>> = Lazy::new(|| {
    Mutex::new({

// ... 在另一个地方
let ptr: std::ptr::NonNull<Entry> =
    DYNAMIC_SET.lock().insert(string_to_add, hash.g);
```

所以这很直接。每次插入字符串时，它都会锁定 `Set` 数据结构。
由于解析器中频繁调用此例程，其性能会受到同步的负面影响。

现在让我们看一下 [`Set` 数据结构](https://github.com/servo/string-cache/blob/6c044c91bb3d8212dae931152a7895f498574f71/src/dynamic_set.rs#L53-L86)
看看它是做什么的：

```rust
pub(crate) fn insert(&mut self, string: Cow<str>, hash: u32) -> NonNull<Entry> {
    let bucket_index = (hash & BUCKET_MASK) as usize;
    {
        let mut ptr: Option<&mut Box<Entry>> = self.buckets[bucket_index].as_mut();

        while let Some(entry) = ptr.take() {
            if entry.hash == hash && *entry.string == *string {
                if entry.ref_count.fetch_add(1, SeqCst) > 0 {
                    return NonNull::from(&mut **entry);
                }
                entry.ref_count.fetch_sub(1, SeqCst);
                break;
            }
            ptr = entry.next_in_bucket.as_mut();
        }
    }
    debug_assert!(mem::align_of::<Entry>() >= ENTRY_ALIGNMENT);
    let string = string.into_owned();
    let mut entry = Box::new(Entry {
        next_in_bucket: self.buckets[bucket_index].take(),
        hash,
        ref_count: AtomicIsize::new(1),
        string: string.into_boxed_str(),
    });
    let ptr = NonNull::from(&mut *entry);
    self.buckets[bucket_index] = Some(entry);

    ptr
}
```

看起来它正在查找一个存储字符串的桶，如果字符串不在桶中，它会插入字符串。

💡 这是线性探测吗？如果这是线性探测，那么这个 `Set` 只是一个 `HashMap`，只是没有说它是 `HashMap`。
💡 如果这是一个 `HashMap`，那么 `Mutex<HashMap>` 就是一个并发哈希表。

虽然当我们知道要寻找什么时，解决方案似乎很直接，但由于我不知道这个问题，所以我花了一个月才弄清楚。
当显而易见这只是一个并发哈希表时，将 Mutex 应用于桶而不是整个哈希表是一个清晰而合乎逻辑的解决方案。
在实现此更改的一个小时内，我提交了一个拉取请求，并对结果感到满意😃。

```
https://github.com/servo/string-cache/pull/268
```

值得一提的是，字符串驻留是 Rust 社区中的一个战场。
例如，在[这篇博文](https://dev.to/cad97/string-interners-in-rust-797)中展示的示例中，
有单线程库，如 `string-interner`、`lasso`、`lalrpop-intern`、`intaglio` 和 `strena`。

由于我们是并行解析文件，因此一个选择是使用多线程字符串驻留库，例如 [`ustr`](https://crates.io/crates/ustr)。
然而，在对 `ustr` 和增强版的 `string-cache` 进行性能分析后，人们发现与我接下来要解释的方法相比，性能仍然低于预期。

一些初步猜测性能不佳的原因是：

- 哈希 - 驻留器需要哈希字符串进行去重
- 间接引用 - 我们需要从“遥远”的堆中读取字符串值，这不利于缓存

### 字符串内联

所以我们又回到了最初的问题，即必须分配大量字符串。
幸运的是，如果我们看看我们正在处理的数据类型：
短的 JavaScript 变量名和一些短字符串，这个问题有一个部分解决方案。有一种称为字符串内联的技术，
即我们将字符串的所有字节存储在栈上。

本质上，我们希望以下枚举来存储我们的字符串。

```rust
enum Str {
    Static(&'static str),
    Inline(InlineReprensation),
    Heap(String),
}
```

为了最小化枚举的大小，`InlineRepresentation` 应该与 `String` 大小相同。

```rust
#[cfg(all(target_arch = "x86_64", target_pointer_width = "64"))]
#[test]
fn test_size() {
    use std::mem::size_of;
    assert_eq!(size_of::<String>(), size_of::<InlineReprensation>());
}
```

Rust 社区中的许多 crate 都致力于优化内存使用。这又是社区中的一个战场。
最受欢迎的包括

- [smol_str](https://crates.io/crates/smol_str)
- [smartstring](https://crates.io/crates/smartstring)
- [compact_str](https://crates.io/crates/compact_str)
- [flexstr](https://crates.io/crates/flexstr)

这些 crate 各有独特的特性和实现内存优化的方法，导致在选择使用哪个 crate 时需要考虑各种权衡。
例如，`smol_str` 和 `flexstr` 的克隆是 O(1) 的。
在 64 位系统上，`flexstr` 可以存储 22 字节，`smol_str` 和 `smartstring` 可以存储 23 字节，`compact_str` 可以存储 24 字节。

[https://fasterthanli.me](https://fasterthanli.me) 对此主题进行了[深入探讨](https://fasterthanli.me/articles/small-strings-in-rust)。

将 `String` 更改为 `compact_str::CompactStr` 大大减少了内存分配。

## Lexer

### Token

Lexer（也称为 tokenizer）的工作是将源代码文本转换为称为 token 的结构化数据。

```rust
pub struct Token {
    pub kind: Kind,
}
```

为了方便使用，token 的种类通常在 Rust 中定义为枚举。枚举的变体包含每个 token 的相应数据。

```rust
pub enum Kind {
    // 关键字
    For,
    While,
    ...
    // 字面量
    String(String),
    Num(f64),
    ...
}
```

这个枚举目前使用了 32 字节，而 lexer 通常需要构建数百万个这种 token `Kind`。
每次构建 `Kind::For` 或 `Kind::While` 时，都必须在栈上分配 32 字节的内存。

一种改进此问题的巧妙方法是将枚举变体拆分，使 `Kind` 保持为单个字节，并将值移到另一个枚举中，

```rust
pub struct Token<'a> {
    pub kind: Kind,
    pub value: TokenValue
}

pub enum TokenValue {
    None,
    String(String),
    Num(f64),
}
```

由于我们控制所有解析代码，因此我们有责任通过始终为 token 种类声明相应的 token 值来确保其安全性。

虽然 32 字节的 `TokenValue` 已经很小了，但由于它经常被分配，仍然可能对性能产生负面影响。

让我们看一下 `String` 类型，通过使用代码编辑器中的“转到定义”，我们可以找到一些东西，我们将遍历 `String` -> `Vec` -> `RawVec`：

```rust
pub struct String {
    vec: Vec<u8>,
}

pub struct Vec {
    buf: RawVec<T, A>,
    len: usize,
}

pub struct RawVec {
    ptr: Unique<T>,
    cap: usize,
    alloc: A,
}
```

正如宣传的那样，`String` 只是 `u8` 的 `Vec`，而 `Vec` 具有长度和容量字段。
由于我们永远不会修改此字符串，因此在内存使用方面的一种优化是删除 `cap` 字段，而是使用字符串切片 (`&str`)。

```rust
pub enum TokenValue<'a> {
    None,
    String(&'a str),
    Num(f64),
}
```

`TokenValue` 变为 24 字节。

虽然在 `TokenValue` 中使用字符串切片而不是 String 会减少内存使用量，但它确实会带来添加生命周期注解的缺点。
这可能导致与借用检查器出现问题，并且生命周期注解会传播到代码库的其余部分，使我们的代码有些难以管理。
我 8 个月前输掉了借用检查的游戏，但[终于赢了](https://github.com/oxc-project/oxc/pull/174)，当时我重新审视了这个问题。

在有意义的情况下，我们可以始终选择不可变数据的拥有版本，而不是使用引用。
例如，`Box<str>` 用于 `String`，`Box<[u8]>` 用于 `Vec<u8>`。

总而言之，我们可以想出各种技巧来保持我们的数据结构小巧，
这有时会带来性能上的提升。

### Cow

我第一次遇到 `Cow` 这个词是在研究 jsparagus 的代码时，
它有一个名为 [`AutoCow`](https://github.com/mozilla-spidermonkey/jsparagus/blob/212f6bdbc2cae909e7d5cfebf36284560c3c4ef4/crates/parser/src/lexer.rs#L2256) 的基础设施。

我对代码的作用有模糊的理解。
当 JavaScript 字符串被标记化时，
它会在遇到转义序列时分配一个新字符串，或者在不遇到转义序列时返回原始字符串切片：

```rust
fn finish(&mut self, lexer: &Lexer<'alloc>) -> &'alloc str {
    match self.value.take() {
        Some(arena_string) => arena_string.into_bump_str(),
        None => &self.start[..self.start.len() - lexer.chars.as_str().len()],
    }
}
```

这很巧妙，因为 99.9% 的时间它都不会分配新字符串，因为转义字符串很少见。

但是 `Cow` 或“写时复制智能指针”这个术语对我来说一直没有意义。

> Cow 类型是一个智能指针，提供写时复制功能：它可以封装并提供对借用数据的不可变访问，并在需要变异或所有权时惰性地克隆数据。该类型旨在通过 Borrow trait 与通用的借用数据一起使用。

如果你是 Rust 新手（就像我一样），那么这个描述并没有帮助（我仍然不明白它在说什么）。

[有人指出](https://twitter.com/zack_overflow/status/1620387950264713216)，“写时复制”只是这个数据结构的一个用例。一个更好的名字应该是 `RefOrOwned`，因为它是一个包含拥有数据或引用的类型。

### SIMD

我在浏览旧的 Rust 博客时，[Announcing the Portable SIMD Project Group](https://blog.rust-lang.org/inside-rust/2020/09/29/Portable-SIMD-PG.html) 引起了我的注意。
我一直想玩 SIMD，但从未有机会。
经过一些研究，我发现了一个可能适用于解析器的用例：[How quickly can you remove spaces from a string?](https://lemire.me/blog/2017/01/20/how-quickly-can-you-remove-spaces-from-a-string) by Daniel Lemire。
所以事实证明这以前有人做过，在一个名为 RapidJSON 的 JSON 解析器中，
它[使用 SIMD 来删除空白字符](https://rapidjson.org/md_doc_internals.html#SkipwhitespaceWithSIMD)。

所以最终，在 portable-SIMD 和 RapidJSON 代码的帮助下，我不仅成功地[跳过了空白字符](https://github.com/oxc-project/oxc/pull/26)，
我还成功地[跳过了多行注释](https://github.com/oxc-project/oxc/pull/23)。

这两项更改都将性能提高了几个百分点。

### 关键字匹配

在性能配置文件的顶部，
有一个占总执行时间约 1-2% 的热代码路径。

它试图将字符串与 JavaScript 关键字进行匹配：

```rust
fn match_keyword(s: &str) -> Self {
    match s {
        "as" => As,
        "do" => Do,
        "if" => If,
        ...
        "constructor" => Constructor,
        _ => Ident,
    }
}
```

随着 TypeScript 的加入，我们有 84 个字符串需要匹配。
经过一些研究，我发现 V8 的一篇博客 [Blazingly fast parsing, part 1: optimizing the scanner](https://v8.dev/blog/scanner)，
它详细描述了其[关键字匹配代码](https://source.chromium.org/chromium/chromium/src/+/main:v8/src/parsing/keywords-gen.h)。

> 由于关键字列表是静态的，我们可以计算一个完美的哈希函数，该函数为每个标识符提供最多一个候选关键字。V8 使用 gperf 来计算此函数。结果通过长度和前两个标识符字符计算哈希值，以找到单个候选关键字。只有当关键字的长度与输入标识符长度匹配时，我们才将标识符与关键字进行比较。

因此，快速哈希加上整数比较应该比 84 次字符串比较更快。
但是我们[再次](https://github.com/oxc-project/oxc/pull/140)和[再次](https://github.com/oxc-project/oxc/pull/171)尝试，但都没有成功。

事实证明，[LLVM 已经优化了我们的代码](https://github.com/oxc-project/oxc/issues/151#issuecomment-1464818336)。
通过使用 `rustc` 的 `--emit=llvm-ir`，我们找到了相关代码：

```
switch i64 %s.1, label %bb6 [
  i64 2, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit.i"
  i64 3, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit280.i"
  i64 4, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit325.i"
  i64 5, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit380.i"
  i64 6, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit450.i"
  i64 7, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit540.i"
  i64 8, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit590.i"
  i64 9, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit625.i"
  i64 10, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit655.i"
  i64 11, label %"_ZN4core5slice3cmp81_$LT$impl$u20$core..cmp..PartialEq$LT$$u5b$B$u5d$$GT$$u20$for$u20$$u5b$A$u5d$$GT$2eq17h46d405acb5da4997E.exit665.i"
], !dbg !191362
```

`%s` 是字符串，`%s.1` 是它的长度……它正在根据字符串长度进行分支！编译器比我们聪明😃。

（是的，我们对此非常认真，以至于开始查看 LLVM IR 和汇编代码。）

后来，[@strager](https://twitter.com/strager) 发布了一个非常有教育意义的 YouTube 视频 [Faster than Rust and C++: the PERFECT hash table](https://www.youtube.com/watch?v=DMQ_HcNSOAI)，主题是这个。
该视频教我们一种系统的方法来推理性能问题的细微调整。

最后，我们得出结论，简单的关键字匹配对我们来说已经足够了，因为它只占性能的 1-2%，
而且在花费了几天时间之后，这项工作并不值得——Rust 没有我们构建这个完美哈希图所需的所有组件。

## Linter

Linter 是一个分析源代码问题的程序。

最简单的 linter 会访问每个 AST 节点并检查规则。
[访问者模式](https://rust-unofficial.github.io/patterns/patterns/behavioural/visitor.html) 可以用于此：

```rust
pub trait Visit<'a>: Sized {
    // ... 大量的 visit 函数

    fn visit_debugger_statement(&mut self, stmt: &'a DebuggerStatement) {
        // 报告错误
    }
}
```

### 父指针树

使用访问者很容易向下遍历 AST，但如果我们想向上遍历树来收集一些信息该怎么办？

在 Rust 中解决这个问题尤其具有挑战性，因为无法向 AST 节点添加指针。

让我们暂时忘记 AST，专注于具有节点指向其父节点的属性的通用树。
要构建通用树，每个树节点都需要是相同的类型 `Node`，我们可以使用 `Rc` 来引用它们的父节点：

```rust
struct Node {
    parent: Option<Rc<Node>>,
}
```

如果需要变异，使用此模式会很繁琐，
并且由于节点必须在不同时间被丢弃，因此性能不佳。

更有效的解决方案是使用 `Vec` 作为其后备存储，并使用索引作为指针。

```rust
struct Tree {
    nodes: Vec<Node>
}

struct Node {
    parent: Option<usize> // 索引到 `nodes`
}
```

[`indextree`](https://crates.io/crates/indextree) 是这项任务的一个很好的库。

回到我们的 AST，我们可以通过让节点指向包装所有 AST 节点种类的枚举来构建一个 `indextree`。
我们称之为非类型化 AST。

```rust
struct Node<'a> {
    kind: AstKind<'a>
}

enum AstKind<'a> {
    BlockStatement(&'a BlockStatement<'a>),
    // ...
    ArrayExpression(&'a ArrayExpression<'a>),
    // ...
    Class(&'a Class<'a>),
    // ...
}
```

最后缺失的一块是访问者模式中用于构建此树的回调。

```rust
pub trait Visit<'a> {
    fn enter_node(&mut self, _kind: AstKind<'a>) {}
    fn leave_node(&mut self, _kind: AstKind<'a>) {}

    fn visit_block_statement(&mut self, stmt: &'a BlockStatement<'a>) {
        let kind = AstKind::BlockStatement(stmt);
        self.enter_node(kind);
        self.visit_statements(&stmt.body);
        self.leave_node(kind);
    }
}

impl<'a> Visit<'a> for TreeBuilder<'a> {
    fn enter_node(&mut self, kind: AstKind<'a>) {
        self.push_ast_node(kind);
    }

    fn leave_node(&mut self, kind: AstKind<'a>) {
        self.pop_ast_node();
    }
}
```

最终的数据结构变为 `indextree::Arena<Node<'a>>`，其中每个 `Node` 都包含一个指向 `AstKind<'a>` 的指针。
可以调用 `indextree::Node::parent` 来获取任何节点的父节点。

创建这个父指针树的一个好处是，无需实现任何访问者即可方便地访问 AST 节点。
Linter 变成了一个简单的循环，遍历 `indextree` 中的所有节点：

```rust
for node in nodes {
    match node.get().kind {
        AstKind::DebuggerStatement(stmt) => {
        // 报告错误
        }
        _ => {}
    }
}
```

此处提供了一个完整的示例：[here](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/examples/linter.rs)。

乍一看，这个过程可能显得缓慢且效率低下。
然而，通过内存分配器访问类型化的 AST 并将指针推入 `indextree` 是高效的线性内存访问模式。
当前的基准测试表明，这种方法比 ESLint 快 84 倍，因此对于我们的目的来说肯定足够快了。

### 并行处理文件

Linter 使用 [ignore](https://crates.io/crates/ignore) crate 进行目录遍历，
它支持 `.gitignore` 并添加其他忽略文件，例如 `.eslintignore`。

这个 crate 的一个小问题是它没有并行接口，
`ignore::Walk::new(".")` 没有 `par_iter`。

相反，[需要使用原始类型](https://github.com/oxc-project/oxc/blob/b51c2df3cc43b9f7d57380acc1552fac7db75fab/crates/oxc_cli/src/lint/runner.rs#L116-L139)

```rust
let walk = Walk::new(&self.options);
rayon::spawn(move || {
    walk.iter().for_each(|path| {
        tx_path.send(path).unwrap();
    });
});

let linter = Arc::clone(&self.linter);
rayon::spawn(move || {
    while let Ok(path) = rx_path.recv() {
        let tx_error = tx_error.clone();
        let linter = Arc::clone(&linter);
        rayon::spawn(move || {
            if let Some(diagnostics) = Self::lint_path(&linter, &path) {
                tx_error.send(diagnostics).unwrap();
            }
            drop(tx_error);
        });
    }
});
```

这解锁了一个有用的功能，即我们可以将所有诊断信息打印到单个线程中，这引出了本文的最后一个主题。

### 打印很慢

打印诊断信息很快，但我从事这个项目已经很久了，每次在大型 monorepo 上运行 linter 时打印数千条诊断消息都感觉像永恒。
所以我开始搜索 Rust GitHub issue，并最终找到了相关的：

- [io::Stdout should use block buffering when appropriate](https://github.com/rust-lang/rust/issues/60673)
- [stdin and stdout performance considerations are not documented](https://github.com/rust-lang/rust/issues/106133)

总而言之，每次遇到换行符时，`println!` 调用都会锁定 `stdout`，这称为行缓冲。
为了加快打印速度，我们需要选择块缓冲，这[在此处有文档记录](https://rust-cli.github.io/book/tutorial/output.html#a-note-on-printing-performance)。

```rust
use std::io::{self, Write};

let stdout = io::stdout(); // 获取全局 stdout 实体
let mut handle = io::BufWriter::new(stdout); // 可选：将该句柄包装在缓冲区中
writeln!(handle, "foo: {}", 42); // 如果关心错误，请在此处添加 `?`
```

或者获取 stdout 的锁。

```rust
let stdout = io::stdout(); // 获取全局 stdout 实体
let mut handle = stdout.lock(); // 获取其锁
writeln!(handle, "foo: {}", 42); // 如果关心错误，请在此处添加 `?`
```
