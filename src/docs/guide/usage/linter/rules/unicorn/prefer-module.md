---
title: "unicorn/prefer-module | Oxlint"
rule: "unicorn/prefer-module"
category: "Restriction"
version: "1.50.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_module.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 JavaScript 模块（ESM）而不是 CommonJS。

### 为什么这不好？

CommonJS 全局变量和模式（`require`、`module`、`exports`、`__filename`、`__dirname`）
会让代码更难迁移，并且可能阻止仅 ESM 功能。

### 示例

以下是此规则的**错误**代码示例：

```js
"use strict";
const foo = require("foo");
module.exports = foo;
```

以下是此规则的**正确**代码示例：

```js
import foo from "foo";
export default foo;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.50.0 中新增。

## 参考资料

<RuleReferences />
