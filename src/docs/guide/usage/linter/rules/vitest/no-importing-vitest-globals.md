---
title: "vitest/no-importing-vitest-globals | Oxlint"
rule: "vitest/no-importing-vitest-globals"
category: "样式"
version: "1.49.0"
default: false
type_aware: false
fix: "可自动修复"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-importing-vitest-globals.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_importing_vitest_globals.rs`;
</script>

<RuleHeader />

### 作用

该规则禁止导入任何 vitest 全局函数。

### 为什么这很糟糕？

如果一个项目已[配置为将 Vitest 函数作为全局变量提供](https://vitest.dev/config/globals.html)，
则可以使用此规则来确保这些全局变量不会通过
`import` 或 `require` 被导入。

请注意，如果 Vitest 中的 `globals` 配置
选项设置为 `false`，则不应使用此规则（`false` 是默认配置）。

### 示例

以下是此规则的**错误**代码示例：

```js
import { test, expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

```js
const { test, expect } = require("vitest");

test("foo", () => {
  expect(1).toBe(1);
});
```

以下是此规则的**正确**代码示例：

```js
test("foo", () => {
  expect(1).toBe(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v1.49.0 中新增。

## 参考资料

<RuleReferences />
