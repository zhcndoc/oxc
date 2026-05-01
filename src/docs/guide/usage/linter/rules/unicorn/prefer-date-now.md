---
title: "unicorn/prefer-date-now"
category: "教条"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_date_now.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 `Date.now()`，而不是 `new Date().getTime()` 或 `new Date().valueOf()`。

### 为什么这不好？

使用 `Date.now()` 比 `new Date().getTime()` 更简洁、更优雅，并且避免了不必要的 `Date` 对象实例化。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const ts = new Date().getTime();
const ts = new Date().valueOf();
```

以下是此规则的**正确**代码示例：

```javascript
const ts = Date.now();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.16 中添加。

## 参考资料

<RuleReferences />
