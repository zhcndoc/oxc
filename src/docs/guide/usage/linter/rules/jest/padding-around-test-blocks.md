---
title: "jest/padding-around-test-blocks | Oxlint"
rule: "jest/padding-around-test-blocks"
category: "Style"
version: "1.13.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/padding_around_test_blocks.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制在 1 个或多个 `test`/`it` 语句前后保留一行间距。

### 为什么这不好？

代码格式不一致会使代码更难阅读和理解。此规则有助于确保测试块在视觉上与其余代码分隔开，使其在浏览测试文件时更容易识别。

### 示例

以下是此规则的**错误**代码示例：

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

以下是此规则的**正确**代码示例：

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

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.13.0 中添加。

## 参考资料

<RuleReferences />
