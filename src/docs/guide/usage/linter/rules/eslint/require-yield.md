---
title: "eslint/require-yield | Oxlint"
rule: "eslint/require-yield"
category: "正确性"
version: "0.0.4"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/require-yield"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/require_yield.rs`;
</script>

<RuleHeader />

### 作用

该规则会为不包含 yield 关键字的生成器函数生成警告。

### 为什么这不好？

这可能是一个错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function* foo() {
  return 10;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.4 中添加。

## 参考资料

<RuleReferences />
