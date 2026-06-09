---
title: "unicorn/no-negation-in-equality-check | Oxlint"
rule: "unicorn/no-negation-in-equality-check"
category: "Pedantic"
version: "0.5.3"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negation-in-equality-check.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_negation_in_equality_check.rs`;
</script>

<RuleHeader />

### 作用

禁止在（不）相等检查的左侧使用取反表达式。

### 为什么这不好？

在（不）相等检查左侧使用取反表达式，很可能是因为尝试对整个条件取反而产生的错误。

### 示例

该规则的**不正确**代码示例：

```javascript
if (!foo === bar) {
}

if (!foo !== bar) {
}
```

该规则的**正确**代码示例：

```javascript
if (foo !== bar) {
}

if (!(foo === bar)) {
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.3 中添加。

## 参考资料

<RuleReferences />
