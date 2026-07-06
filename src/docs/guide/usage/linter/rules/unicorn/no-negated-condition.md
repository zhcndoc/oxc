---
title: "unicorn/no-negated-condition | Oxlint"
rule: "unicorn/no-negated-condition"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_negated_condition.rs`;
</script>

<RuleHeader />

### 功能

不允许使用否定条件。

### 为什么这不好？

否定条件更难理解。通过反转条件可以使代码更具可读性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (!a) {
  doSomethingC();
} else {
  doSomethingB();
}

!a ? doSomethingC() : doSomethingB();
```

以下是此规则的**正确**代码示例：

```javascript
if (a) {
  doSomethingB();
} else {
  doSomethingC();
}

a ? doSomethingB() : doSomethingC();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
