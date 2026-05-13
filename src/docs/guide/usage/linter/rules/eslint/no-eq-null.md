---
title: "eslint/no-eq-null | Oxlint"
rule: "eslint/no-eq-null"
category: "Restriction"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_eq_null.rs`;
</script>

<RuleHeader />

### 作用

禁止在不使用类型检查运算符的情况下进行 `null` 比较。

### 为什么这不好？

在没有类型检查运算符（`==` 或 `!=`）的情况下与 `null` 比较，
可能会产生意外结果，因为这类比较不仅在与 `null` 比较时会计算为 `true`，
在与 `undefined` 值比较时也会如此。

### 示例

以下是此规则的**错误**代码示例：

```js
if (foo == null) {
  bar();
}
if (baz != null) {
  bar();
}
```

以下是此规则的**正确**代码示例：

```js
if (foo === null) {
  bar();
}

if (baz !== null) {
  bar();
}

if (bang === undefined) {
  bar();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.14 中添加的。

## 参考资料

<RuleReferences />
