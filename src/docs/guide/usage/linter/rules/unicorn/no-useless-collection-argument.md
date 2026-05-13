---
title: "unicorn/no-useless-collection-argument | Oxlint"
rule: "unicorn/no-useless-collection-argument"
category: "样式"
version: "1.28.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_collection_argument.rs`;
</script>

<RuleHeader />

### 功能说明

禁止在 `Set`、`Map`、`WeakSet` 或 `WeakMap` 中使用无用的值或回退值。

### 为什么这很糟糕？

在构造 `Set`、`Map`、`WeakSet` 或 `WeakMap` 时，传入空数组或空字符串是不必要的，因为它们接受空值。

对于可能为空的值，提供回退值也是不必要的。

### 示例

以下是此规则的**错误**代码示例：

```js
const set = new Set([]);
const set = new Set("");
```

以下是此规则的**正确**代码示例：

```js
const set = new Set();
```

以下是此规则的**错误**代码示例：

```js
const set = new Set(foo ?? []);
const set = new Set(foo ?? "");
```

以下是此规则的**正确**代码示例：

```js
const set = new Set(foo);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.28.0 中添加。

## 参考资料

<RuleReferences />
