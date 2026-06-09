---
title: "node/global-require | Oxlint"
rule: "node/global-require"
category: "Style"
version: "1.36.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/global_require.rs`;
</script>

<RuleHeader />

### 作用

要求将 `require()` 调用放在顶层模块作用域中。

### 为什么这不好？

在 Node.js 中，模块依赖是通过 `require()` 函数引入的，例如：

```js
var fs = require("fs");
```

虽然 `require()` 可以在代码中的任何位置调用，但一些代码风格指南规定它只能在模块顶层调用，以便更容易识别依赖项。
例如，当它们深度嵌套在函数和其他语句中时，识别依赖项就会明显更困难：

```js
function foo() {
  if (condition) {
    var fs = require("fs");
  }
}
```

由于 `require()` 会进行同步加载，因此在其他位置使用时可能会导致性能问题。
此外，ES6 模块要求 import 和 export 语句只能出现在模块主体的顶层。

### 示例

此规则的**错误**代码示例：

```js
// 不允许在函数内部调用 require()
function readFile(filename, callback) {
  var fs = require("fs");
  fs.readFile(filename, callback);
}

// 像这样的条件式 require 也不允许
if (DEBUG) {
  require("debug");
}

// switch 语句中的 require() 也会被标记
switch (x) {
  case "1":
    require("1");
    break;
}

// 不能在箭头函数体内 require()
var getModule = (name) => require(name);

// 也不能在函数体内 require()
function getModule(name) {
  return require(name);
}

// 不能在 try/catch 块内 require()
try {
  require(unsafeModule);
} catch (e) {
  console.log(e);
}
```

此规则的**正确**代码示例：

```js
// 这些 require() 的各种写法都可以
require("x");
var y = require("y");
var z;
z = require("z").initialize();

// 引入模块并在函数中使用它是可以的
var fs = require("fs");
function readFile(filename, callback) {
  fs.readFile(filename, callback);
}

// 你可以使用三元表达式来决定要 require 哪个模块
var logger = DEBUG ? require("dev-logger") : require("logger");

// 如果你愿意，也可以在模块末尾 require()
function doSomethingA() {}
function doSomethingB() {}
var x = require("x"),
  z = require("z");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.36.0 中添加。

## 参考资料

<RuleReferences />
