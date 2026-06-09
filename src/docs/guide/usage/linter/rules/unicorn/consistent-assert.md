---
title: "unicorn/consistent-assert | Oxlint"
rule: "unicorn/consistent-assert"
category: "Pedantic"
version: "0.16.9"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-assert.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_assert.rs`;
</script>

<RuleHeader />

### 功能说明

强制 `assert` 模块的一致用法。

### 为什么这很糟糕？

`assert` 模块使用不一致会让代码
更难跟随和理解。

`assert.ok(...)` 是更推荐的写法，因为它能更清楚地表达
断言的意图。

### 示例

以下是此规则下**错误**代码的示例：

```js
import assert from "node:assert";

assert(divide(10, 2) === 5);
```

以下是此规则下**正确**代码的示例：

```js
import assert from "node:assert";

assert.ok(divide(10, 2) === 5);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.16.9 中添加的。

## 参考资料

<RuleReferences />
