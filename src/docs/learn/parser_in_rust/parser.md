---
id: parser
title: Parser
---

# Parser

我们将要构建的解析器被称为 [递归下降解析器](https://en.wikipedia.org/wiki/Recursive_descent_parser)，
它是按照文法逐步向下遍历并构建 AST 的人工过程。

解析器从简单开始，它保存源代码、词法分析器，以及从词法分析器消费的当前令牌。

```rust
pub struct Parser<'a> {
    /// Source Code
    source: &'a str,

    lexer: Lexer<'a>,

    /// Current Token consumed from the lexer
    cur_token: Token,

    /// The end range of the previous token
    prev_token_end: usize,
}

impl<'a> Parser<'a> {
    pub fn new(source: &'a str) -> Self {
        Self {
            source,
            lexer: Lexer::new(source),
            cur_token: Token::default(),
        }
    }

    pub fn parse(&mut self) -> Program<'a> {
        Ok(Program {
            node: Node {
                start: 0,
                end: self.source.len(),
            }
            body: vec![]
        })
    }
}
```

## Helper functions

当前令牌 `cur_token: Token` 保存从词法分析器返回的当前令牌。
我们将通过添加一些辅助函数来导航和检查这个令牌，从而让解析器代码更清晰。

```rust
impl<'a> Parser<'a> {
    fn start_node(&self) -> Node {
        let token = self.cur_token();
        Node::new(token.start, 0)
    }

    fn finish_node(&self, node: Node) -> Node {
        Node::new(node.start, self.prev_token_end)
    }

    fn cur_token(&self) -> &Token {
        &self.cur_token
    }

    fn cur_kind(&self) -> Kind {
        self.cur_token.kind
    }

    /// Checks if the current index has token `Kind`
    fn at(&self, kind: Kind) -> bool {
        self.cur_kind() == kind
    }

    /// Advance if we are at `Kind`
    fn bump(&mut self, kind: Kind) {
        if self.at(kind) {
            self.advance();
        }
    }

    /// Advance any token
    fn bump_any(&mut self) {
        self.advance();
    }

    /// Advance and return true if we are at `Kind`, return false otherwise
    fn eat(&mut self, kind: Kind) -> bool {
        if self.at(kind) {
            self.advance();
            return true;
        }
        false
    }

    /// Move to the next token
    fn advance(&mut self) {
        let token = self.lexer.next_token();
        self.prev_token_end = self.cur_token.end;
        self.cur_token = token;
    }
}
```

## Parse Functions

`DebuggerStatement` 是最简单的要解析的语句，因此让我们尝试解析它并返回一个有效的程序

```rust
impl<'a> Parser<'a> {
    pub fn parse(&mut self) -> Program {
        let stmt = self.parse_debugger_statement();
        let body = vec![stmt];
        Program {
            node: Node {
                start: 0,
                end: self.source.len(),
            }
            body,
        }
    }

    fn parse_debugger_statement(&mut self) -> Statement {
        let node = self.start_node();
        // NOTE: the token returned from the lexer is `Kind::Debugger`, we'll fix this later.
        self.bump_any();
        Statement::DebuggerStatement {
            node: self.finish_node(node),
        }
    }
}
```

所有其他解析函数都在这些原始辅助函数之上构建，
例如在 swc 中解析 `while` 语句的实现：

```rust
// https://github.com/swc-project/swc/blob/554b459e26b24202f66c3c58a110b3f26bbd13cd/crates/swc_ecma_parser/src/parser/stmt.rs#L952-L970

fn parse_while_stmt(&mut self) -> PResult<Stmt> {
    let start = cur_pos!(self);

    assert_and_bump!(self, "while");

    expect!(self, '(');
    let test = self.include_in_expr(true).parse_expr()?;
    expect!(self, ')');

    let ctx = Context {
        is_break_allowed: true,
        is_continue_allowed: true,
        ..self.ctx()
    };
    let body = self.with_ctx(ctx).parse_stmt(false).map(Box::new)?;

    let span = span!(self, start);
    Ok(Stmt::While(WhileStmt { span, test, body }))
}
```

## Parsing Expressions

表达式的语法是深度嵌套且递归的，
这可能在较长的表达式上导致栈溢出（例如在 [这个 TypeScript 测试](https://github.com/microsoft/TypeScript/blob/main/tests/cases/compiler/binderBinaryExpressionStressJs.ts) 中）。

为避免递归，我们可以使用一种称为“Pratt 解析”的技术。更深入的教程可以在 [这里](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) 找到，由 Rust-Analyzer 的作者撰写。
在 [Rome](https://github.com/rome/tools/blob/5a059c0413baf1d54436ac0c149a829f0dfd1f4d/crates/rome_js_parser/src/syntax/expr.rs#L442) 也有对应的 Rust 版本。

## 列表

有很多地方需要解析以标点符号分隔的列表，例如 `[a, b, c]` 或 `{a, b, c}`。

解析列表的代码都很相似，我们可以使用 [模板方法模式](https://en.wikipedia.org/wiki/Template_method_pattern)
通过使用 trait 来避免重复。

```rust
// https://github.com/rome/tools/blob/85ddb4b2c622cac9638d5230dcefb6cf571677f8/crates/rome_js_parser/src/parser/parse_lists.rs#L131-L157

fn parse_list(&mut self, p: &mut Parser) -> CompletedMarker {
    let elements = self.start_list(p);
    let mut progress = ParserProgress::default();
    let mut first = true;
    while !p.at(JsSyntaxKind::EOF) && !self.is_at_list_end(p) {
        if first {
            first = false;
        } else {
            self.expect_separator(p);

            if self.allow_trailing_separating_element() && self.is_at_list_end(p) {
                break;
            }
        }

        progress.assert_progressing(p);

        let parsed_element = self.parse_element(p);

        if parsed_element.is_absent() && p.at(self.separating_element_kind()) {
            // a missing element
            continue;
        } else if self.recover(p, parsed_element).is_err() {
            break;
        }
    }
    self.finish_list(p, elements)
}
```

This pattern can also prevent us from infinite loops, specifically `progress.assert_progressing(p);`.

Implementation details can then be provided for different lists, for example:

```rust
// https://github.com/rome/tools/blob/85ddb4b2c622cac9638d5230dcefb6cf571677f8/crates/rome_js_parser/src/syntax/expr.rs#L1543-L1580

struct ArrayElementsList;

impl ParseSeparatedList for ArrayElementsList {
    fn parse_element(&mut self, p: &mut Parser) -> ParsedSyntax {
        match p.cur() {
            T![...] => parse_spread_element(p, ExpressionContext::default()),
            T![,] => Present(p.start().complete(p, JS_ARRAY_HOLE)),
            _ => parse_assignment_expression_or_higher(p, ExpressionContext::default()),
        }
    }

    fn is_at_list_end(&self, p: &mut Parser) -> bool {
        p.at(T![']'])
    }

    fn recover(&mut self, p: &mut Parser, parsed_element: ParsedSyntax) -> RecoveryResult {
        parsed_element.or_recover(
            p,
            &ParseRecovery::new(
                JS_UNKNOWN_EXPRESSION,
                EXPR_RECOVERY_SET.union(token_set!(T![']'])),
            ),
            js_parse_error::expected_array_element,
        )
    }

    fn list_kind() -> JsSyntaxKind {
        JS_ARRAY_ELEMENT_LIST
    }

    fn separating_element_kind(&mut self) -> JsSyntaxKind {
        T![,]
    }

    fn allow_trailing_separating_element(&self) -> bool {
        true
    }
}
```

## Cover Grammar

详述见 [cover grammar](/docs/learn/ecmascript/grammar.html#cover-grammar)，有时我们需要将一个 `Expression` 转换为一个 `BindingIdentifier`。像 JavaScript 这样的动态语言可以简单地重写节点类型：

```javascript reference
https://github.com/acornjs/acorn/blob/11735729c4ebe590e406f952059813f250a4cbd1/acorn/src/lval.js#L11-L26
```

但在 Rust 中，我们需要进行从结构体到结构体的转换。一个既美观又干净的方式是使用一个 trait。

```rust
pub trait CoverGrammar<'a, T>: Sized {
    fn cover(value: T, p: &mut Parser<'a>) -> Result<Self>;
}
```

该 trait 将 `T` 作为输入类型，`Self` 和输出类型，因此我们可以定义如下：

```rust
impl<'a> CoverGrammar<'a, Expression<'a>> for BindingPattern<'a> {
    fn cover(expr: Expression<'a>, p: &mut Parser<'a>) -> Result<Self> {
        match expr {
            Expression::Identifier(ident) => Self::cover(ident.unbox(), p),
            Expression::ObjectExpression(expr) => Self::cover(expr.unbox(), p),
            Expression::ArrayExpression(expr) => Self::cover(expr.unbox(), p),
            _ => Err(()),
        }
    }
}

impl<'a> CoverGrammar<'a, ObjectExpression<'a>> for BindingPattern<'a> {
    fn cover(obj_expr: ObjectExpression<'a>, p: &mut Parser<'a>) -> Result<Self> {
        ...
        BindingIdentifier::ObjectPattern(ObjectPattern { .. })
    }
}

impl<'a> CoverGrammar<'a, ArrayExpression<'a>> for BindingPattern<'a> {
    fn cover(expr: ArrayExpression<'a>, p: &mut Parser<'a>) -> Result<Self> {
        ...
        BindingIdentifier::ArrayPattern(ArrayPattern { .. })
    }
}
```

然后在任何需要将 `Expression` 转换为 `BindingPattern` 的地方，调用 `BindingPattern::cover(expression)`。

---

# TypeScript

那么你已经完成了对 JavaScript 的解析，现在想挑战 TypeScript 的解析吗？
坏消息是没有明确定义的规范，
但好消息是 TypeScript 解析器被写在 [一个文件中] 🙃。

## JSX vs TSX

对于以下代码，

```javascript
let foo = <string> bar;
```

如果这是 tsx（未结束的 JSX），则这是一个语法错误，
但它在具有 `TSTypeAssertion` 的情况下是一个正确的 `VariableDeclaration`。

## Lookahead

在某些地方，解析器需要前瞻并且窥视不止一个令牌以确定正确的语法。

### TSIndexSignature

例如，要解析 `TSIndexSignature`，请考虑以下两种情况：

```typescript
type A = { readonly [a: number]: string }
           ^__________________________^ TSIndexSignature

type B = { [a]: string }
           ^_________^ TSPropertySignature
```

对于 type A，在第一个 `{` 上，我们需要向前窥视 5 个令牌（`readonly`、`[`、`a`、`:` 和 `number`），以确保
它是 TSIndexSignature 而不是 TSPropertySignature。

为了实现这一点并提高效率，词法分析器需要一个缓冲区来存储多个令牌。

### Arrow Expressions

在 [cover grammar](/docs/learn/ecmascript/grammar.html#cover-grammar) 中讨论过，
当在 SequenceExpression 之后遇到 `=>` 令牌时，我们需要将 `Expression` 转换为 `BindingPattern`。

但这种方法对 TypeScript 不成立，因为圆括号内的每一项都可能包含 TypeScript 语法，存在太多情况需要覆盖，例如：

```typescript
(<x>a, b as c, d!);
(a?: b = {} as c!) => {};
```

建议研究 TypeScript 的源代码以了解这个具体情况。相关代码是：

```typescript
function tryParseParenthesizedArrowFunctionExpression(
  allowReturnTypeInArrowFunction: boolean,
): Expression | undefined {
  const triState = isParenthesizedArrowFunctionExpression();
  if (triState === Tristate.False) {
    // It's definitely not a parenthesized arrow function expression.
    return undefined;
  }

  // If we definitely have an arrow function, then we can just parse one, not requiring a
  // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
  // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
  // expression instead.
  return triState === Tristate.True
    ? parseParenthesizedArrowFunctionExpression(
        /*allowAmbiguity*/ true,
        /*allowReturnTypeInArrowFunction*/ true,
      )
    : tryParse(() =>
        parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction),
      );
}

//  True        -> We definitely expect a parenthesized arrow function here.
//  False       -> There *cannot* be a parenthesized arrow function here.
//  Unknown     -> There *might* be a parenthesized arrow function here.
//                 Speculatively look ahead to be sure, and rollback if not.
function isParenthesizedArrowFunctionExpression(): Tristate {
  if (
    token() === SyntaxKind.OpenParenToken ||
    token() === SyntaxKind.LessThanToken ||
    token() === SyntaxKind.AsyncKeyword
  ) {
    return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
  }

  if (token() === SyntaxKind.EqualsGreaterThanToken) {
    // ERROR RECOVERY TWEAK:
    // If we see a standalone => try to parse it as an arrow function expression as that's
    // likely what the user intended to write.
    return Tristate.True;
  }
  // Definitely not a parenthesized arrow function.
  return Tristate.False;
}
```

总之，TypeScript 解析器使用前瞻（快速路径）和回溯的组合来解析箭头函数。
