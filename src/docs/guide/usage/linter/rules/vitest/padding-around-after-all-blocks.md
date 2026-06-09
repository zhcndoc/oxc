---
title: "vitest/padding-around-after-all-blocks | Oxlint"
rule: "vitest/padding-around-after-all-blocks"
category: "Style"
version: "1.66.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-after-all-blocks.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/padding_around_after_all_blocks.rs`;
</script>

<RuleHeader />

### 功能说明

此规则要求在一个或多个 `afterAll` 语句之前和之后各保留一行空白。

### 为什么这不好？

代码格式不一致会使代码更难阅读和理解。此规则有助于确保 `afterAll` 块在视觉上与代码的其他部分分隔开来，使其在浏览测试文件时更容易识别。

### 示例

以下是此规则的**错误**代码示例：

```js
const thing = 123;
afterAll(() => {});
```

以下是此规则的**正确**代码示例：

```js
const thing = 123;

afterAll(() => {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.66.0 中添加。

## 参考资料

<RuleReferences />
