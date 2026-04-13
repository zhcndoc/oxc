---
title: 抽象语法树
outline: deep
---

# AST

下一章中的解析器负责将令牌（Tokens）转换为抽象语法树（AST）。
与源代码文本相比，在 AST 上工作要愉快得多。

所有 JavaScript 工具都在 AST 层面工作，例如：

- 一个 linter（例如 ESLint）检查 AST 中的错误
- 一个 formatter（例如 prettier）将 AST 打印回 JavaScript 文本
- 一个 minifier（例如 terser）转换 AST
- 一个 bundler 连接不同文件 AST 之间的所有 import 和 export 语句

在本章中，让我们通过使用 Rust 结构体和枚举来构建一个 JavaScript AST。

## 熟悉 AST

为了让我们熟悉 AST，让我们访问 [ASTExplorer](https://astexplorer.net/) 看看它是什么样子的。
在顶部面板中，选择 JavaScript，然后选择 `acorn`，输入 `var a`，我们将看到一个树视图和一个 JSON 视图。

```json
{
  "type": "Program",
  "start": 0,
  "end": 5,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 5,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 5,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "a"
          },
          "init": null
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```

由于这是一棵树，每个对象都是一个带有类型名称的节点（例如 `Program`、`VariableDeclaration`、`VariableDeclarator`、`Identifier`）。
`start` 和 `end` 是相对于源代码的偏移量。

## estree

[estree](https://github.com/estree/estree) 是 JavaScript 的社区标准语法规范，
它定义了 [所有 AST 节点](https://github.com/estree/estree/blob/master/es5.md)，以便不同的工具
可以相互兼容。

任何 AST 节点的基本构建块是 `Node` 类型：

```rust
#[derive(Debug, Default, Clone, Copy, Serialize, PartialEq, Eq)]
pub struct Node {
    /// 源代码中的起始偏移量
    pub start: usize,

    /// 源代码中的结束偏移量
    pub end: usize,
}

impl Node {
    pub fn new(start: usize, end: usize) -> Self {
        Self { start, end }
    }
}
```

`var a` 的 AST 定义为

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

pub struct VariableDeclarator {
    pub node: Node,
    pub id: BindingIdentifier,
    pub init: Option<Expression>,
}

pub struct BindingIdentifier {
    pub node: Node,
    pub name: String,
}

pub enum Expression {
}
```

Rust 没有继承，所以 `Node` 被添加到每个结构体中（这称为“组合优于继承”）。

`Statement` 和 `Expression` 是枚举，因为它们将扩展许多其他节点类型，例如：

```rust
pub enum Expression {
    AwaitExpression(AwaitExpression),
    YieldExpression(YieldExpression),
}

pub struct AwaitExpression {
    pub node: Node,
    pub expression: Box<Expression>,
}

pub struct YieldExpression {
    pub node: Node,
    pub expression: Box<Expression>,
}
```

需要 `Box` 是因为 Rust 不允许自引用结构体。

:::info
JavaScript 语法有很多繁琐之处，阅读 [语法教程](/docs/learn/ecmascript/grammar.html) 以供娱乐。
:::

## Rust 优化

### 内存分配

我们需要留意堆分配的结构体，如 `Vec` 和 `Box`，因为堆分配开销不小。

看看 [swc 的真实世界实现](https://github.com/swc-project/swc/blob/main/crates/swc_ecma_ast/src/expr.rs)，
我们可以看到一个 AST 可能有很多 `Box` 和 `Vec`，还要注意 `Statement` 和 `Expression` 枚举包含
十几个枚举变体。

### 内存 Arena

使用全局内存分配器对于 AST 来说实际上并不是真的很高效。
每个 `Box` 和 `Vec` 都是按需分配然后单独释放的。
我们想要做的是预分配内存并批量释放它。

:::info
另见 [Rust 中的 Arenas](https://manishearth.github.io/blog/2021/03/15/arenas-in-rust) 和 [扁平化 ASTs](https://www.cs.cornell.edu/~asampson/blog/flattening.html) 以获取更多关于在内存 arena 中存储 AST 的背景信息。
:::

[`bumpalo`](https://docs.rs/bumpalo/latest/bumpalo/) 是我们用例的一个非常好的候选者，根据其文档：

> Bump 分配是一种快速但有限的分配方法。
> 我们有一块内存，并且我们在该内存中维护一个指针。每当我们要分配一个对象时，
> 我们会快速检查块中是否有足够的容量来分配该对象，然后通过对象的大小更新指针。就是这样！
>
> bump 分配的缺点是没有通用方法来释放单个对象或回收不再使用的对象的内存区域。
>
> 这些权衡使得 bump 分配非常适合面向阶段的分配。也就是说，一组对象将在同一程序阶段期间全部分配、使用，然后可以作为一个组全部分配释放。

通过使用 `bumpalo::collections::Vec` 和 `bumpalo::boxed::Box`，我们的 AST 将添加生命周期：

```rust
use bumpalo::collections::Vec;
use bumpalo::boxed::Box;

pub enum Expression<'a> {
    AwaitExpression(Box<'a, AwaitExpression>),
    YieldExpression(Box<'a, YieldExpression>),
}

pub struct AwaitExpression<'a> {
    pub node: Node,
    pub expression: Expression<'a>,
}

pub struct YieldExpression<'a> {
    pub node: Node,
    pub expression: Expression<'a>,
}
```

:::info
如果在这个阶段我们还不习惯处理生命周期，请谨慎行事。
我们的程序在没有内存 arena 的情况下也能正常工作。

为了简单起见，后续章节中的代码没有演示内存 arena 的使用。
:::

### 枚举大小

我们要进行的第一个优化是减小枚举的大小。

众所周知，Rust 枚举的字节大小是其所有变体的联合。
例如，以下枚举将占用 56 字节（标签 1 字节，负载 48 字节，对齐 8 字节）。

```rust
enum Name {
    Anonymous, // 0 字节负载
    Nickname(String), // 24 字节负载
    FullName{ first: String, last: String }, // 48 字节负载
}
```

:::info
此示例取自 [这篇博客文章](https://adeschamps.github.io/enum-size)
:::

至于 `Expression` 和 `Statement` 枚举，在我们当前的设置下，它们可能占用超过 200 字节。

这 200 字节需要被传递，或者每次我们进行 `matches!(expr, Expression::AwaitExpression(_))` 检查时都需要访问，
这对性能来说并不是很缓存友好。

更好的方法是将枚举变体装箱，只携带 16 字节。

```rust
pub enum Expression {
    AwaitExpression(Box<AwaitExpression>),
    YieldExpression(Box<YieldExpression>),
}

pub struct AwaitExpression {
    pub node: Node,
    pub expression: Expression,
}

pub struct YieldExpression {
    pub node: Node,
    pub expression: Expression,
}
```

为了确保枚举在 64 位系统上确实是 16 字节，我们可以使用 `std::mem::size_of`。

```rust
#[test]
fn no_bloat_enum_sizes() {
    use std::mem::size_of;
    assert_eq!(size_of::<Statement>(), 16);
    assert_eq!(size_of::<Expression>(), 16);
}
```

"no bloat enum sizes" 测试用例经常出现在 Rust 编译器源代码中，以确保较小的枚举大小。

```rust
// https://github.com/rust-lang/rust/blob/9c20b2a8cc7588decb6de25ac6a7912dcef24d65/compiler/rustc_ast/src/ast.rs#L3033-L3042

// 一些节点被频繁使用。确保它们不会意外变大。
#[cfg(all(target_arch = "x86_64", target_pointer_width = "64"))]
mod size_asserts {
    use super::*;
    use rustc_data_structures::static_assert_size;
    // 这些按字母顺序排列，易于维护。
    static_assert_size!(AssocItem, 160);
    static_assert_size!(AssocItemKind, 72);
    static_assert_size!(Attribute, 32);
    static_assert_size!(Block, 48);
```

要查找其他大型类型，我们可以运行

```bash
RUSTFLAGS=-Zprint-type-sizes cargo +nightly build -p name_of_the_crate --release
```

并看到

```
print-type-size type: `ast::js::Statement`: 16 bytes, alignment: 8 bytes
print-type-size     discriminant: 8 bytes
print-type-size     variant `BlockStatement`: 8 bytes
print-type-size         field `.0`: 8 bytes
print-type-size     variant `BreakStatement`: 8 bytes
print-type-size         field `.0`: 8 bytes
print-type-size     variant `ContinueStatement`: 8 bytes
print-type-size         field `.0`: 8 bytes
print-type-size     variant `DebuggerStatement`: 8 bytes
print-type-size         field `.0`: 8 bytes
```

## JSON 序列化

[serde](https://serde.rs/) 可用于将 AST 序列化为 JSON。需要一些技术使其与 `estree` 兼容。
以下是一些示例：

```rust
use serde::Serialize;

#[derive(Debug, Clone, Serialize, PartialEq)]
#[serde(tag = "type")]
#[cfg_attr(feature = "estree", serde(rename = "Identifier"))]
pub struct IdentifierReference {
    #[serde(flatten)]
    pub node: Node,
    pub name: Atom,
}

#[derive(Debug, Clone, Serialize, PartialEq, Hash)]
#[serde(tag = "type")]
#[cfg_attr(feature = "estree", serde(rename = "Identifier"))]
pub struct BindingIdentifier {
    #[serde(flatten)]
    pub node: Node,
    pub name: Atom,
}

#[derive(Debug, Serialize, PartialEq)]
#[serde(untagged)]
pub enum Expression<'a> {
    ...
}
```

- `serde(tag = "type")` 用于使结构体名称成为一个 "type" 字段，即 `{ "type" : "..." }`
- `cfg_attr` + `serde(rename)` 用于将不同的结构体名称重命名为相同的名称，因为 `estree` 不区分不同的标识符
- 枚举上的 `serde(untagged)` 用于不为枚举创建额外的 JSON 对象
