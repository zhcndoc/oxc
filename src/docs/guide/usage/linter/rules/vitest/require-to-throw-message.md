---
title: "vitest/require-to-throw-message | Oxlint"
rule: "vitest/require-to-throw-message"
category: "正确性"
version: "0.2.9"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_to_throw_message.rs`;
</script>

<RuleHeader />

### 作用

如果在使用 `toThrow()` 或 `toThrowError()` 时没有提供错误消息，此规则会触发警告。

### 为什么这很糟糕？

在没有指定预期错误消息的情况下使用 `toThrow()` 或 `toThrowError()`，
会使测试不够具体，也更难调试。当测试只检查是否抛出了
错误，但不检查是哪种错误时，即使抛出了错误类型不对的错误，它也可能通过，从而潜在地隐藏缺陷。提供预期的错误消息
或错误类型可以使测试更精确，并有助于更有效地发现回归问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow();
  expect(() => a()).toThrowError();
  await expect(a()).rejects.toThrow();
  await expect(a()).rejects.toThrowError();
});
```

以下是此规则的**正确**代码示例：

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow("a");
  expect(() => a()).toThrowError("a");
  await expect(a()).rejects.toThrow("a");
  await expect(a()).rejects.toThrowError("a");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.9 中添加。

## 参考资料

<RuleReferences />
