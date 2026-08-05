---
title: "vitest/padding-around-test-blocks | Oxlint"
rule: "vitest/padding-around-test-blocks"
category: "样式"
version: "1.75.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-test-blocks.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/padding_around_test_blocks.rs`;
</script>

<RuleHeader />

### 功能

此规则要求在一个或多个
`test`/`it` 语句的前后各留出一行空行。

### 为什么这不好？

代码格式不一致会使代码更难阅读和理解。此规则有助于确保测试块在视觉上与其余代码分隔开来，从而更容易在查看测试文件时识别它们。

### 示例

此规则的**错误**代码示例：

```js
const thing = 123;
test("foo", () => {});
test("bar", () => {});
```

```js
const thing = 123;
it("foo", () => {});
it("bar", () => {});
```

此规则的**正确**代码示例：

```js
const thing = 123;

test("foo", () => {});

test("bar", () => {});
```

```js
const thing = 123;

it("foo", () => {});

it("bar", () => {});
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.75.0 中添加。

## 参考资料

<RuleReferences />
