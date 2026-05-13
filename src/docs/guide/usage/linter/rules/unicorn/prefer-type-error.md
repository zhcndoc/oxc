---
title: "unicorn/prefer-type-error | Oxlint"
rule: "unicorn/prefer-type-error"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_type_error.rs`;
</script>

<RuleHeader />

### 作用

在类型检查的 if 语句之后，强制抛出 `TypeError`，而不是通用的 `Error`。

### 为什么这不好？

在类型检查的 if 语句之后抛出 `TypeError`，而不是通用的 `Error`，更具体，也有助于捕获 bug。

### 示例

此规则的**错误**代码示例：

```javascript
if (Array.isArray(foo)) {
  throw new Error("Expected foo to be an array");
}
```

此规则的**正确**代码示例：

```javascript
if (Array.isArray(foo)) {
  throw new TypeError("Expected foo to be an array");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中加入。

## 参考资料

<RuleReferences />
