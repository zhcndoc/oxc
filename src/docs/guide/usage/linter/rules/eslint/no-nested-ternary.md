---
title: "eslint/no-nested-ternary | Oxlint"
rule: "eslint/no-nested-ternary"
category: "样式"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-nested-ternary"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_nested_ternary.rs`;
</script>

<RuleHeader />

### 作用

禁止嵌套的三元表达式，以提升代码可读性和可维护性。

### 为什么这是不好的？

嵌套的三元表达式会让代码更难阅读和理解，也可能使逻辑更复杂，难以调试。

### 示例

以下是此规则的**错误**代码示例：

```js
const result = condition1 ? (condition2 ? "a" : "b") : "c";
```

以下是此规则的**正确**代码示例：

```js
let result;
if (condition1) {
  result = condition2 ? "a" : "b";
} else {
  result = "c";
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.4 中添加。

## 参考资料

<RuleReferences />
