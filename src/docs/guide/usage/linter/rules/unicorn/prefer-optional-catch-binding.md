---
title: "unicorn/prefer-optional-catch-binding | Oxlint"
rule: "unicorn/prefer-optional-catch-binding"
category: "Style"
version: "0.0.17"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_optional_catch_binding.rs`;
</script>

<RuleHeader />

### 作用

如果 catch 绑定参数未被使用，则应省略它。

### 为什么这不好？

如果错误未被使用，那么将其绑定到一个变量上是没有必要的。

### 示例

此规则的**不正确**代码示例：

```javascript
try {
  // ...
} catch (e) {}
```

此规则的**正确**代码示例：

```javascript
try {
  // ...
} catch {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.17 中添加。

## 参考资料

<RuleReferences />
