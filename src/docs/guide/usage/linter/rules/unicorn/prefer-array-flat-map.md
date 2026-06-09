---
title: "unicorn/prefer-array-flat-map | Oxlint"
rule: "unicorn/prefer-array-flat-map"
category: "Perf"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_flat_map.rs`;
</script>

<RuleHeader />

### 它的作用

当 `.map().flat()` 一起使用时，优先使用 `.flatMap()`。

### 为什么这有问题？

使用 `.flatMap(…)` 而不是 `.map(…).flat()` 会稍微更高效一些。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const bar = [1, 2, 3].map((i) => [i]).flat();
```

以下是此规则的**正确**代码示例：

```javascript
const bar = [1, 2, 3].flatMap((i) => [i]);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.14 中添加的。

## 参考

<RuleReferences />
