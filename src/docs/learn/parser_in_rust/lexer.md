---
title: 词法分析器
outline: deep
---

# 词法分析器

## 令牌（Token）

词法分析器，也被称为标记器（tokenizer）或扫描器，是负责将源文本转换为令牌的工具。
这些令牌后来会被语法分析器（parser）消费，因此我们不必担心原始文本中的空白符和注释。

让我们从简单的开始，将一个单独的 `+` 文本转换为一个令牌。

```rust
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Token {
    /// 令牌类型
    pub kind: Kind,

    /// 源中的起始偏移
    pub start: usize,

    /// 源中的结束偏移
    pub end: usize,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Kind {
    Eof, // 文件结束
    Plus,
}
```

一个单独的 `+` 会生成

```
[
    Token { kind: Kind::Plus, start: 0, end: 1 },
    Token { kind: Kind::Eof,  start: 1, end: 1 }
]
```

要遍历字符串，我们可以选择两种方式：要么跟踪索引，假装自己在写 C 代码，
要么查看 [字符串文档](https://doc.rust-lang.org/std/primitive.str.html#)，
找到 [`Chars`](https://doc.rust-lang.org/std/str/struct.Chars.html) 迭代器来使用。

:::info
`Chars` 迭代器抽象掉了索引跟踪和边界检查，让我们感觉非常安全。

调用 `chars.next()` 时会返回一个 `Option<char>`。
但请注意，`char` 并不是一个 0-255 的ASCII值，
它是一个utf8 Unicode 码点值，范围从 0 到 0x10FFFF。
:::

让我们定义一个起步的词法分析器抽象

```rust
use std::str::Chars;

struct Lexer<'a> {
    /// 源文本
    source: &'a str,

    /// 剩余的字符
    chars: Chars<'a>
}

impl<'a> Lexer<'a> {
    pub fn new(source: &'a str) -> Self {
        Self {
            source,
            chars: source.chars()
        }
    }
}
```

:::info
这里的生命周期 `'a` 表示迭代器引用了某个地方，它引用的是一个 `&'a str`。
:::

要将源文本转换为令牌，只需不断调用 `chars.next()` 并匹配返回的 `char`。
最终的令牌总是 `Kind::Eof`。

```rust
impl<'a> Lexer<'a> {
    fn read_next_kind(&mut self) -> Kind {
        while let Some(c) = self.chars.next() {
            match c {
              '+' => return Kind::Plus,
              _ => {}
            }
        }
        Kind::Eof
    }

    fn read_next_token(&mut self) -> Token {
        let start = self.offset();
        let kind = self.read_next_kind();
        let end = self.offset();
        Token { kind, start, end }
    }

    /// 获取源文本中偏移量（UTF-8字节数）
    fn offset(&self) -> usize {
        self.source.len() - self.chars.as_str().len()
    }
}
```

在 `fn offset` 中的 `.len()` 和 `.as_str().len()` 方法调用看起来像是O(n)，让我们更深入了解。

[`.as_str()`](https://doc.rust-lang.org/src/core/str/iter.rs.html#112) 返回指向字符串切片的指针

```rust
// https://github.com/rust-lang/rust/blob/b998821e4c51c44a9ebee395c91323c374236bbb/library/core/src/str/iter.rs#L112-L115

pub fn as_str(&self) -> &'a str {
    // SAFETY: `Chars` 只由字符串构建，保证了迭代器的UTF-8合法性。
    unsafe { from_utf8_unchecked(self.iter.as_slice()) }
}
```

一个 [切片](https://doc.rust-lang.org/std/slice/index.html) 是对一块内存的视图，用指针和长度表示。
`.len()` 方法返回存储在切片中的元数据

```rust
// https://github.com/rust-lang/rust/blob/b998821e4c51c44a9ebee395c91323c374236bbb/library/core/src/str/mod.rs#L157-L159

pub const fn len(&self) -> usize {
    self.as_bytes().len()
}
```

```rust
// https://github.com/rust-lang/rust/blob/b998821e4c51c44a9ebee395c91323c374236bbb/library/core/src/str/mod.rs#L323-L325

pub const fn as_bytes(&self) -> &[u8] {
    // SAFETY: 因为两个类型具有相同布局，所以转 transmute 是安全的
    unsafe { mem::transmute(self) }
}
```

```rust
// https://github.com/rust-lang/rust/blob/b998821e4c51c44a9ebee395c91323c374236bbb/library/core/src/slice/mod.rs#L129-L138

pub const fn len(&self) -> usize {
    // FIXME：当 `crate::ptr::metadata(self)` 成为常量稳定版本后，替换此句。
    // 本文撰写时会导致 "常量稳定函数只能调用其他常量稳定函数" 的错误。

    // SAFETY：从 `PtrRepr` 联合体访问值是安全的，因为 *const T
    // 和 PtrComponents<T> 具有相同的内存布局。只有标准库能保证此点。
    unsafe { crate::ptr::PtrRepr { const_ptr: self }.components.metadata }
}
```

以上所有代码都会被编译成一次数据访问，因此 `.as_str().len()` 实际上是 O(1)。

## 瞥视（Peek）

为了对多字符操作符如 `++` 或 `+=` 进行标记化，需要一个辅助函数 `peek`：

```rust
fn peek(&self) -> Option<char> {
    self.chars.clone().next()
}
```

我们不想让原始的 `chars` 迭代器前进，所以对迭代器进行克隆，然后向前移动 index。

:::info
如果深入源码，`clone` 很便宜（[详情点此](https://doc.rust-lang.org/src/core/slice/iter.rs.html#148-152)），
它只是复制了跟踪和边界索引。

```rust
// https://github.com/rust-lang/rust/blob/b998821e4c51c44a9ebee395c91323c374236bbb/library/core/src/slice/iter.rs#L148-L152

impl<T> Clone for Iter<'_, T> {
    fn clone(&self) -> Self {
        Iter { ptr: self.ptr, end: self.end, _marker: self._marker }
    }
}
```

:::

`peek` 与 `chars.next()` 的区别在于，前者总是返回**相同**的下一个 `char`，
而后者会向前移动并返回不同的 `char`。

以字符串 `abc` 为例：

- 重复调用 `peek()` 会返回 `Some('a')`，`Some('a')`，`Some('a')`，...
- 重复调用 `chars.next()` 会返回 `Some('a')`，`Some('b')`，`Some('c')`，`None`。

通过 `peek`，对 `++` 和 `+=` 的标记化只需套用嵌套的 `if` 语句。

这是 [jsparagus](https://github.com/mozilla-spidermonkey/jsparagus) 中的实际示例：

```rust
// https://github.com/mozilla-spidermonkey/jsparagus/blob/master/crates/parser/src/lexer.rs#L1769-L1791

'+' => match self.peek() {
    Some('+') => {
        self.chars.next();
        return self.set_result(
            TerminalId::Increment,
            SourceLocation::new(start, self.offset()),
            TokenValue::None,
        );
    }
    Some('=') => {
        self.chars.next();
        return self.set_result(
            TerminalId::AddAssign,
            SourceLocation::new(start, self.offset()),
            TokenValue::None,
        );
    }
    _ => return self.set_result(
        TerminalId::Plus,
        SourceLocation::new(start, self.offset()),
        TokenValue::None,
    ),
},
```

上述逻辑适用于所有操作符，所以我们可以扩展理解 JavaScript 的词法分析。

## JavaScript

用 Rust 编写的词法分析器相当枯燥，就像写 C 代码一样，
一大串链式的 `if` 语句，每次检查单个字符，然后返回对应的令牌。

真正有趣的部分是在开始 lex JavaScript 时。

让我们打开 [ECMAScript 语言规范](https://tc39.es/ecma262/) ，重新学习 JavaScript。

:::tip
我还记得第一次打开规范时，跑到一个角落，
痛苦地哭了，因为那感觉像在阅读布满术语的外语。
如果理解不了，可以参考我的 [阅读规范指南](/docs/learn/ecmascript/spec.html)。
:::

### 注释

注释没有语义，只要写运行时可以跳过它们，但如果写静态分析器（linter）或打包工具（bundler），它们就必须要考虑。

### 标识符与 Unicode

我们主要使用 ASCII 编码，
但 [第11章 ECMAScript 语言：源文本](https://tc39.es/ecma262/#sec-ecmascript-language-source-code) 指定源文本应使用 Unicode。
[第12.6章 名称与关键字](https://tc39.es/ecma262/#sec-names-and-keywords) 规定：标识符的解析应遵循 Unicode 标准附录 #31 中的 默认标识符语法（Default Identifier Syntax）。
具体来说：

```
IdentifierStartChar ::
    UnicodeIDStart

IdentifierPartChar ::
    UnicodeIDContinue

UnicodeIDStart ::
    具有“ID_Start”属性的任何 Unicode 码点

UnicodeIDContinue ::
    具有“ID_Continue”属性的任何 Unicode 码点
```

这意味着我们可以写 `var ಠ_ಠ` ，但不能写 `var 🦀`，
因为 `ಠ` 具有“ID_Start”属性，而 `🦀` 没有。

:::info

我为此专门发布过 [unicode-id-start](https://crates.io/crates/unicode-id-start) crate。
`unicode_id_start::is_id_start(char)` 和 `unicode_id_start::is_id_continue(char)` 可以调用以检查 Unicode。

:::

### 关键字

所有的 [关键字](https://tc39.es/ecma262/#sec-keywords-and-reserved-words)，如 `if`、`while` 和 `for`，
都需要作为一个整体进行标记化和解释。
它们需要添加到令牌类型枚举中，这样在解析器中就不用进行字符串比较。

```rust
pub enum Kind {
    Identifier,
    If,
    While,
    For
}
```

:::tip
`undefined` 不是关键字，没必要在这里添加。
:::

标记化关键字实际上就是匹配前面定义的标识符。

```rust
fn match_keyword(&self, ident: &str) -> Kind {
    // 所有关键字长度在 1 到 10 之间
    if ident.len() == 1 || ident.len() > 10 {
        return Kind::Identifier;
    }
    match ident {
        "if" => Kind::If,
        "while" => Kind::While,
        "for" => Kind::For,
        _ => Kind::Identifier
    }
}
```

### 令牌值（Token Value）

在后期的编译器阶段，我们经常需要比较标识符、数字和字符串，
例如对静态分析器中的标识符进行检测。

这些值目前存储为纯源文本，
我们可以将它们转换为 Rust 类型，这样处理起来更方便。

```rust{4-6}
pub enum Kind {
    Eof, // 结束符
    Plus,
    Identifier,
    Number,
    String,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Token {
    /// 令牌类型
    pub kind: Kind,

    /// 源中的起始偏移
    pub start: usize,

    /// 源中的结束偏移
    pub end: usize,

    pub value: TokenValue, // [!代码高亮]
}

#[derive(Debug, Clone, PartialEq)]
pub enum TokenValue {
    None,
    Number(f64),
    String(String),
}
```

当标记化到标识符 `foo` 或字符串 `"bar"` 时，会得到如下内容：

```
Token { kind: Kind::Identifier, start: 0, end: 2, value: TokenValue::String("foo") }
Token { kind: Kind::String, start: 0, end: 4, value: TokenValue::String("bar") }
```

要将它们转换成 Rust 字符串，只需调用 `let s = self.source[token.start..token.end].to_string()` ，
并用 `token.value = TokenValue::String(s)` 进行存储。

当标记化一个数字 `1.23` 时，会得到一个有 `Token { start: 0, end: 3 }` 的令牌。
要将其转换为 Rust 的 `f64`，可以调用字符串的 [`parse`](https://doc.rust-lang.org/std/primitive.str.html#method.parse) 方法，例如：`self.source[token.start..token.end].parse::<f64>()` ，
然后将值存入 `token.value`。对于二进制、八进制和十进制整数，其解析技巧可以参考 [jsparagus](https://github.com/mozilla-spidermonkey/jsparagus/blob/master/crates/parser/src/numeric_value.rs)。

## Rust 优化

### 更小的标记

将标记值放在 `Kind` 枚举中，并追求更简洁、更安全的代码，虽然很有吸引力：

```rust
pub enum Kind {
    Number(f64),
    String(String),
}
```

但众所周知，Rust 枚举的字节大小是所有变体的联合体。
这个枚举比原始枚举占用了更多的字节，后者只有1个字节。
在解析器中会大量使用这个 `Kind` 枚举，
处理只有1字节的枚举显然会比多字节的枚举要快。

### 字符串内部化

在编译器中使用 `String` 性能并不优越，主要原因包括：

- `String`是一个堆上分配的对象
- 字符串比较是一个 O(n) 操作

[String Interning](https://en.wikipedia.org/wiki/String_interning) 通过
在缓存中只存放每个不同字符串值的一个副本及其唯一标识符来解决这些问题。
每个不同的标识符或字符串只会有一次堆分配，字符串比较变为 O(1)。

在 [crates.io](https://crates.io/search?q=string%20interning) 上有许多字符串内部化库，
各有优缺点。

一个足够的起点是使用 [`string-cache`](https://crates.io/crates/string_cache)，
它具有 `Atom` 类型和编译时 `atom!("string")` 接口。

使用 `string-cache` 后，`TokenValue` 变为

```rust
#[derive(Debug, Clone, PartialEq)]
pub enum TokenValue {
    None,
    Number(f64),
    String(Atom), // [!code highlight]
}
```

字符串比较变成 `matches!(value, TokenValue::String(atom!("string")))`。
