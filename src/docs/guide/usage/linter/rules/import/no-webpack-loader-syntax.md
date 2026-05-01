---
title: "import/no-webpack-loader-syntax"
category: "限制"
version: "0.7.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_webpack_loader_syntax.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 import 或 require 语句中直接使用 Webpack loader 语法。

### 为什么这不好？

这种 loader 语法不是标准的，因此会使代码与 Webpack 耦合。推荐的指定
Webpack loader 配置的方式是在 [Webpack 配置文件](https://webpack.js.org/concepts/loaders/#configuration) 中。

### 示例

此规则的**错误**代码示例：

```javascript
import myModule from "my-loader!my-module";
import theme from "style!css!./theme.css";

var myModule = require("my-loader!./my-module");
var theme = require("style!css!./theme.css");
```

此规则的**正确**代码示例：

```javascript
import myModule from "./my-module";
import theme from "./theme.css";

var myModule = require("./my-module");
var theme = require("./theme.css");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中添加。

## 参考资料

<RuleReferences />
