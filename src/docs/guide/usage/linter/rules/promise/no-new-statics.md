---
title: "promise/no-new-statics | Oxlint"
rule: "promise/no-new-statics"
category: "Correctness"
version: "0.6.1"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-new-statics.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_new_statics.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对静态 `Promise` 方法使用 new 调用。

### 为什么这不好？

对静态 `Promise` 方法使用 `new` 是无效的，并且会在运行时导致
`TypeError`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const x = new Promise.resolve(value);
```

以下是此规则的**正确**代码示例：

```javascript
const x = Promise.resolve(value);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.6.1 中添加。

## 参考

<RuleReferences />
