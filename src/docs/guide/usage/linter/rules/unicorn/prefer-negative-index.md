---
title: "unicorn/prefer-negative-index | Oxlint"
rule: "unicorn/prefer-negative-index"
category: "Style"
version: "0.13.2"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_negative_index.rs`;
</script>

<RuleHeader />

### 作用

在可能的情况下，优先使用负索引而不是 `.length - index`。

### 为什么这不好？

在 `at` 或 `slice` 中使用负索引通常比使用 `.length - index` 更易读
也更简洁。

### 示例

此规则的**错误**代码示例：

```js
foo.slice(foo.length - 2, foo.length - 1);
foo.at(foo.length - 1);
```

此规则的**正确**代码示例：

```js
foo.slice(-2, -1);
foo.at(-1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.13.2 中添加。

## 参考

<RuleReferences />
