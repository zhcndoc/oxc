---
title: "jest/no-focused-tests | Oxlint"
rule: "jest/no-focused-tests"
category: "正确性"
version: "0.0.8"
default: false
type_aware: false
fix: "可通过建议修复"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_focused_tests.rs`;
</script>

<RuleHeader />

### 它的作用

当你使用排他性功能时，此规则会通过发出警告提醒你从测试中移除 `.only`。

### 为什么这不好？

Jest 提供了一项功能，可以通过在测试套件或测试用例后附加 `.only`，或者在前面加上 `f` 来聚焦测试。这个功能对于调试失败的测试非常有帮助，这样你就不必执行所有测试。在你修复测试之后，并且在提交更改之前，你必须移除 `.only`，以确保在你的构建系统上会执行所有测试。

### 示例

此规则的**错误**代码示例：

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
