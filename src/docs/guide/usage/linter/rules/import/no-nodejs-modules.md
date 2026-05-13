---
title: "import/no-nodejs-modules | Oxlint"
rule: "import/no-nodejs-modules"
category: "Style"
version: "1.43.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_nodejs_modules.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 Node.js 内置模块。对于无法访问这些模块的客户端 Web 项目来说，这可能很有用。

### 为什么这不好？

Node.js 内置模块（例如 `fs`、`path`、`crypto`）在浏览器中不可用，因此在客户端 bundle 中导入它们会导致运行时失败，或者迫使打包工具注入沉重的 polyfill/shim。
这会增加 bundle 体积，可能将仅限服务端的逻辑泄漏到客户端，并且可能在生产环境之前掩盖运行环境不匹配的问题。

### 示例

以下是此规则的**错误**代码示例：

```js
import fs from "fs";
import path from "path";

var fs = require("fs");
var path = require("path");
```

以下是此规则的**正确**代码示例：

```js
import _ from "lodash";
import foo from "foo";
import foo from "./foo";

var _ = require("lodash");
var foo = require("foo");
var foo = require("./foo");

/* import/no-nodejs-modules: ["error", {"allow": ["path"]}] */
import path from "path";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

允许模块名称的数组。默认为空数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.43.0 中添加。

## 参考资料

<RuleReferences />
