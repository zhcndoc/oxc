---
title: "oxc/misrefactored-assign-op"
category: "Suspicious"
version: "0.1.1"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/misrefactored_assign_op.rs`;
</script>

<RuleHeader />

### 它的作用

https://rust-lang.github.io/rust-clippy/master/#/misrefactored_assign_op

检查 `a op= a op b` 或 `a op= b op a` 模式。

### 为什么这不好？

这些很可能是错误，原本想写的是 `a op= b`。

### 示例

以下是此规则的**不正确**代码示例：

```javascript
a += a + b;
a -= a - b;
```

以下是此规则的**正确**代码示例：

```javascript
a += b;
a -= b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考资料

<RuleReferences />
