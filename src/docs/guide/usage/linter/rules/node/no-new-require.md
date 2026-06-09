---
title: "node/no-new-require | Oxlint"
rule: "node/no-new-require"
category: "Restriction"
version: "0.10.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_new_require.rs`;
</script>

<RuleHeader />

### 它的作用

警告对 `require` 使用 `new`。

### 为什么这不好？

`require` 函数用于引入模块，并且可能返回一个构造函数。由于这
并不总是如此，这可能会让人困惑。

### 示例

以下是此规则的**错误**代码示例：

```js
var appHeader = new require("app-header");
```

以下是此规则的**正确**代码示例：

```js
var AppHeader = require("app-header");
var appHeader = new AppHeader();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.10.0 中添加。

## 参考资料

<RuleReferences />
