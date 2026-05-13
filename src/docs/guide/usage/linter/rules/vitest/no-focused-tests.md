---
title: "vitest/no-focused-tests | Oxlint"
rule: "vitest/no-focused-tests"
category: "Correctness"
version: "0.0.8"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_focused_tests.rs`;
</script>

<RuleHeader />

### 作用

此规则会在你使用排他性特性时发出警告，提醒你从测试中移除 `.only`。

### 为什么这不好？

Jest 有一个特性，允许你通过在测试套件或测试用例后追加 `.only`，或者在前面加上 `f` 来聚焦测试。这个特性对于调试失败的测试非常有用，这样你就不必执行所有测试。等你修复测试之后，在提交更改之前，你必须移除 `.only`，以确保构建系统会执行所有测试。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
`();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.8 中添加的。

## 参考资料

<RuleReferences />
