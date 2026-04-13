---
title: 语法
outline: deep
---

# 语法

JavaScript 拥有最难解析的语法之一，
本教程详细介绍了我在学习它时所有的辛酸泪。

## LL(1) 语法

根据 [维基百科](https://en.wikipedia.org/wiki/LL_grammar)，

> LL 语法是一种上下文无关语法，可以被 LL 解析器解析，该解析器从左到右解析输入

第一个 **L** 表示从 **L**eft（左）到右扫描源代码，
第二个 **L** 表示构建一个 **L**eftmost（最左）推导树。

上下文无关以及 LL(1) 中的 (1) 意味着可以通过仅查看下一个标记来构建树，而无需其他信息。

LL 语法在学术界特别受关注，因为我们是懒惰的人类，我们希望编写自动生成解析器的程序，这样我们就不需要手动编写解析器了。

不幸的是，大多数工业编程语言都没有一个好的 LL(1) 语法，
这同样适用于 JavaScript。

:::info
Mozilla 几年前启动了 [jsparagus](https://github.com/mozilla-spidermonkey/jsparagus) 项目
并用 [Python 编写了一个 LALR 解析器生成器](https://github.com/mozilla-spidermonkey/jsparagus/tree/master/jsparagus)。
在过去的两年里，他们没有怎么更新它，并在 [js-quirks.md](https://github.com/mozilla-spidermonkey/jsparagus/blob/master/js-quirks.md) 的结尾发出了一个强烈的信号

> 今天我们学到了什么？
>
> - 不要编写 JS 解析器。
> - JavaScript 中存在一些语法上的恐怖之处。但嘿，你不是通过避免所有错误来成为世界上使用最广泛的编程语言的。你是在适当的情况下，为适当的用户提供一个可用的工具。

:::

---

由于其语法的性质，解析 JavaScript 的唯一实用方法是手动编写递归下降解析器，
因此，在我们“自断后路”之前，让我们先学习所有语法上的怪癖。

下面的列表从简单开始，然后会变得难以理解，
所以请喝杯咖啡，慢慢来。

## 标识符

在 `#sec-identifiers` 中定义了三种类型的标识符，

```
IdentifierReference[Yield, Await] :
BindingIdentifier[Yield, Await] :
LabelIdentifier[Yield, Await] :
```

`estree` 和一些 AST 不区分上述标识符，
并且规范也没有用通俗的语言解释它们。

`BindingIdentifier` 是声明，而 `IdentifierReference` 是对绑定标识符的引用。
例如，在 `var foo = bar` 中，`foo` 是语法中的 `BindingIdentifier`，而 `bar` 是 `IdentifierReference`：

```
VariableDeclaration[In, Yield, Await] :
    BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await] opt

Initializer[In, Yield, Await] :
    = AssignmentExpression[?In, ?Yield, ?Await]
```

在 `AssignmentExpression` 之后，我们得到 `PrimaryExpression`

```
PrimaryExpression[Yield, Await] :
    IdentifierReference[?Yield, ?Await]
```

在 AST 中以不同的方式声明这些标识符将极大地简化下游工具，尤其是对于语义分析。

```rust
pub struct BindingIdentifier {
    pub node: Node,
    pub name: Atom,
}

pub struct IdentifierReference {
    pub node: Node,
    pub name: Atom,
}
```

---

## Class 和严格模式

ECMAScript Class 出生于严格模式之后，因此他们决定为了简单起见，类中的所有内容都必须是严格模式。
这在 `#sec-class-definitions` 中被明确说明为 `Node: A class definition is always strict mode code.`（节点：类定义始终是严格模式代码）。

通过将严格模式与函数作用域关联起来很容易声明严格模式，但 `class` 声明没有作用域，
我们需要额外维护一个状态来解析类。

```rust
// https://github.com/swc-project/swc/blob/f9c4eff94a133fa497778328fa0734aa22d5697c/crates/swc_ecma_parser/src/parser/class_and_fn.rs#L85
fn parse_class_inner(
    &mut self,
    _start: BytePos,
    class_start: BytePos,
    decorators: Vec<Decorator>,
    is_ident_required: bool,
) -> PResult<(Option<Ident>, Class)> {
    self.strict_mode().parse_with(|p| {
        expect!(p, "class");
```

---

## 旧式八进制和 Use Strict

`#sec-string-literals-early-errors` 禁止在字符串中使用转义的旧式八进制 `"\01"`：

```
EscapeSequence ::
    LegacyOctalEscapeSequence
    NonOctalDecimalEscapeSequence

如果匹配此产生式的源文本是严格模式代码，则为语法错误。
```

检测此问题的最佳位置是在词法分析器中，它可以询问解析器严格模式状态并相应地抛出错误。

但当与指令混合时，这变得不可能：

```javascript reference
https://github.com/tc39/test262/blob/747bed2e8aaafe8fdf2c65e8a10dd7ae64f66c47/test/language/literals/string/legacy-octal-escape-sequence-prologue-strict.js#L16-L19
```

`use strict` 在转义的旧式八进制之后声明，但仍然需要抛出语法错误。
幸运的是，没有实际代码在指令中使用旧式八进制……除非你想通过上面的 test262 用例。

---

## 非简单参数和严格模式

在非严格模式下允许相同的函数参数 `function foo(a, a) { }`，
我们可以通过添加 `use strict` 来禁止这种情况：`function foo(a, a) { "use strict" }`。
后来在 es6 中，为函数参数添加了其他语法，例如 `function foo({ a }, b = c) {}`。

现在，如果我们编写以下代码，其中“01”是严格模式错误，会发生什么？

```javaScript
function foo(
  value = (function() {
    return "\01";
  }()),
) {
  "use strict";
  return value;
}
```

更具体地说，从解析器的角度来看，如果参数中存在严格模式语法错误，我们应该怎么做？
因此，在 `#sec-function-definitions-static-semantics-early-errors` 中，它只是通过声明来禁止这种情况

```
FunctionDeclaration :
FunctionExpression :

如果 FunctionBodyContainsUseStrict of FunctionBody 为 true 且 IsSimpleParameterList of FormalParameters 为 false，则为语法错误。
```

Chrome 以神秘的消息“Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list”（未捕获的语法错误：具有非简单参数列表的函数中存在非法的 'use strict' 指令）抛出此错误。

ESLint 作者的[这篇博文](https://humanwhocodes.com/blog/2016/10/the-ecmascript-2016-change-you-probably-dont-know/)对此进行了更深入的解释。

:::info

有趣的是，上述规则不适用于你在 TypeScript 中以 `es5` 为目标的情况，它会转译为

```javaScript
function foo(a, b) {
  "use strict";
  if (b === void 0) b = "\01";
}
```

:::

---

## 括号表达式

括号表达式应该没有任何语义含义？
例如，`((x))` 的 AST 可以只是一个单独的 `IdentifierReference`，而不是 `ParenthesizedExpression` -> `ParenthesizedExpression` -> `IdentifierReference`。
JavaScript 语法也是如此。

但是……谁能想到它会有运行时含义。
在 [这个 estree issue](https://github.com/estree/estree/issues/194) 中发现，它显示

```javascript
> fn = function () {};
> fn.name
< "fn"

> (fn) = function () {};
> fn.name
< ''
```

因此，最终 acorn 和 babel 添加了 `preserveParens` 选项以实现兼容性。

---

## If 语句中的函数声明

如果我们严格遵循 `#sec-ecmascript-language-statements-and-declarations` 中的语法：

```
Statement[Yield, Await, Return] :
    ... 许多语句

Declaration[Yield, Await] :
    ... 声明
```

我们为 AST 定义的 `Statement` 节点显然不包含 `Declaration`，

但在 Annex B `#sec-functiondeclarations-in-ifstatement-statement-clauses` 中，
它允许在非严格模式下 `if` 语句的语句位置中进行声明：

```javascript
if (x) {
  function foo() {}
} else function bar() {}
```

---

## 标签语句是合法的

我们可能从未写过一行标签语句，但它在现代 JavaScript 中是合法的，并且不被严格模式禁止。

以下语法是正确的，它返回一个标签语句（而不是对象字面量）。

```javascript
<Foo
  bar={() => {
    baz: "quaz";
  }}
/>
//   ^^^^^^^^^^^ `LabelledStatement`
```

---

## `let` 不是关键字

`let` 不是关键字，因此它允许出现在任何地方，除非语法明确规定 `let` 在这些位置不允许出现。
解析器需要查看 `let` 标记之后的标记，并决定它需要被解析成什么，例如：

```javascript
let a;
let = foo;
let instanceof x;
let + 1;
while (true) let;
a = let[0];
```

---

## For-in / For-of 和 [In] 上下文

如果我们查看 `#prod-ForInOfStatement` 中 `for-in` 和 `for-of` 的语法，
要理解如何解析它们会立即令人困惑。

我们理解的两个主要障碍是 `[lookahead ≠ let]` 部分和 `[+In]` 部分。

如果我们已经解析到 `for (let`，我们需要检查窥视的标记是：

- 不是 `in` 以禁止 `for (let in)`
- 是 `{`、`[` 或标识符以允许 `for (let {} = foo)`、`for (let [] = foo)` 和 `for (let bar = foo)`

一旦到达 `of` 或 `in` 关键字，就需要使用正确的 `[+In]` 上下文传递右侧表达式，以禁止
`#prod-RelationalExpression` 中的两个 `in` 表达式：

```
RelationalExpression[In, Yield, Await] :
    [+In] RelationalExpression[+In, ?Yield, ?Await] in ShiftExpression[?Yield, ?Await]
    [+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]

注意 2：[In] 语法参数是必需的，以避免将关系表达式中的 in 运算符与 for 语句中的 in 运算符混淆。
```

这是 `[In]` 上下文在整个规范中的唯一应用。

另外需要注意的是，语法 `[lookahead ∉ { let, async of }]` 禁止 `for (async of ...)`，
需要明确防范。

---

## 块级函数声明

在 Annex B.3.2 `#sec-block-level-function-declarations-web-legacy-compatibility-semantics` 中，
专门用一整页来解释 `FunctionDeclaration` 在 `Block` 语句中的行为方式。
其核心内容是

```javascript reference
https://github.com/acornjs/acorn/blob/11735729c4ebe590e406f952059813f250a4cbd1/acorn/src/scope.js#L30-L35
```

如果 `FunctionDeclaration` 的名称在函数声明内部，则需要将其视为与 `var` 声明相同。
此代码片段因重新声明错误而失败，因为 `bar` 在块作用域内：

```javascript
function foo() {
  if (true) {
    var bar;
    function bar() {} // 重新声明错误
  }
}
```

同时，以下代码不会出错，因为它在函数作用域内，函数 `bar` 被视为 var 声明：

```javascript
function foo() {
  var bar;
  function bar() {}
}
```

## 语法上下文

语法有 5 个上下文参数，用于允许和禁止某些结构，
即 `[In]`、`[Return]`、`[Yield]`、`[Await]` 和 `[Default]`。

在解析过程中最好保留上下文，例如在 Biome 中：

```rust
// https://github.com/rome/tools/blob/5a059c0413baf1d54436ac0c149a829f0dfd1f4d/crates/rome_js_parser/src/state.rs#L404-L425

pub(crate) struct ParsingContextFlags: u8 {
    /// 解析器是否在生成器函数中，例如 `function* a() {}`
    /// 对应 ECMA 规范中的 `Yield` 参数
    const IN_GENERATOR = 1 << 0;
    /// 解析器是否在函数内部
    const IN_FUNCTION = 1 << 1;
    /// 解析器是否在构造函数内部
    const IN_CONSTRUCTOR = 1 << 2;

    /// 在此上下文中是否允许 async。要么是因为它是 async 函数，要么是支持顶层 await。
    /// 对应 ECMA 规范中的 `Async` 生成器
    const IN_ASYNC = 1 << 3;

    /// 解析器是否正在解析顶层语句（不在类、函数、参数内部）
    const TOP_LEVEL = 1 << 4;

    /// 解析器是否在迭代或 switch 语句中，并且允许 `break`。
    const BREAK_ALLOWED = 1 << 5;

    /// 解析器是否在迭代语句中，并且允许 `continue`。
    const CONTINUE_ALLOWED = 1 << 6;
```

并根据语法相应地切换和检查这些标志。

## AssignmentPattern 与 BindingPattern

在 `estree` 中，`AssignmentExpression` 的左侧是 `Pattern`：

```
extend interface AssignmentExpression {
    left: Pattern;
}
```

而 `VariableDeclarator` 的左侧是 `Pattern`：

```
interface VariableDeclarator <: Node {
    type: "VariableDeclarator";
    id: Pattern;
    init: Expression | null;
}
```

`Pattern` 可以是 `Identifier`、`ObjectPattern`、`ArrayPattern`：

```
interface Identifier <: Expression, Pattern {
    type: "Identifier";
    name: string;
}

interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ AssignmentProperty ];
}

interface ArrayPattern <: Pattern {
    type: "ArrayPattern";
    elements: [ Pattern | null ];
}
```

但从规范的角度来看，我们有以下 JavaScript：

```javascript
// AssignmentExpression:
{ foo } = bar;
  ^^^ IdentifierReference
[ foo ] = bar;
  ^^^ IdentifierReference

// VariableDeclarator
var { foo } = bar;
      ^^^ BindingIdentifier
var [ foo ] = bar;
      ^^^ BindingIdentifier
```

这开始变得令人困惑，因为我们现在面临一个情况，即无法直接区分 `Identifier` 是 `BindingIdentifier` 还是 `Pattern` 中的 `IdentifierReference`：

```rust
enum Pattern {
    Identifier, // 这是 `BindingIdentifier` 还是 `IdentifierReference`？
    ArrayPattern,
    ObjectPattern,
}
```

这将导致解析器管道下游出现各种不必要的代码。
例如，在为语义分析设置作用域时，我们需要检查此 `Identifier` 的父级
以确定是否应将其绑定到作用域。

更好的解决方案是完全理解规范并决定如何处理。

`AssignmentExpression` 和 `VariableDeclaration` 的语法定义如下：

```
13.15 Assignment Operators

AssignmentExpression[In, Yield, Await] :
    LeftHandSideExpression[?Yield, ?Await] = AssignmentExpression[?In, ?Yield, ?Await]

13.15.5 Destructuring Assignment

在处理 AssignmentExpression : LeftHandSideExpression = AssignmentExpression 实例的某些情况下，
LeftHandSideExpression 的解释会使用以下语法进行细化：

AssignmentPattern[Yield, Await] :
    ObjectAssignmentPattern[?Yield, ?Await]
    ArrayAssignmentPattern[?Yield, ?Await]
```

```
14.3.2 Variable Statement

VariableDeclaration[In, Yield, Await] :
    BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]opt
    BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
```

规范通过分别定义 `AssignmentPattern` 和 `BindingPattern` 来区分这两种语法。

因此，在这种情况下，不要害怕偏离 `estree`，为我们的解析器定义额外的 AST 节点：

```rust
enum BindingPattern {
    BindingIdentifier,
    ObjectBindingPattern,
    ArrayBindingPattern,
}

enum AssignmentPattern {
    IdentifierReference,
    ObjectAssignmentPattern,
    ArrayAssignmentPattern,
}
```

我曾陷入一个非常混乱的状态整整一周，直到我最终开悟：
我们需要定义一个 `AssignmentPattern` 节点和一个 `BindingPattern` 节点，而不是一个单一的 `Pattern` 节点。

- `estree` 必须是正确的，因为人们已经使用了它很多年，所以它不可能是错的？
- 在不定义两个单独的节点的情况下，我们将如何清晰地区分模式中的 `Identifier`？我找不到语法在哪里？
- 在浏览了整整一天的规范后…… `AssignmentPattern` 的语法位于主部分“13.15 Assignment Operators”的第五个子部分，副标题为“Supplemental Syntax” 🤯 - 这真的不合适，因为所有语法都定义在主部分，而不是像这个定义在“Runtime Semantics”部分之后。

---

:::tip
以下情况确实难以理解。此处有龙。
:::

## 歧义语法

让我们先像解析器一样思考并解决问题——给定 `/` 标记，它是除法运算符还是正则表达式的开始？

```javascript
a / b;
a / / regex /;
a /= / regex /;
/ regex / / b;
/=/ / /=/;
```

这几乎是不可能的，不是吗？让我们分解这些并遵循语法。

我们需要了解的第一件事是，正如 `#sec-ecmascript-language-lexical-grammar` 中所述，语法驱动词法语法

> 在某些情况下，词法输入元素的识别对消耗这些输入元素的语法语法上下文很敏感。

这意味着解析器负责告诉词法分析器下一个要返回的标记。
上述示例表明，词法分析器需要返回 `/` 标记或 `RegExp` 标记。
为了获得正确的 `/` 或 `RegExp` 标记，规范说明：

> `InputElementRegExp` 目标符号用于所有允许 `RegularExpressionLiteral` 的语法语法上下文……
> 在所有其他上下文中，`InputElementDiv` 用作词法目标符号。

`InputElementDiv` 和 `InputElementRegExp` 的语法是

```
InputElementDiv ::
    WhiteSpace
    LineTerminator
    Comment
    CommonToken
    DivPunctuator <---------- `/` 和 `/=` 标记
    RightBracePunctuator

InputElementRegExp ::
    WhiteSpace
    LineTerminator
    Comment
    CommonToken
    RightBracePunctuator
    RegularExpressionLiteral <-------- `RegExp` 标记
```

这意味着每当语法达到 `RegularExpressionLiteral` 时，`/` 都需要被标记为 `RegExp` 标记（如果它没有匹配的 `/` 则抛出错误）。
在所有其他情况下，我们将 `/` 标记为斜杠标记。

让我们看一个例子：

```
a / / regex /
^ ------------ PrimaryExpression:: IdentifierReference
  ^ ---------- MultiplicativeExpression: MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
    ^^^^^^^^ - PrimaryExpression: RegularExpressionLiteral
```

此语句不匹配任何其他 `Statement` 的开头，
因此它将沿着 `ExpressionStatement` 路径进行：

`ExpressionStatement` --> `Expression` --> `AssignmentExpression` --> ... -->
`MultiplicativeExpression` --> ... -->
`MemberExpression` --> `PrimaryExpression` --> `IdentifierReference`。

我们在 `IdentifierReference` 处停止，而不是 `RegularExpressionLiteral`，
“在所有其他上下文中，`InputElementDiv` 用作词法目标符号”的说法适用。
第一个斜杠是 `DivPunctuator` 标记。

由于这是一个 `DivPunctuator` 标记，
匹配了语法 `MultiplicativeExpression: MultiplicativeExpression MultiplicativeOperator ExponentiationExpression`，
右侧应为 `ExponentiationExpression`。

现在我们来到了 `a / /` 中的第二个斜杠。
通过遵循 `ExponentiationExpression`，
我们到达 `PrimaryExpression: RegularExpressionLiteral`，因为 `RegularExpressionLiteral` 是唯一匹配 `/` 的语法：

```
RegularExpressionLiteral ::
    / RegularExpressionBody / RegularExpressionFlags
```

第二个斜杠将被标记为 `RegExp`，因为
规范说明“`InputElementRegExp` 目标符号用于所有允许 `RegularExpressionLiteral` 的语法语法上下文”。

:::info
作为练习，尝试遵循 `/=/ / /=/` 的语法。
:::

---

## 覆盖语法

首先阅读 [V8 博客文章](https://v8.dev/blog/understanding-ecmascript-part-4) 关于此主题。

总而言之，规范说明了以下三个覆盖语法：

#### CoverParenthesizedExpressionAndArrowParameterList

```
PrimaryExpression[Yield, Await] :
    CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]

在处理 PrimaryExpression[Yield, Await] : CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await] 实例时
    CoverParenthesizedExpressionAndArrowParameterList 的解释会使用以下语法进行细化：

ParenthesizedExpression[Yield, Await] :
    ( Expression[+In, ?Yield, ?Await] )
```

```
ArrowFunction[In, Yield, Await] :
    ArrowParameters[?Yield, ?Await] [no LineTerminator here] => ConciseBody[?In]

ArrowParameters[Yield, Await] :
    BindingIdentifier[?Yield, ?Await]
    CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]
```

这些定义了：

```javascript
let foo = (a, b, c); // SequenceExpression
let bar = (a, b, c) => {}; // ArrowExpression
          ^^^^^^^^^ CoverParenthesizedExpressionAndArrowParameterList
```

一种简单但繁琐的解决方法是先将其解析为 `Vec<Expression>`，
然后编写一个转换函数将其转换为 `ArrowParameters` 节点，即每个单独的 `Expression` 都需要转换为 `BindingPattern`。

值得注意的是，如果我们在解析器中构建作用域树，
即在解析期间为箭头表达式创建作用域，
但不对序列表达式创建作用域，
这并不容易做到。[esbuild](https://github.com/evanw/esbuild) 通过先创建一个临时作用域来解决此问题，
然后如果它不是 `ArrowExpression` 则将其删除。

这在其 [架构文档](https://github.com/evanw/esbuild/blob/master/docs/architecture.md#symbols-and-scopes) 中有所说明：

> 这大部分都很简单，除了少数地方，解析器已经推入了一个作用域，并且正在解析声明，但后来发现它实际上不是声明。这在 TypeScript 中发生在函数被前向声明但没有主体时，在 JavaScript 中发生在当它不确定一个括号表达式是否是箭头函数，直到稍后遇到 `=>` 标记时。这可以通过进行三个传递而不是两个传递来解决，这样我们就可以在开始设置作用域和声明符号之前完成解析，但我们试图在两个传递中完成此操作。所以我们调用 `popAndDiscardScope()` 或 `popAndFlattenScope()` 而不是 `popScope()` 来在我们的假设被证明是错误的情况下稍后修改作用域树。

---

#### CoverCallExpressionAndAsyncArrowHead

```
CallExpression :
    CoverCallExpressionAndAsyncArrowHead

在处理 CallExpression : CoverCallExpressionAndAsyncArrowHead 实例时
    CoverCallExpressionAndAsyncArrowHead 的解释会使用以下语法进行细化：

CallMemberExpression[Yield, Await] :
    MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
```

```
AsyncArrowFunction[In, Yield, Await] :
    CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] [no LineTerminator here] => AsyncConciseBody[?In]

CoverCallExpressionAndAsyncArrowHead[Yield, Await] :
    MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]

在处理 AsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead => AsyncConciseBody 实例时
    CoverCallExpressionAndAsyncArrowHead 的解释会使用以下语法进行细化：

AsyncArrowHead :
    async [no LineTerminator here] ArrowFormalParameters[~Yield, +Await]
```

这些定义了：

```javascript
async (a, b, c); // CallExpression
async (a, b, c) => {} // AsyncArrowFunction
^^^^^^^^^^^^^^^ CoverCallExpressionAndAsyncArrowHead
```

这看起来很奇怪，因为 `async` 不是关键字。第一个 `async` 是函数名。

---

#### CoverInitializedName

```
13.2.5 Object Initializer

ObjectLiteral[Yield, Await] :
    ...

PropertyDefinition[Yield, Await] :
    CoverInitializedName[?Yield, ?Await]

Note 3: 在某些情况下，ObjectLiteral 用作更受限制的次要语法的覆盖语法。
CoverInitializedName 产生式对于完全覆盖这些次要语法是必需的。然而，使用此产生式会在实际期望 ObjectLiteral 的正常上下文中导致早期语法错误。

13.2.5.1 Static Semantics: Early Errors

除了描述实际的对象初始化器外，ObjectLiteral 产生式还用作 ObjectAssignmentPattern 的覆盖语法，并且可能被识别为 CoverParenthesizedExpressionAndArrowParameterList 的一部分。当 ObjectLiteral 出现在需要 ObjectAssignmentPattern 的上下文中时，以下早期错误规则不适用。此外，当最初解析 CoverParenthesizedExpressionAndArrowParameterList 或 CoverCallExpressionAndAsyncArrowHead 时，它们也不适用。

PropertyDefinition : CoverInitializedName
    I* 如果任何源文本被此产生式匹配，则为语法错误。
```

```
13.15.1 Static Semantics: Early Errors

AssignmentExpression : LeftHandSideExpression = AssignmentExpression
如果 LeftHandSideExpression 是 ObjectLiteral 或 ArrayLiteral，则应用以下早期错误规则：
    * LeftHandSideExpression 必须覆盖一个 AssignmentPattern。
```

这些定义了：

```javascript
({ prop = value } = {}); // ObjectAssignmentPattern
({ prop: value }); // ObjectLiteral with SyntaxError
```

解析器需要解析带有 `CoverInitializedName` 的 `ObjectLiteral`，
如果它没有达到 `=` 来进行 `ObjectAssignmentPattern`，则抛出语法错误。

作为练习，以下哪个 `=` 应该抛出语法错误？

```javascript
let { x = 1 } = ({ x = 1 } = { x: 1 });
```
