---
title: "jest/require-to-throw-message | Oxlint"
rule: "jest/require-to-throw-message"
category: "正确性"
version: "0.2.9"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-to-throw-message.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/require_to_throw_message.rs`;
</script>

<RuleHeader />

### 作用

如果在使用 `toThrow()` 或 `toThrowError()` 时没有提供错误消息，此规则会触发警告。

### 为什么这不好？

在未指定预期错误消息的情况下使用 `toThrow()` 或 `toThrowError()`
会让测试不够具体，也更难调试。当测试只检查是否抛出了
错误，而不检查是什么类型的错误时，即使抛出了错误的
异常，测试也可能通过，从而潜在地掩盖 bug。提供预期的错误消息
或错误类型可以让测试更精确，并更有效地发现回归问题。

### 示例

此规则的**错误**代码示例如下：

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow();
  expect(() => a()).toThrowError();
  await expect(a()).rejects.toThrow();
  await expect(a()).rejects.toThrowError();
});
```

此规则的**正确**代码示例如下：

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow("a");
  expect(() => a()).toThrowError("a");
  await expect(a()).rejects.toThrow("a");
  await expect(a()).rejects.toThrowError("a");
});
```

## How to use

<RuleHowToUse />

## 版本

此规则于 v0.2.9 中加入。

## 参考

<RuleReferences />
