---
title: "vitest/prefer-called-times | Oxlint"
rule: "vitest/prefer-called-times"
category: "样式"
version: "1.35.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-times.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_called_times.rs`;
</script>

<RuleHeader />

### 作用

此规则旨在强制使用 `toBeCalledTimes(1)` 或 `toHaveBeenCalledTimes(1)`，而不是 `toBeCalledOnce()` 或 `toHaveBeenCalledOnce()`。

### 为什么这不好？

此规则旨在强制使用 `toBeCalledTimes(1)` 或 `toHaveBeenCalledTimes(1)`，而不是 `toBeCalledOnce()` 或 `toHaveBeenCalledOnce()`。

### 示例

以下是此规则的**错误**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledOnce();
  expect(mock).toHaveBeenCalledOnce();
});
```

以下是此规则的**正确**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledTimes(1);
  expect(mock).toHaveBeenCalledTimes(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.35.0。

## 参考资料

<RuleReferences />
