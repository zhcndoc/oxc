---
title: "vitest/require-mock-type-parameters | Oxlint"
rule: "vitest/require-mock-type-parameters"
category: "Correctness"
version: "1.58.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_mock_type_parameters.rs`;
</script>

<RuleHeader />

### 作用

强制在 `vi.fn()` 上使用类型参数，并可选择性地对 `vi.importActual()` 和 `vi.importMock()` 也进行检查。

默认情况下，只检查 `vi.fn()`。将 `checkImportFunctions` 设置为 `true`，也会检查 `vi.importActual()` 和 `vi.importMock()`。

### 为什么这不好？

如果没有显式的类型参数，`vi.fn()` 会创建一个类型为 `(...args: any[]) => any` 的 mock。
这会禁用 mock 与真实实现之间的类型检查，可能导致两个问题：

- 测试由于错误的 mock 使用而失败，而它们本应通过
- 或者更糟，测试通过了，但 mock 悄悄地偏离了实际运行时行为。

### 示例

以下是将此规则配置为 `{ "checkImportFunctions": false }` 时的**错误**代码示例：

```ts
import { vi } from "vitest";

test("foo", () => {
  const myMockedFn = vi.fn();
});
```

以下是将此规则配置为 `{ "checkImportFunctions": true }` 时的**错误**代码示例：

```ts
import { vi } from "vitest";

vi.mock("./example.js", async () => {
  const originalModule = await vi.importActual("./example.js");

  return { ...originalModule };
});
const fs = await vi.importMock("fs");
```

以下是将此规则配置为 `{ "checkImportFunctions": false }` 时的**正确**代码示例：

```ts
import { vi } from "vitest";

test("foo", () => {
  const myMockedFnOne = vi.fn<(arg1: string, arg2: boolean) => number>();
  const myMockedFnTwo = vi.fn<() => void>();
  const myMockedFnThree = vi.fn<any>();
});
```

以下是将此规则配置为 `{ "checkImportFunctions": true }` 时的**正确**代码示例：

```ts
import { vi } from "vitest";

vi.mock("./example.js", async () => {
  const originalModule = await vi.importActual<any>("./example.js");

  return { ...originalModule };
});
const fs = await vi.importMock<any>("fs");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkImportFunctions

type: `boolean`

default: `false`

同时要求为 `importActual` 和 `importMock` 提供类型参数。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.58.0 中添加的。

## 参考

<RuleReferences />
