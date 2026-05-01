---
title: "eslint/new-cap"
category: "Style"
version: "0.15.5"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/new_cap.rs`;
</script>

<RuleHeader />

### 作用

此规则要求构造函数名称以大写字母开头。

### 为什么不好？

JavaScript 中的 new 运算符会创建特定类型对象的新实例。
该类型的对象由构造函数表示。
由于构造函数只是普通函数，唯一的定义特征是在调用时使用了 new。
原生 JavaScript 函数以大写字母开头，以区分那些要用作构造函数的函数和不是用作构造函数的函数。
许多风格指南建议遵循此模式，以便更容易确定哪些函数将用作构造函数。

**警告**：
选项 `newIsCapExceptionPattern` 和 `capIsNewExceptionPattern` 是使用 [rust regex 语法](https://docs.rs/regex/latest/regex/) 实现的。不支持许多 JavaScript 功能（前瞻、后顾...）。

### 示例

此规则 **错误** 代码示例：

```js
function foo(arg) {
  return Boolean(arg);
}
```

使用默认 `{ "newIsCap": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": true }] */

var friend = new person();
```

使用默认 `{ "newIsCap": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": true }] */

var friend = new Person();
```

使用 `{ "newIsCap": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": false }] */

var friend = new person();
```

使用默认 `{ "capIsNew": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": true }] */

var colleague = Person();
```

使用默认 `{ "capIsNew": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": true }] */

var colleague = new Person();
```

使用 `{ "capIsNew": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": false }] */

var colleague = Person();
```

使用 `{ "newIsCapExceptions": ["events"] }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptions": ["events"] }] */

var events = require("events");

var emitter = new events();
```

使用 `{ "newIsCapExceptionPattern": "^person\\.." }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptionPattern": "^person\\.." }] */

var friend = new person.acquaintance();

var bestFriend = new person.friend();
```

使用 `{ "newIsCapExceptionPattern": "\\.bar$" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptionPattern": "\\.bar$" }] */

var friend = new person.bar();
```

使用 `{ "capIsNewExceptions": ["Person"] }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptions": ["Person"] }] */

function foo(arg) {
  return Person(arg);
}
```

使用 `{ "capIsNewExceptionPattern": "^person\\.." }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "^person\\.." }] */

var friend = person.Acquaintance();
var bestFriend = person.Friend();
```

使用 `{ "capIsNewExceptionPattern": "\\.Bar$" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "\\.Bar$" }] */

foo.Bar();
```

使用 `{ "capIsNewExceptionPattern": "^Foo" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "^Foo" }] */

var x = Foo(42);

var y = Foobar(42);

var z = Foo.Bar(42);
```

### 属性

使用默认 `{ "properties": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "properties": true }] */

var friend = new person.acquaintance();
```

使用默认 `{ "properties": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "properties": true }] */

var friend = new person.Acquaintance();
```

使用 `{ "properties": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "properties": false }] */

var friend = new person.acquaintance();
```

使用默认 `{ "newIsCap": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": true }] */

var friend = new person();
```

使用默认 `{ "newIsCap": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": true }] */

var friend = new Person();
```

使用 `{ "newIsCap": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCap": false }] */

var friend = new person();
```

使用默认 `{ "capIsNew": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": true }] */

var colleague = Person();
```

使用默认 `{ "capIsNew": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": true }] */

var colleague = new Person();
```

使用 `{ "capIsNew": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNew": false }] */

var colleague = Person();
```

使用 `{ "newIsCapExceptions": ["events"] }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptions": ["events"] }] */

var events = require("events");

var emitter = new events();
```

使用 `{ "newIsCapExceptionPattern": "^person\\.." }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptionPattern": "^person\\.." }] */

var friend = new person.acquaintance();

var bestFriend = new person.friend();
```

使用 `{ "newIsCapExceptionPattern": "\\.bar$" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "newIsCapExceptionPattern": "\\.bar$" }] */

var friend = new person.bar();
```

使用 `{ "capIsNewExceptions": ["Person"] }` 选项时，此规则其他 **正确** 代码示例：

::: correct

```js
/* new-cap: ["error", { "capIsNewExceptions": ["Person"] }] */

function foo(arg) {
  return Person(arg);
}
```

使用 `{ "capIsNewExceptionPattern": "^person\\.." }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "^person\\.." }] */

var friend = person.Acquaintance();
var bestFriend = person.Friend();
```

使用 `{ "capIsNewExceptionPattern": "\\.Bar$" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "\\.Bar$" }] */

foo.Bar();
```

使用 `{ "capIsNewExceptionPattern": "^Foo" }` 选项时，此规则其他 **正确** 代码示例：

```js
/* new-cap: ["error", { "capIsNewExceptionPattern": "^Foo" }] */

var x = Foo(42);

var y = Foobar(42);

var z = Foo.Bar(42);
```

使用默认 `{ "properties": true }` 选项时，此规则 **错误** 代码示例：

```js
/* new-cap: ["error", { "properties": true }] */

var friend = new person.acquaintance();
```

使用默认 `{ "properties": true }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "properties": true }] */

var friend = new person.Acquaintance();
```

使用 `{ "properties": false }` 选项时，此规则 **正确** 代码示例：

```js
/* new-cap: ["error", { "properties": false }] */

var friend = new person.acquaintance();
```

## 配置

此规则接受具有以下属性的配置对象：

### capIsNew

类型：`boolean`

默认值：`true`

`true` 要求所有名称以大写字母开头的函数都必须使用 `new` 调用。

### capIsNewExceptionPattern

类型：`string`

用于匹配名称以大写字母开头的函数异常的正则表达式模式。

### capIsNewExceptions

类型：`string[]`

默认值：`[]`

忽略名称以大写字母开头的函数的异常。

### newIsCap

类型：`boolean`

默认值：`true`

`true` 要求所有构造函数名称以大写字母开头，例如 `new Person()`。

### newIsCapExceptionPattern

类型：`string`

用于匹配构造函数名称以大写字母开头的异常的正则表达式模式。

### newIsCapExceptions

类型：`string[]`

默认值：`["Array", "Boolean", "Date", "Error", "Function", "Number", "Object", "RegExp", "String", "Symbol", "BigInt"]`

忽略构造函数名称以大写字母开头的异常。

### properties

类型：`boolean`

默认值：`true`

`true` 要求对象属性大写（例如，`new obj.Method()`）。

## 如何使用

<RuleHowToUse />

## Version

此规则是在 v0.15.5 中添加的。

## References

<RuleReferences />
