---
title: "unicorn/consistent-date-clone | Oxlint"
rule: "unicorn/consistent-date-clone"
category: "Style"
version: "0.15.13"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_date_clone.rs`;
</script>

<RuleHeader />

### 它的作用

Date 构造函数在作为参数传入 `Date` 对象时，可以直接克隆该对象，
因此无需进行时间戳转换。此规则强制使用
直接克隆 `Date`，而不是使用 `.getTime()` 进行转换。

### 为什么这不好？

使用 `.getTime()` 将 `Date` 对象转换为时间戳，再转换回 `Date`，
是多余且不必要的。直接将 `Date` 对象传给
`Date` 构造函数会更简洁，也更高效。

### 示例

以下是此规则的**错误**代码示例：

```js
new Date(date.getTime());
```

以下是此规则的**正确**代码示例：

```js
new Date(date);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.13 中添加。

## 参考资料

<RuleReferences />
