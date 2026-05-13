---
title: "unicorn/no-unnecessary-slice-end | Oxlint"
rule: "unicorn/no-unnecessary-slice-end"
category: "迂腐"
version: "0.16.10"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unnecessary_slice_end.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `slice(...)` 中不必要地传入第二个参数，
对于那些这样做不会改变结果的情况。

### 为什么这不好？

在不使用第二个参数调用 `.slice(...)` 时，第二个参数
默认等于对象的长度。因此，显式传入长度

- 或者使用 `Infinity` - 都是不必要的。

### 示例

以下是此规则的**错误**代码示例：

```js
const foo = string.slice(1, string.length);
const foo = string.slice(1, Infinity);
const foo = string.slice(1, Number.POSITIVE_INFINITY);
```

以下是此规则的**正确**代码示例：

```js
const foo = string.slice(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.16.10 中添加。

## 参考资料

<RuleReferences />
