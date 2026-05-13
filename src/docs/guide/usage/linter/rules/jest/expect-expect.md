---
title: "jest/expect-expect | Oxlint"
rule: "jest/expect-expect"
category: "Correctness"
version: "0.0.12"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/expect_expect.rs`;
</script>

<RuleHeader />

### 它的作用

当测试中没有调用 `expect` 时，此规则会触发，确保测试中至少有一次 `expect` 调用。

### 为什么这不好？

人们可能会忘记添加断言。

### 示例

以下是此规则的**错误**代码示例：

```javascript
it("应该是一个测试", () => {
  console.log("没有断言");
});
test("应该断言一些内容", () => {});
```

## 配置

此规则接受一个配置对象，包含以下属性：

### additionalTestBlockFunctions

type: `string[]`

default: `[]`

一个函数名数组，这些函数名也将被视为测试块。

### assertFunctionNames

type: `string[]`

default: `["expect"]`

应被视为断言函数的函数名列表。

注意：默认值对于 Jest 是 `["expect"]`，
对于 Vitest 是 `["expect", "expectTypeOf", "assert", "assertType"]`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.12 中新增。

## 参考

<RuleReferences />
