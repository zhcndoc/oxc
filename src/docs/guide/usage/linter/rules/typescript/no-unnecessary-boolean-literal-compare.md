---
title: "typescript/no-unnecessary-boolean-literal-compare | Oxlint"
rule: "typescript/no-unnecessary-boolean-literal-compare"
category: "Suspicious"
version: "1.12.0"
default: false
type_aware: true
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_boolean_literal_compare.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_boolean_literal_compare/no_unnecessary_boolean_literal_compare.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许与布尔字面量进行不必要的相等比较。

### 为什么这不好？

当比较可以被消除时，将布尔值与布尔字面量进行比较是不必要的。这些比较只会让代码更冗长，而不会增加任何价值。

### 示例

此规则的**错误**代码示例：

```ts
declare const someCondition: boolean;

if (someCondition === true) {
  // ...
}

if (someCondition === false) {
  // ...
}

if (someCondition !== true) {
  // ...
}

if (someCondition !== false) {
  // ...
}

const result = someCondition == true;
```

此规则的**正确**代码示例：

```ts
declare const someCondition: boolean;

if (someCondition) {
  // ...
}

if (!someCondition) {
  // ...
}

// 允许与非布尔类型进行比较
declare const someValue: unknown;
if (someValue === true) {
  // ...
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowComparingNullableBooleansToFalse

type: `boolean`

default: `true`

是否允许将可空布尔表达式与 `false` 进行比较。
当为 false 时，`x === false`，其中 x 为 `boolean | null`，将被标记。

### allowComparingNullableBooleansToTrue

type: `boolean`

default: `true`

是否允许将可空布尔表达式与 `true` 进行比较。
当为 false 时，`x === true`，其中 x 为 `boolean | null`，将被标记。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
