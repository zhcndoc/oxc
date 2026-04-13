---
title: 语义分析
outline: 深度
---

# 语义分析

语义分析是检查我们的源代码是否正确的过程。  
我们需要针对 ECMAScript 规范中的所有 “早期错误”(Early Error) 规则进行检查。

## 上下文

对于诸如 `[Yield]` 或 `[Await]` 的语法上下文，当语法禁止它们时，需要抛出错误，例如：

```text
BindingIdentifier[Yield, Await] :
  Identifier
  yield
  await

13.1.1 静态语义：早期错误

BindingIdentifier[Yield, Await] : yield
* 如果此产生式具有 [Yield] 参数，则为语法错误。

* BindingIdentifier[Yield, Await] : await
如果此产生式具有 [Await] 参数，则为语法错误。
```

需要对以下代码抛出错误：

```javascript
async function* foo() {
  var yield, await;
}
```

因为 `AsyncGeneratorDeclaration` 对 `AsyncGeneratorBody` 具有 `[+Yield]` 和 `[+Await]`：

```text
AsyncGeneratorBody :
  FunctionBody[+Yield, +Await]
```

下面是 Biome 检查 `yield` 关键字的示例：

```rust
// https://github.com/rome/tools/blob/5a059c0413baf1d54436ac0c149a829f0dfd1f4d/crates/rome_js_parser/src/syntax/expr.rs#L1368-L1377

pub(super) fn parse_identifier(p: &mut Parser, kind: JsSyntaxKind) -> ParsedSyntax {
    if !is_at_identifier(p) {
        return Absent;
    }

    let error = match p.cur() {
        T![yield] if p.state.in_generator() => Some(
            p.err_builder("在生成器函数中非法将 `yield` 用作标识符")
                .primary(p.cur_range(), ""),
        ),
```

## 作用域

关于声明错误：

```text
14.2.1 静态语义：早期错误

Block : { StatementList }
* 如果 StatementList 的 LexicallyDeclaredNames 包含任何重复条目，则为语法错误。
* 如果 StatementList 的任意 LexicallyDeclaredNames 条目也出现在 StatementList 的 VarDeclaredNames 中，则为语法错误。
```

我们需要添加一个作用域树。作用域树包含所有在其中声明的 `var` 和 `let`。它也是一棵指向父节点的树，我们需要向上遍历树并在父作用域中搜索绑定标识符。可以使用 [`indextree`](https://docs.rs/indextree/latest/indextree/) 作为数据结构。

```rust
use indextree::{Arena, Node, NodeId};
use bitflags::bitflags;

pub type Scopes = Arena<Scope>;
pub type ScopeId = NodeId;

bitflags! {
    #[derive(Default)]
    pub struct ScopeFlags: u8 {
        const TOP = 1 << 0;
        const FUNCTION = 1 << 1;
        const ARROW = 1 << 2;
        const CLASS_STATIC_BLOCK = 1 << 4;
        const VAR = Self::TOP.bits | Self::FUNCTION.bits | Self::CLASS_STATIC_BLOCK.bits;
    }
}

#[derive(Debug, Clone)]
pub struct Scope {
    /// [严格模式代码](https://tc39.es/ecma262/#sec-strict-mode-code)
    /// [使用严格指令序言](https://tc39.es/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
    pub strict_mode: bool,

    pub flags: ScopeFlags,

    /// [词法声明的名称](https://tc39.es/ecma262/#sec-static-semantics-lexicallydeclarednames)
    pub lexical: IndexMap<Atom, SymbolId, FxBuildHasher>,

    /// [变量声明的名称](https://tc39.es/ecma262/#sec-static-semantics-vardeclarednames)
    pub var: IndexMap<Atom, SymbolId, FxBuildHasher>,

    /// 函数声明
    pub function: IndexMap<Atom, SymbolId, FxBuildHasher>,
}
```

作用域树可以在解析器内部构建以提升性能，或在单独的 AST 通过阶段中构建。

通常，需要一个 `ScopeBuilder`：

```rust
pub struct ScopeBuilder {
    scopes: Scopes,
    root_scope_id: ScopeId,
    current_scope_id: ScopeId,
}

impl ScopeBuilder {
    pub fn current_scope(&self) -> &Scope {
        self.scopes[self.current_scope_id].get()
    }

    pub fn enter_scope(&mut self, flags: ScopeFlags) {
        // 为函数继承严格模式
        // https://tc39.es/ecma262/#sec-strict-mode-code
        let mut strict_mode = self.scopes[self.root_scope_id].get().strict_mode;
        let parent_scope = self.current_scope();
        if !strict_mode
            && parent_scope.flags.intersects(ScopeFlags::FUNCTION)
            && parent_scope.strict_mode
        {
            strict_mode = true;
        }

        let scope = Scope::new(flags, strict_mode);
        let new_scope_id = self.scopes.new_node(scope);
        self.current_scope_id.append(new_scope_id, &mut self.scopes);
        self.current_scope_id = new_scope_id;
    }

    pub fn leave_scope(&mut self) {
      self.current_scope_id = self.scopes[self.current_scope_id].parent().unwrap();
    }
}
```

随后在解析函数内部相应调用 `enter_scope` 与 `leave_scope`，例如在 acorn 中：

```javascript reference
https://github.com/acornjs/acorn/blob/11735729c4ebe590e406f952059813f250a4cbd1/acorn/src/statement.js#L425-L437
```

:::info
这种方式的一个缺点是，对于箭头函数，如果它不是箭头函数而是序列表达式，则可能需要创建临时作用域并在之后丢弃它。  
详细说明见 [覆盖语法](/docs/learn/ecmascript/grammar#cover-grammar)。
:::

### 访问者模式

如果我们决定在另一遍中构建作用域树以简化实现，那么需要对 AST 中的每个节点进行深度优先先序遍历并构建作用域树。

我们可以使用 [访问者模式](https://rust-unofficial.github.io/patterns/patterns/behavioural/visitor.html) 将遍历过程与对每个对象执行的操作分离。

在访问时，我们可以相应地调用 `enter_scope` 与 `leave_scope` 来构建作用域树。
