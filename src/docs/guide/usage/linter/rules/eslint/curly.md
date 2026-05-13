---
title: "eslint/curly | Oxlint"
rule: "eslint/curly"
category: "Style"
version: "0.15.13"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/curly.rs`;
</script>

<RuleHeader />

### 作用

此规则强制对所有控制语句（`if`、`else`、`for`、`while`、`do`、`with`）使用大括号 `{}`。
它确保所有代码块都包裹在大括号中，以提高代码的清晰度和可维护性。

### 为什么不好？

省略大括号会降低代码可读性，并增加出错的可能性，尤其是在深度嵌套或缩进的代码中。
如果以后添加了额外的语句而没有正确地用大括号包裹它们，也可能导致错误。
一致地使用大括号使代码更安全且更易于修改。

### 示例

#### `"all"`（默认）

此规则的 **错误** 代码示例：

```js
/* curly: ["error", "all"] */

if (foo) foo++;
while (bar) bar--;
do foo();
while (bar);
```

此规则的 **正确** 代码示例：

```js
/* curly: ["error", "all"] */

if (foo) {
  foo++;
}
while (bar) {
  bar--;
}
do {
  foo();
} while (bar);
```

#### `"multi"`

使用 `"multi"` 选项时，此规则的 **错误** 代码示例：

```js
/* curly: ["error", "multi"] */

if (foo) {
  foo();
}

if (foo) bar();
else {
  foo();
}
```

使用 `"multi"` 选项时，此规则的 **正确** 代码示例：

```js
/* curly: ["error", "multi"] */

if (foo) foo();
else bar();
```

#### `"multi-line"`

使用 `"multi-line"` 选项时，此规则的 **错误** 代码示例：

```js
/* curly: ["error", "multi-line"] */

if (foo) foo();
else bar();

if (foo) foo(bar, baz);
```

使用 `"multi-line"` 选项时，此规则的 **正确** 代码示例：

```js
/* curly: ["error", "multi-line"] */

if (foo) foo();
else bar();

while (foo) foo();

while (true) {
  doSomething();
  doSomethingElse();
}
```

#### `"multi-or-nest"`

使用 `"multi-or-nest"` 选项时，此规则的 **错误** 代码示例：

```js
/* curly: ["error", "multi-or-nest"] */

while (true)
  if (foo) foo();
  else bar();

if (foo) {
  foo++;
}
```

使用 `"multi-or-nest"` 选项时，此规则的 **正确** 代码示例：

```js
/* curly: ["error", "multi-or-nest"] */

if (foo) {
  if (bar) bar();
}

while (foo) {
  while (bar) bar();
}
```

#### `"consistent"`

启用后，`"consistent"` 强制在 `if-else` 链中一致地使用大括号。
如果链中的一个分支使用了大括号，那么所有分支都必须使用大括号，即使第一个选项没有严格要求。

使用 `"multi"` 和 `"consistent"` 时的 **错误** 代码示例：

```js
/* curly: ["error", "multi", "consistent"] */

if (foo) {
  bar();
  baz();
} else qux();

if (foo) bar();
else {
  baz();
  qux();
}
```

使用 `"multi"` 和 `"consistent"` 时的 **正确** 代码示例：

```js
/* curly: ["error", "multi", "consistent"] */

if (foo) {
  bar();
  baz();
} else {
  qux();
}

if (foo) {
  bar();
} else {
  baz();
  qux();
}
```

使用 `"multi-line"` 和 `"consistent"` 时的 **错误** 代码示例：

```js
/* curly: ["error", "multi-line", "consistent"] */

if (foo) {
  bar();
} else baz();
```

使用 `"multi-line"` 和 `"consistent"` 时的 **正确** 代码示例：

```js
/* curly: ["error", "multi-line", "consistent"] */

if (foo) {
  bar();
} else {
  baz();
}
```

使用 `"multi-or-nest"` 和 `"consistent"` 时的 **错误** 代码示例：

```js
/* curly: ["error", "multi-or-nest", "consistent"] */

if (foo) {
  if (bar) baz();
} else qux();
```

使用 `"multi-or-nest"` 和 `"consistent"` 时的 **正确** 代码示例：

```js
/* curly: ["error", "multi-or-nest", "consistent"] */

if (foo) {
  if (bar) baz();
} else {
  qux();
}
```

## 配置

curly 规则的配置，指定为包含一个或两个元素的数组。

示例：

- `["all"]` - 在所有情况下都需要大括号（默认）
- `["multi"]` - 仅针对多语句块需要大括号
- `["multi-line"]` - 针对多行块需要大括号
- `["multi-or-nest"]` - 针对嵌套或多行块需要大括号
- `["multi", "consistent"]` - 多语句模式，并在 if-else 链中保持一致的大括号

### 第 1 个选项

类型：`"all" | "multi" | "multi-line" | "multi-or-nest"`

curly 规则的执行类型。

#### `"all"`

在所有情况下都需要大括号（默认）

#### `"multi"`

仅当块中有多个语句时才需要大括号

#### `"multi-line"`

当块跨越多行时需要大括号

#### `"multi-or-nest"`

当块嵌套或跨越多行时需要大括号

### 第 2 个选项

类型：`"consistent"`

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.13 中添加。

## 参考资料

<RuleReferences />
