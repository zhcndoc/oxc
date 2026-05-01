---
title: "eslint/func-names"
category: "Style"
version: "0.7.0"
default: false
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/func_names.rs`;
</script>

<RuleHeader />

### 作用

要求或禁止命名函数表达式。

### 为什么不好？

如果不给函数命名，会导致 `<anonymous>` 出现在其中抛出的错误或其中调用的任何函数抛出的错误的堆栈跟踪中。
这使得查找错误抛出位置变得更加困难。
提供显式名称还可以提高可读性和一致性。

示例配置：

```json
{
  "func-names": ["error", "as-needed", { "generators": "never" }]
}
```

### 示例

此规则 **错误** 代码示例：

```js
/* func-names: ["error", "always"] */

Foo.prototype.bar = function () {};
const cat = { meow: function () {} };
(function () {
  /* ... */
})();
export default function () {}
```

此规则 **正确** 代码示例：

```js
/* func-names: ["error", "always"] */

Foo.prototype.bar = function bar() {};
const cat = { meow() {} };
(function bar() {
  /* ... */
})();
export default function foo() {}
```

#### `as-needed`

使用 `"as-needed"` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "as-needed"] */

Foo.prototype.bar = function () {};
(function () {
  /* ... */
})();
export default function () {}
```

使用 `"as-needed"` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "as-needed"] */

const bar = function () {};
const cat = { meow: function () {} };
class C {
  #bar = function () {};
  baz = function () {};
}
quux ??= function () {};
(function bar() {
  /* ... */
})();
export default function foo() {}
```

#### `never`

使用 `"never"` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "never"] */

Foo.prototype.bar = function bar() {};
(function bar() {
  /* ... */
})();
```

使用 `"never"` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "never"] */

Foo.prototype.bar = function () {};
(function () {
  /* ... */
})();
```

#### `generators`

使用 `"always", { "generators": "as-needed" }` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "always", { "generators": "as-needed" }] */

(function* () {
  /* ... */
})();
```

使用 `"always", { "generators": "as-needed" }` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "always", { "generators": "as-needed" }] */

const foo = function* () {};
```

使用 `"always", { "generators": "never" }` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "always", { "generators": "never" }] */

const foo = bar(function* baz() {});
```

使用 `"always", { "generators": "never" }` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "always", { "generators": "never" }] */

const foo = bar(function* () {});
```

使用 `"as-needed", { "generators": "never" }` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "as-needed", { "generators": "never" }] */

const foo = bar(function* baz() {});
```

使用 `"as-needed", { "generators": "never" }` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "as-needed", { "generators": "never" }] */

const foo = bar(function* () {});
```

使用 `"never", { "generators": "always" }` 选项时此规则 **错误** 代码示例：

```js
/* func-names: ["error", "never", { "generators": "always" }] */

const foo = bar(function* () {});
```

使用 `"never", { "generators": "always" }` 选项时此规则 **正确** 代码示例：

```js
/* func-names: ["error", "never", { "generators": "always" }] */

const foo = bar(function* baz() {});
```

## 配置

### 第 1 个选项

类型: `"always" | "as-needed" | "never"`

#### `"always"`

要求所有函数表达式都具有名称。

#### `"as-needed"`

仅当无法自动推断名称时才要求提供名称。

#### `"never"`

禁止函数表达式使用名称。

### 第 2 个选项

此选项是一个具有以下属性的对象：

#### generators

类型: `"always" | "as-needed" | "never"`

生成器函数表达式的配置。如果未指定，则使用主配置。

接受 `always`、`as-needed` 或 `never`。

生成器函数是使用 `function*` 语法定义的函数。

```js
function* foobar(i) {
  yield i;
  yield i + 10;
}
```

## 如何使用

<RuleHowToUse />

## Version

此规则在 v0.7.0 中添加。

## References

<RuleReferences />
