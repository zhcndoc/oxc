---
title: "import/no-commonjs"
category: "限制"
version: "0.11.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_commonjs.rs`;
</script>

<RuleHeader />

### 功能说明

禁止使用 CommonJS 的 `require` 调用。同时也禁止 `module.exports` 和 `exports.*`。

### 为什么这很糟糕？

ESM 模块或 Typescript 使用 `import` 和 `export` 语法，而不是 CommonJS 语法。
此规则强制使用更现代的模块系统，以提高代码库的可维护性和一致性。

### 示例

以下是此规则的**错误**代码示例：

```js
var mod = require("fs");

var exports = (module.exports = {});

exports.sayHello = function () {
  return "Hello";
};

module.exports = "Hola";
```

以下是此规则的**正确**代码示例：

```js
var a = b && require("c");

if (typeof window !== "undefined") {
  require("somelib");
}

var fs = null;
try {
  fs = require("fs");
} catch (error) {}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowConditionalRequire

type: `boolean`

default: `true`

当设置为 `true` 时，允许条件性的 `require()` 调用（例如，在 `if` 语句或 try-catch 代码块中）。
这对于在 ESM imports 不受支持时，需要通过 commonjs requires 按条件加载的场景很有用。

### allowPrimitiveModules

type: `boolean`

default: `false`

如果将 `allowPrimitiveModules` 选项设置为 true，则以下代码是有效的：

```js
module.exports = "foo";
module.exports = function rule(context) {
  return {
    /* ... */
  };
};
```

但下面这些仍会被报告：

```js
module.exports = { x: "y" };
exports.z = function bark() {
  /* ... */
};
```

### allowRequire

type: `boolean`

default: `false`

如果设置为 `true`，则 `require` 调用是有效的：

```js
var mod = require("./mod");
```

但 `module.exports` 仍会照常被报告。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.11.0 中添加的。

## 参考资料

<RuleReferences />
