---
title: "oxc/erasing-op | Oxlint"
rule: "oxc/erasing-op"
category: "Correctness"
version: "0.1.1"
default: true
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/erasing_op.rs`;
</script>

<RuleHeader />

### 作用

检查擦除型运算，例如 `x * 0`。

基于 https://rust-lang.github.io/rust-clippy/master/#/erasing_op

### 为什么这不好？

整个表达式可以被替换为零。这很可能不是预期的结果，应该进行修正。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let x = 1;
let y = x * 0;
```

以下是此规则的**正确**代码示例：

```javascript
let x = 1;
let y = 0;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考

<RuleReferences />
