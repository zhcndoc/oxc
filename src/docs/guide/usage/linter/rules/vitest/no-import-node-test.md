---
title: "vitest/no-import-node-test"
category: "Style"
version: "0.7.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_import_node_test.rs`;
</script>

<RuleHeader />

### 它的作用

当导入 `node:test` 时，此规则会发出警告（通常是意外导入）。
使用 `--fix` 时，它会将该导入替换为 `vitest`。

### 为什么这很糟糕？

使用 `node:test` 而不是 `vitest` 可能会导致测试结果不一致
以及缺少某些功能。应在所有测试中使用 `vitest`，以确保
兼容性并获得其全部功能。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { test } from "node:test";
import { expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

以下是此规则的**正确**代码示例：

```javascript
import { test, expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.7.0 中添加。

## 参考资料

<RuleReferences />
