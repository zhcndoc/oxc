---
title: "node/no-mixed-requires | Oxlint"
rule: "node/no-mixed-requires"
category: "Style"
version: "1.71.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_mixed_requires.rs`;
</script>

<RuleHeader />

### 作用

禁止将 `require` 调用与普通变量声明混在一起。

### 为什么这不好？

在 Node.js 社区中，通常习惯将使用 `require` 加载模块的初始化与其他变量声明分开，有时也会按模块类型进行分组。

### 示例

以下是此规则的**错误**代码示例：

```js
var fs = require("fs"),
  i = 0;

var async = require("async"),
  debug = require("diagnostics").someFunction("my-module"),
  eslint = require("eslint");
```

以下是此规则的**正确**代码示例：

```js
var eventEmitter = require("events").EventEmitter,
  myUtils = require("./utils"),
  util = require("util"),
  bar = require(getBarModuleName());

var foo = 42,
  bar = "baz";
```

## 配置

### allowCall

类型：`boolean`

默认值：`false`

### grouping

类型：`boolean`

默认值：`false`

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.71.0 中添加的。

## 参考资料

<RuleReferences />
