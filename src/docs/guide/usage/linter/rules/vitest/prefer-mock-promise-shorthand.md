---
title: "vitest/prefer-mock-promise-shorthand | Oxlint"
rule: "vitest/prefer-mock-promise-shorthand"
category: "Style"
version: "0.2.16"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-promise-shorthand.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_mock_promise_shorthand.rs`;
</script>

<RuleHeader />

### 作用

在处理返回 promise 的函数的 mock 时，Jest 提供了一些 API 速记方法，用于减少你需要编写的样板代码量。在可能的情况下，应优先使用这些方法。

### 原因

使用像 `mockImplementation(() => Promise.resolve())` 或 `mockReturnValue(Promise.reject())` 这样的通用 mock 函数，比 Jest 专门提供的 promise 简写更冗长、可读性更差。像 `mockResolvedValue()` 和 `mockRejectedValue()` 这样的简写方法表达性更强，也能让测试意图更清晰。

### 示例

以下是此规则的**错误**代码示例：

```javascript
jest.fn().mockImplementation(() => Promise.resolve(123));
jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));

myFunction
  .mockReturnValueOnce(Promise.resolve(42))
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(Promise.reject(new Error("too many calls!")));
```

以下是此规则的**正确**代码示例：

```javascript
jest.fn().mockResolvedValue(123);
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

myFunction
  .mockResolvedValueOnce(42)
  .mockResolvedValueOnce(42)
  .mockRejectedValue(new Error("too many calls!"));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.16 中添加。

## 参考资料

<RuleReferences />
