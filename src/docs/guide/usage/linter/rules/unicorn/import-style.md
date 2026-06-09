---
title: "unicorn/import-style | Oxlint"
rule: "unicorn/import-style"
category: "限制"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/import_style.rs`;
</script>

<RuleHeader />

### 作用

强制每个模块使用特定的导入风格。

### 为什么这不好？

有些模块以一致的方式导入时更容易阅读。
例如，工具模块通常更适合使用命名导入，
而那些只暴露一个主要接口的模块则作为默认导入会更清晰。

### 示例

以下是此规则的**错误**代码示例：

```js
import util from "node:util";
```

以下是此规则的**正确**代码示例：

```js
import { promisify } from "node:util";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkDynamicImport

type: `boolean`

default: `true`

是否检查动态 import 表达式。

将其设为 `false` 可跳过诸如 `await import("module")` 之类的调用。

在默认配置下，**错误**代码示例：

```js
async () => {
  const { red } = await import("chalk");
};
```

**正确**代码示例：

```js
async () => {
  const { default: chalk } = await import("chalk");
};
```

### checkExportFrom

type: `boolean`

default: `false`

是否检查 export-from 声明。

默认情况下此项是禁用的。将其设为 `true` 可检查如下声明：
`export ... from "module"`。

在 `{ "checkExportFrom": true }` 下，**错误**代码示例：

```js
export * from "node:util";
```

**正确**代码示例：

```js
export { promisify } from "node:util";
```

### checkImport

type: `boolean`

default: `true`

是否检查静态 import 声明。

将其设为 `false` 可跳过 `import ... from "module"` 以及诸如
`import "module"` 这样的副作用导入。

在默认配置下，**错误**代码示例：

```js
import { red } from "chalk";
```

**正确**代码示例：

```js
import chalk from "chalk";
```

### checkRequire

type: `boolean`

default: `true`

是否检查 CommonJS `require()` 调用。

将其设为 `false` 可完全跳过 `require("module")` 调用。

在默认配置下，**错误**代码示例：

```js
const util = require("node:util");
```

**正确**代码示例：

```js
const { promisify } = require("node:util");
```

### extendDefaultStyles

type: `boolean`

default: `true`

`styles` 是扩展还是替换内置的模块偏好。

当其为 `true` 时，`styles` 中的条目会与默认偏好合并。例如，
`{ "styles": { "path": { "named": true } } }` 允许从 `path` 使用命名导入，
同时仍然允许其默认导入风格。当其为 `false` 时，只会检查在 `styles` 中
配置的模块。

在 `{ "extendDefaultStyles": false, "styles": {} }` 下，**正确**代码示例：

```js
import { red } from "chalk";
```

### styles

type: `object`

default: `{}`

按模块设置的导入风格偏好。

每个键都是一个模块标识符。将值设为 `false` 可为该模块禁用检查，
或设为一个允许一种或多种导入风格的对象。可用的风格有
`unassigned`、`default`、`namespace` 和 `named`。当 `extendDefaultStyles` 为 `true`
时，这些条目会扩展内置默认值，而不是替换它们。

默认的模块偏好是对 `chalk`、`path` 和 `node:path` 使用默认导入，
对 `util` 和 `node:util` 使用命名导入。

在 `{ "styles": { "node:util": { "named": true, "default": false } } }` 下，
**错误**代码示例：

```js
import util from "node:util";
```

**正确**代码示例：

```js
import { promisify } from "node:util";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.67.0 中添加。

## 参考

<RuleReferences />
