---
title: 规范
outline: deep
---

# 规范

[ECMAScript® 语言规范](https://tc39.es/ecma262/)（一个活标准）详细介绍了 JavaScript 语言的一切，因此任何人都可以实现自己的 JavaScript 引擎。

我们的解析器需要研究以下章节：

- 第 5 章：表示约定
- 第 11 章：ECMAScript 语言：源文本
- 第 12 章：ECMAScript 语言：词法语法
- 第 13 - 16 章：表达式、语句、函数、类、脚本和模块
- 附录 B：面向 Web 浏览器的额外 ECMAScript 特性
- 附录 C：ECMAScript 的严格模式

在规范内部导航：

- 任何可点击的内容都有一个永久链接，它们在 URL 中显示为锚点，例如 `#sec-identifiers`
- 悬停在内容上可能会显示工具提示，点击 `References` 会显示其所有引用

## 表示约定

[第 5.1.5 章 语法表示法](https://tc39.es/ecma262/#sec-grammar-notation) 是我们需要阅读的部分。

这里需要注意的事项有：

### 递归

这是列表在语法中的呈现方式。

```
ArgumentList :
  AssignmentExpression
  ArgumentList , AssignmentExpression
```

意味着

```javascript
a, b = 1, c = 2
^_____________^ ArgumentList
   ^__________^ ArgumentList, AssignmentExpression,
          ^___^ AssignmentExpression
```

### 可选

可选语法的 _opt_ 后缀。例如，

```
VariableDeclaration :
  BindingIdentifier Initializer_opt
```

意味着

```javascript
var binding_identifier;
var binding_identifier = Initializer;
                       ______________ Initializer_opt
```

### 参数

`[Return]` 和 `[In]` 是语法的参数。

例如

```
ScriptBody :
    StatementList[~Yield, ~Await, ~Return]
```

意味着脚本中不允许顶层的 yield、await 和 return，但是

```
ModuleItem :
  ImportDeclaration
  ExportDeclaration
  StatementListItem[~Yield, +Await, ~Return]
```

允许顶层 await。

## 源文本

[第 11.2 章 源代码类型](https://tc39.es/ecma262/#sec-types-of-source-code) 告诉我们脚本代码和模块代码之间有巨大的区别。
并且有一个 `use strict` 模式，通过禁止旧的 JavaScript 行为使语法更合理。

**脚本代码** 不是严格模式，需要在文件顶部插入 `use strict` 才能使脚本代码变为严格模式。
在 HTML 中我们写 `<script src="javascript.js"></script>`。

**模块代码** 自动是严格模式。
在 HTML 中我们写 `<script type="module" src="main.mjs"></script>`。

## ECMAScript 语言：词法语法

如需更深入的解释，请阅读 V8 博客上的 [理解 ECMAScript 规范](https://v8.dev/blog/understanding-ecmascript-part-3)。

### [自动分号插入](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)

本节描述了我们在编写 JavaScript 时可以省略分号的所有规则。
所有的解释归结为

```rust
    pub fn asi(&mut self) -> Result<()> {
        if self.eat(Kind::Semicolon) || self.can_insert_semicolon() {
            return Ok(());
        }
        let range = self.prev_node_end..self.cur_token().start;
        Err(SyntaxError::AutoSemicolonInsertion(range.into()))
    }

    pub const fn can_insert_semicolon(&self) -> bool {
        self.cur_token().is_on_new_line || matches!(self.cur_kind(), Kind::RCurly | Kind::Eof)
    }
```

asi 函数需要在适用的地方手动调用，例如在语句的末尾：

```rust
fn parse_debugger_statement(&mut self) -> Result<Statement<'a>> {
    let node = self.start_node();
    self.expect(Kind::Debugger)?;
    self.asi()?; // [!code highlight]
    self.ast.debugger_statement(self.finish_node(node))
}
```

:::info

本节关于 asi 的内容是考虑到解析器而写的，它明确指出源文本是从左到右解析的，这使得几乎不可能以其他方式编写解析器。jsparagus 的作者对此发表了一篇牢骚 [这里](https://github.com/mozilla-spidermonkey/jsparagus/blob/master/js-quirks.md#automatic-semicolon-insertion-)。

> 该特性的规范既非常高层又奇怪地过程化（“当源文本从左到右解析时，遇到一个标记..."，就好像规范在讲述一个关于浏览器的故事。据我所知，这是规范中唯一假设或暗示关于解析内部实现细节的地方。）但很难用其他方式指定 ASI。

:::

## 表达式、语句、函数、类、脚本和模块

理解句法语法需要花费一些时间，然后将它们应用于编写解析器。
