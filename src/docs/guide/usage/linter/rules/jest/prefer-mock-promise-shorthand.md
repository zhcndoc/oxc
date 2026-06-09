---
title: "jest/prefer-mock-promise-shorthand | Oxlint"
rule: "jest/prefer-mock-promise-shorthand"
category: "Style"
version: "0.2.16"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-mock-promise-shorthand.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_mock_promise_shorthand.rs`;
</script>

<RuleHeader />

### 它的作用

在为返回 promise 的函数编写 mock 时，Jest 提供了一些用于减少样板代码的 API 简写。在可能的情况下，应优先使用这些方法。

### 为什么这不好？

使用诸如 `mockImplementation(() => Promise.resolve())` 或 `mockReturnValue(Promise.reject())` 之类的通用 mock 函数，比起 Jest 专门为 promise 提供的简写方法，更冗长、可读性更差。像 `mockResolvedValue()` 和 `mockRejectedValue()` 这样的简写方法表达力更强，也能让测试意图更清晰。

### 示例

以下是此规则的**错误**代码示例：

```javascript
jest.fn().mockImplementation(() => Promise.resolve(123));
jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("哦不！")));

myFunction
  .mockReturnValueOnce(Promise.resolve(42))
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(Promise.reject(new Error("调用太多次了！")));
```

以下是此规则的**正确**代码示例：

```javascript
jest.fn().mockResolvedValue(123);
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("哦不！"));

myFunction
  .mockResolvedValueOnce(42)
  .mockResolvedValueOnce(42)
  .mockRejectedValue(new Error("调用太多次了！"));
```

## How to use

<RuleHowToUse />

## 版本

此规则自 v0.2.16 起添加。

## 参考资料

<RuleReferences />
