---
title: 处理错误
outline: deep
---

# 处理错误

引用自 [Dragon Book](https://www.amazon.com/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811)

> 大多数编程语言规范并没有描述编译器应该如何响应错误；错误处理留给了编译器设计者。
> 从一开始就规划好错误处理既可以简化编译器的结构，又能改善其错误处理能力。

一个完全可恢复的分析器无论我们输入什么都能构建出 AST。
对于 linter 或 formatter 这样的工具，人们希望拥有一个完全可恢复的分析器，以便我们可以对程序的一部分进行操作。

一个会恐慌（panic）的分析器在任何语法不匹配时都会中止，而一个部分可恢复的分析器将从确定性语法中恢复。

例如，给定一个语法不正确的 while 语句 `while true {}`，我们知道它缺少圆括号，
并且它唯一可以拥有的标点符号是圆括号，所以我们仍然可以返回一个有效的 AST 并指出它缺少括号。

大多数现有的 JavaScript 分析器都是部分可恢复的，所以我们也这样做，构建一个部分可恢复的分析器。

:::info
Biome 分析器是一个完全可恢复的分析器。
:::

Rust 拥有 `Result` 类型用于返回和传播错误。
结合 `?` 语法，解析函数将保持简单和清晰。

通常我们会包装 Result 类型，以便稍后替换错误：

```rust
pub type Result<T> = std::result::Result<T, ()>;
```

我们的解析函数将返回一个 Result，例如：

```rust
pub fn parse_binding_pattern(&mut self, ctx: Context) -> Result<BindingPattern<'a>> {
    match self.cur_kind() {
        Kind::LCurly => self.parse_object_binding_pattern(ctx),
        Kind::LBrack => self.parse_array_binding_pattern(ctx),
        kind if kind.is_binding_identifier() => {
          // ... 代码省略
        }
        _ => Err(()), // [!code highlight]
    }
}
```

我们可以添加一个 `expect` 函数，如果当前令牌不匹配语法则返回错误：

```rust
/// 期望一个 `Kind` 或返回错误
pub fn expect(&mut self, kind: Kind) -> Result<()> {
    if !self.at(kind) {
        return Err(())
    }
    self.advance();
    Ok(())
}
```

并使用它如下：

```rust
pub fn parse_paren_expression(&mut self, ctx: Context) -> Result<Expression> {
    self.expect(Kind::LParen)?;
    let expression = self.parse_expression(ctx)?;
    self.expect(Kind::RParen)?;
    Ok(expression)
}
```

:::info

为了完整性，词法分析器函数 `read_next_token` 在词法分析时发现意外的 `char` 也应该返回 `Result`

:::

### `Error` Trait

为了返回特定的错误，我们需要填充 `Result` 的 `Err` 部分：

```rust
pub type Result<T> = std::result::Result<T, SyntaxError>;
                                            ^^^^^^^^^^^
#[derive(Debug)]
pub enum SyntaxError {
    UnexpectedToken(String),
    AutoSemicolonInsertion(String),
    UnterminatedMultiLineComment(String),
}
```

我们称之为 `SyntaxError`，因为 ECMAScript 规范语法部分定义的所有“早期错误”都是语法错误。

为了使其成为真正的 `Error`，它需要实现 [`Error` Trait](https://doc.rust-lang.org/std/error/trait.Error.html)。为了代码更清晰，我们可以使用 [`thiserror`](https://docs.rs/thiserror/latest/thiserror) crate 中的宏：

```rust
#[derive(Debug, Error)]
pub enum SyntaxError {
    #[error("Unexpected Token")]
    UnexpectedToken,

    #[error("Expected a semicolon or an implicit semicolon after a statement, but found none")]
    AutoSemicolonInsertion,

    #[error("Unterminated multi-line comment")]
    UnterminatedMultiLineComment,
}
```

然后我们可以添加一个 `expect` 辅助函数，如果令牌不匹配则抛出错误：

```rust
/// 期望一个 `Kind` 或返回错误
pub fn expect(&mut self, kind: Kind) -> Result<()> {
    if self.at(kind) {
        return Err(SyntaxError::UnexpectedToken);
    }
    self.advance(kind);
    Ok(())
}
```

`parse_debugger_statement` 现在可以使用 `expect` 函数进行适当的错误管理：

```rust
fn parse_debugger_statement(&mut self) -> Result<Statement> {
    let node = self.start_node();
    self.expect(Kind::Debugger)?;
    Ok(Statement::DebuggerStatement {
        node: self.finish_node(node),
    })
}
```

注意 `expect` 后面的 `?`，
它是一种称为 ["问号运算符"](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator) 的语法糖，用于
如果 `expect` 函数返回 `Err`，则使函数提前返回。

### 漂亮的错误报告

[`miette`](https://docs.rs/miette/latest/miette) 是现有最好的错误报告 crate 之一，
它提供漂亮的彩色输出

![miette](https://raw.githubusercontent.com/zkat/miette/main/images/serde_json.png)

将 `miette` 添加到你的 `Cargo.toml`

```toml
[dependencies]
miette = { version = "5", features = ["fancy"] }
```

我们可以用 `miette` 包装我们的 `Error`，而不修改解析器中定义的 `Result` 类型：

```rust
pub fn main() -> Result<()> {
    let source_code = "".to_string();
    let file_path = "test.js".to_string();
    let mut parser = Parser::new(&source_code);
    parser.parse().map_err(|error| {
        miette::Error::new(error).with_source_code(miette::NamedSource::new(file_path, source_code))
    })
}
```
