---
title: "eslint/logical-assignment-operators | Oxlint"
rule: "eslint/logical-assignment-operators"
category: "样式"
version: "1.63.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/logical_assignment_operators.rs`;
</script>

<RuleHeader />

### 它的作用

该规则要求或禁止使用逻辑赋值运算符简写。

### 为什么这很糟糕？

ES2021 为逻辑运算符 `||`、`&&` 和 `??` 引入了赋值运算符简写。
在此之前，这种简写只允许用于数学运算，例如 `+` 或 `*`（参见规则 `operator-assignment`）。
当赋值目标与逻辑表达式的左侧表达式相同时，可以使用这种简写。
例如，`a = a || b` 可以简写为 `a ||= b`。

### 示例

以下是此规则在默认 `always` 选项下的**错误**代码示例：

```js
a = a || b;
a = a && b;
a = a ?? b;
a || (a = b);
a && (a = b);
a ?? (a = b);
a = a || b || c;
a = a && b && c;
a = a ?? b ?? c;
```

以下是此规则在默认 `always` 选项下的**正确**代码示例：

```js
a = b;
a += b;
a ||= b;
a = b || c;
a || (b = c);
if (a) a = b;
a = a || b || c;
```

以下是此规则在 `never` 选项下的**错误**代码示例：

```js
a ||= b;
a &&= b;
a ??= b;
```

以下是此规则在 `never` 选项下的**正确**代码示例：

```js
a = a || b;
a = a && b;
a = a ?? b;
```

## 配置

### 第 1 个选项

type: `"always" | "never"`

#### `"always"`

此选项会检查可以使用逻辑赋值运算符简写的表达式。
例如，`a = a || b` 可以简写为 `a ||= b`。
对于具有结合性的表达式，例如 `a = a || b || c`，会被报告为可以简写为 `a ||= b || c`，除非使用括号显式定义求值顺序，例如 `a = (a || b) || c`。

#### `"never"`

此选项禁止使用逻辑赋值运算符简写。
例如，`a ||= b` 应写为 `a = a || b`。

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### enforceForIfStatements

type: `boolean`

default: `false`

此选项会检查 if 语句中的其他模式，这些模式可以用逻辑赋值运算符来表达。
仅在字符串选项设置为 `always` 时可用。

以下是此规则在 `["always", { enforceForIfStatements: true }]` 选项下的**错误**代码示例：

```js
if (a) a = b; // <=> a &&= b
if (!a) a = b; // <=> a ||= b

if (a == null) a = b; // <=> a ??= b
if (a === null || a === undefined) a = b; // <=> a ??= b
```

以下是此规则在 `["always", { enforceForIfStatements: true }]` 选项下的**正确**代码示例：

```js
if (a) b = c;
if (a === 0) a = b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.63.0 中添加。

## 参考资料

<RuleReferences />
