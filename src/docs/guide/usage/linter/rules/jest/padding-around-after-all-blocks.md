---
title: "jest/padding-around-after-all-blocks | Oxlint"
rule: "jest/padding-around-after-all-blocks"
category: "Style"
version: "1.59.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/padding-around-after-all-blocks.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/padding_around_after_all_blocks.rs`;
</script>

<RuleHeader />

### 作用

此规则要求在 1 个或多个 `afterAll` 语句前后各保留一行空白。

### 为什么这不好？

代码格式不一致会使代码更难阅读和理解。此规则有助于确保 `afterAll` 块在视觉上与其余代码分隔开来，使其在浏览测试文件时更容易识别。

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

此规则于 v1.59.0 中添加。

## 参考资料

<RuleReferences />
