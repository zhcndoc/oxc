---
title: "import/no-absolute-path"
category: "Suspicious"
version: "0.15.13"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_absolute_path.rs`;
</script>

<RuleHeader />

### 它的作用

此规则禁止使用绝对路径导入模块。

### 为什么这不好？

Node.js 允许使用绝对路径导入模块，例如 `/home/xyz/file.js`。
这是一种不好的做法，因为它会将使用它的代码绑定到你的计算机，
因此例如在 npm 上分发的软件包中就无法使用。

### 示例

此规则的**错误**代码示例：

```js
import f from "/foo";
import f from "/some/path";
var f = require("/foo");
var f = require("/some/path");
```

此规则的**正确**代码示例：

```js
import _ from "lodash";
import foo from "foo";
import foo from "./foo";

var _ = require("lodash");
var foo = require("foo");
var foo = require("./foo");
```

对于 `{ amd: true }` 选项的**错误**代码示例：

```js
define("/foo", function (foo) {});
require("/foo", function (foo) {});
```

对于 `{ amd: true }` 选项的**正确**代码示例：

```js
define("./foo", function (foo) {});
require("./foo", function (foo) {});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### amd

type: `boolean`

default: `false`

如果设置为 `true`，将解析 AMD 风格的 define 和 require 调用中的依赖路径：

```js
/* import/no-absolute-path: ["error", { "commonjs": false, "amd": true }] */
define(["/foo"], function (foo) {
  /*...*/
}); // reported
require(["/foo"], function (foo) {
  /*...*/
}); // reported

const foo = require("/foo"); // ignored because of explicit `commonjs: false`
```

### commonjs

type: `boolean`

default: `true`

如果设置为 `true`，将解析 CommonJS 风格 require 调用中的依赖路径：

```js
var foo = require("/foo"); // reported
```

### esmodule

type: `boolean`

default: `true`

如果设置为 `true`，将解析 ES module import 语句中的依赖路径：

```js
import foo from "/foo"; // reported
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.13 中新增。

## 参考

<RuleReferences />
