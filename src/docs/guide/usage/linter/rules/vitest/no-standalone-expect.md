---
title: "vitest/no-standalone-expect | Oxlint"
rule: "vitest/no-standalone-expect"
category: "正确性"
version: "0.0.13"
default: false
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_standalone_expect.rs`;
</script>

<RuleHeader />

### 作用

阻止 `expect` 语句出现在 `test` 或 `it` 块之外。位于辅助函数中的 `expect`
（但不在 `test` 或 `it` 块内）不会触发此规则。

像 `expect.hasAssertions()` 这样的语句不会触发此规则，因为这些调用
即使不在测试块中也会执行。

### 为什么这很糟糕？

`expect` 语句如果位于测试块之外，将不会被 Jest
测试运行器执行，这意味着它们实际上不会测试任何内容。这会导致对测试覆盖率产生虚假的信心，并可能掩盖本应通过正确测试发现的 bug。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("a test", () => {
  expect(1).toBe(1);
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### additionalTestBlockFunctions

type: `string[]`

default: `[]`

一个函数名数组，也会被视为测试块。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.13 中添加。

## 参考资料

<RuleReferences />
