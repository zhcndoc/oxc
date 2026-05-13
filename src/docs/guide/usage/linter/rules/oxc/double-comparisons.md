---
title: "oxc/double-comparisons | Oxlint"
rule: "oxc/double-comparisons"
category: "Correctness"
version: "0.0.22"
default: true
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/double_comparisons.rs`;
</script>

<RuleHeader />

### 它的作用

此规则检查逻辑表达式中的重复比较。

### 这为什么不好？

冗余的比较可能会令人困惑，并使代码更难理解。

### 示例

此规则的**错误**代码示例：

```javascript
x === y || x < y;
x < y || x === y;
```

此规则的**正确**代码示例：

```javascript
x <= y;
x >= y;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.22 中添加。

## 参考资料

<RuleReferences />
