---
title: "unicorn/prefer-array-find | Oxlint"
rule: "unicorn/prefer-array-find"
category: "性能"
version: "0.16.12"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_find.rs`;
</script>

<RuleHeader />

### 它的作用

建议使用 `Array.prototype.find` 和 `Array.prototype.findLast`，而不是从
`filter(...)` 的结果中获取第一个或最后一个匹配元素。

### 为什么这不好？

使用 `filter(...)[0]` 或数组解构来获取第一个匹配项，相比使用 `find(...)`
效率更低且更加冗长。找到匹配项后，`find` 和 `findLast` 会提前结束查找，而
`filter` 则会遍历整个数组。

### 示例

以下是此规则的**错误**代码示例：

```js
const match = users.filter((u) => u.id === id)[0];
const match = users.filter(fn).shift();
const [match] = users.filter(fn);

const match = users.filter(fn).at(-1);
const match = users.filter(fn).pop();
```

以下是此规则的**正确**代码示例：

```js
const match = users.find((u) => u.id === id);
const match = users.find(fn);

const match = users.findLast(fn);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.16.12 中添加。

## 参考资料

<RuleReferences />
