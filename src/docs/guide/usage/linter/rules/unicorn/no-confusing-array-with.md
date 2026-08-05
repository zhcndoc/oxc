---
title: "unicorn/no-confusing-array-with | Oxlint"
rule: "unicorn/no-confusing-array-with"
category: "可疑"
version: "1.73.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-confusing-array-with.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_confusing_array_with.rs`;
</script>

<RuleHeader />

### 功能

禁止令人困惑的 [`Array#with()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with) 用法。

### 为什么这是不好的？

与 `slice()` 或 `splice()` 等方法不同，`Array#with()` 会将负索引视为从数组末尾开始计算的偏移量。使用负的静态索引通常是错误的。使用 `.length` 作为索引总是会产生 `undefined`，因为有效索引的范围是
`0 .. length - 1`。

### 示例

此规则认为以下代码是**错误**的：

```javascript
array.with(-1, value);
array.with(array.length, value);
```

此规则认为以下代码是**正确**的：

```javascript
array.with(array.length - 1, value);
array.with(index, value);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.73.0 中添加。

## 参考资料

<RuleReferences />
