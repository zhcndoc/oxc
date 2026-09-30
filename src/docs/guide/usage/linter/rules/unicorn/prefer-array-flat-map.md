---
title: "unicorn/prefer-array-flat-map | Oxlint"
rule: "unicorn/prefer-array-flat-map"
category: "Perf"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_safe_fix_or_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_flat_map.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用单个 `.flatMap()`，而不是 `.map().flat()` 或 `.filter().flatMap()`。

### 为什么这有问题？

单个 `.flatMap(…)` 可以避免创建中间数组。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const bar = [1, 2, 3].map((i) => [i]).flat();
const result = values.filter((value) => value > 0).flatMap((value) => [value, value]);
```

以下是此规则的**正确**代码示例：

```javascript
const bar = [1, 2, 3].flatMap((i) => [i]);
const result = values.flatMap((value) => (value > 0 ? [value, value] : []));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.14 中添加的。

## 参考

<RuleReferences />
