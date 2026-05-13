---
title: "unicorn/prefer-array-find | Oxlint"
rule: "unicorn/prefer-array-find"
category: "Perf"
version: "0.16.12"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_find.rs`;
</script>

<RuleHeader />

### 它的作用

鼓励在只需要第一个匹配元素时，使用 `Array.prototype.find`，而不是 `filter(...)[0]` 或
类似的模式。

### 为什么这不好？

使用 `filter(...)[0]` 来获取第一个匹配项，不如使用 `find(...)` 高效，也更冗长。
`find` 在找到匹配项时会提前结束，而 `filter` 会遍历整个数组。

### 示例

以下是此规则的**错误**代码示例：

```js
const match = users.filter((u) => u.id === id)[0];
const match = users.filter(fn).shift();
```

以下是此规则的**正确**代码示例：

```js
const match = users.find((u) => u.id === id);
const match = users.find(fn);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.16.12 中添加。

## 参考资料

<RuleReferences />
