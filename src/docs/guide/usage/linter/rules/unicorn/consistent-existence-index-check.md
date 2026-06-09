---
title: "unicorn/consistent-existence-index-check | Oxlint"
rule: "unicorn/consistent-existence-index-check"
category: "Style"
version: "0.12.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-existence-index-check.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_existence_index_check.rs`;
</script>

<RuleHeader />

### 它的作用

强制对使用 `indexOf()`、`lastIndexOf()`、`findIndex()` 和 `findLastIndex()` 的元素存在性检查保持一致的风格。这样可以确保比较以标准且清晰的方式进行。

### 为什么这不好？

此规则旨在强制特定风格并提升代码可读性。使用不一致的比较风格（例如 `index < 0`、`index >= 0`）会让代码意图变得不清晰，尤其是在大型代码库中。

### 示例

以下是此规则**错误**代码的示例：

```javascript
const index = foo.indexOf("bar");
if (index < 0) {
}

const index = foo.indexOf("bar");
if (index >= 0) {
}
```

以下是此规则**正确**代码的示例：

```javascript
const index = foo.indexOf("bar");
if (index === -1) {
}

const index = foo.indexOf("bar");
if (index !== -1) {
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.12.0 中添加。

## 参考资料

<RuleReferences />
