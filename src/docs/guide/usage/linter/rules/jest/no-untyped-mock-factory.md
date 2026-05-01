---
title: "jest/no-untyped-mock-factory"
category: "Style"
version: "0.2.15"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_untyped_mock_factory.rs`;
</script>

<RuleHeader />

### 它的作用

如果在使用 `mock()` 或 `doMock()` 时没有提供泛型类型参数或返回类型，此规则会触发警告。

### 为什么这很糟糕？

默认情况下，`jest.mock` 和 `jest.doMock` 允许 mock 工厂返回任意类型。可以使用泛型类型参数来强制工厂返回一个与原始模块形状相同的对象，或其他更严格的类型。要求提供类型后，在源模块发生变化时，更容易使用 TypeScript 捕获测试 mock 需要做出的变更。

### 示例

以下是此规则的**错误**代码示例：

```typescript
jest.mock("../moduleName", () => {
  return jest.fn(() => 42);
});

jest.mock("./module", () => ({
  ...jest.requireActual("./module"),
  foo: jest.fn(),
}));

jest.mock("random-num", () => {
  return jest.fn(() => 42);
});
```

以下是此规则的**正确**代码示例：

```typescript
// 使用 typeof import()
jest.mock<typeof import("../moduleName")>("../moduleName", () => {
  return jest.fn(() => 42);
});

jest.mock<typeof import("./module")>("./module", () => ({
  ...jest.requireActual("./module"),
  foo: jest.fn(),
}));

// 使用自定义类型
jest.mock<() => number>("random-num", () => {
  return jest.fn(() => 42);
});

// 无工厂函数
jest.mock("random-num");

// 虚拟 mock
jest.mock(
  "../moduleName",
  () => {
    return jest.fn(() => 42);
  },
  { virtual: true },
);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.15 中添加。

## 参考

<RuleReferences />
