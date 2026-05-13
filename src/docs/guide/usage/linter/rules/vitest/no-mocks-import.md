---
title: "vitest/no-mocks-import | Oxlint"
rule: "vitest/no-mocks-import"
category: "Style"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_mocks_import.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会报告从包含 `__mocks__` 组件的路径进行的导入。

### 为什么这很糟糕？

手动从 `__mocks__` 目录导入 mock 可能会导致意外行为，并破坏 Jest 的自动 mock 机制。Jest 的设计是：当调用 `jest.mock()` 时，会自动解析并使用来自 `__mocks__` 目录的 mock。直接从这些目录导入会绕过 Jest 的模块解析系统，并可能导致测试环境与生产环境之间的不一致。

### 示例

以下是此规则的**错误**代码示例：

```ts
import thing from "./__mocks__/index";
require("./__mocks__/index");
```

以下是此规则的**正确**代码示例：

```ts
import thing from "thing";
require("thing");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.13 中添加。

## 参考资料

<RuleReferences />
