---
title: "jest/prefer-jest-mocked | Oxlint"
rule: "jest/prefer-jest-mocked"
category: "Style"
version: "0.5.0"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_jest_mocked.rs`;
</script>

<RuleHeader />

### 作用

在使用 Jest 处理函数 mock 时，建议使用 `jest.mocked()` 辅助函数来正确标注被 mock 的函数类型。此规则强制使用 `jest.mocked()`，以获得更好的类型安全性和可读性。

受限类型：

- `jest.Mock`
- `jest.MockedFunction`
- `jest.MockedClass`
- `jest.MockedObject`

### 为什么这不好？

像 `fn as jest.Mock` 这样的类型断言不如使用 `jest.mocked()` 安全。`jest.mocked()` 辅助函数在保留原始函数签名的同时添加 mock 能力，从而提供更好的类型安全性。它还使代码更易读，并更明确地表达 mock 意图。

### 示例

此规则的**错误**代码示例：

```typescript
(foo as jest.Mock).mockReturnValue(1);
const mock = (foo as jest.Mock).mockReturnValue(1);
(foo as unknown as jest.Mock).mockReturnValue(1);
(Obj.foo as jest.Mock).mockReturnValue(1);
([].foo as jest.Mock).mockReturnValue(1);
```

此规则的**正确**代码示例：

```typescript
jest.mocked(foo).mockReturnValue(1);
const mock = jest.mocked(foo).mockReturnValue(1);
jest.mocked(Obj.foo).mockReturnValue(1);
jest.mocked([].foo).mockReturnValue(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.5.0 中添加。

## 参考

<RuleReferences />
