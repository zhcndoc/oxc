---
title: "unicorn/no-array-fill-with-reference-type | Oxlint"
rule: "unicorn/no-array-fill-with-reference-type"
category: "可疑"
version: "1.70.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-fill-with-reference-type.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_fill_with_reference_type.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将引用值用作 `Array#fill()` 的填充值。

### 为什么这不好？

`Array#fill()` 会为每个数组元素复用同一个值。当填充值是对象、数组、类或大多数构造出来的对象时，所有元素都会指向同一个引用，修改其中一个元素也会修改其他元素所共享的那个值。

### 示例

以下是此规则的**错误**代码示例：

```js
const rows = new Array(3).fill({});
rows[0].selected = true; // 每一行现在都带有 `selected`。
```

以下是此规则的**正确**代码示例：

```js
const rows = Array.from({ length: 3 }, () => ({}));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.70.0 中添加的。

## 参考文献

<RuleReferences />
