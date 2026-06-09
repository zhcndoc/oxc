---
title: "jest/no-disabled-tests | Oxlint"
rule: "jest/no-disabled-tests"
category: "正确性"
version: "0.0.7"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_disabled_tests.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会对被禁用的测试发出警告。

### 这为什么不好？

Jest 提供了一个功能，允许你临时将测试标记为禁用。这个
功能在调试时或为未来的测试创建占位符时通常很有帮助。在提交更改之前，我们可能希望检查所有测试是否都
在运行。

### 示例

```js
describe.skip("foo", () => {});
it.skip("foo", () => {});
test.skip("foo", () => {});

describe["skip"]("bar", () => {});
it["skip"]("bar", () => {});
test["skip"]("bar", () => {});

xdescribe("foo", () => {});
xit("foo", () => {});
xtest("foo", () => {});

it("bar");
test("bar");

it("foo", () => {
  pending();
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.7 中添加。

## 参考资料

<RuleReferences />
