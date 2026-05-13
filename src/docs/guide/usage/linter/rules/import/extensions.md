---
title: "import/extensions | Oxlint"
rule: "import/extensions"
category: "Restriction"
version: "1.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/extensions.rs`;
</script>

<RuleHeader />

### 作用

某些文件解析算法允许你在 import 源路径中省略文件扩展名。
例如，node 解析器（目前尚不支持 ESM/import）可以将 ./foo/bar 解析为绝对路径 /User/someone/foo/bar.js，因为在 CJS 中默认会自动解析 .js 扩展名。
根据解析器的不同，你还可以配置更多扩展名以自动解析。
为了在你的代码库中统一文件扩展名的使用，这条规则可以强制要求或禁止使用某些文件扩展名。

### 这有什么问题？

基于 ESM 的文件解析算法（例如 Vite 提供的那种）建议
明确指定文件扩展名以提升性能。没有扩展名时，
打包器必须检查多种可能的文件扩展名，这会拖慢
大型项目的构建过程。此外，常见的 ESM 环境
（例如浏览器和 Node.js）通常要求完整指定的相对导入，
这意味着那里不支持无扩展名导入。

出于个人偏好和兼容性原因，这条规则也允许配置为在 import 中
_禁止_ 使用扩展名。这通常不推荐，但如果偏好如此，也可以这样做。

### 示例

以下是此规则的**错误**代码示例：

当配置设为 "always" 时，以下模式被视为问题：

```js
import foo from "./foo";
import bar from "./bar";
import Component from "./Component";
import foo from "@/foo";
```

当配置设为 "never" 时，以下模式被视为问题：

```js
import foo from "./foo.js";
import bar from "./bar.json";
import Component from "./Component.jsx";
import express from "express/index.js";
```

以下是此规则的**正确**代码示例：

当配置设为 "always" 时，以下模式不被视为问题：

```js
import foo from "./foo.js";
import bar from "./bar.json";
import Component from "./Component.jsx";
import * as path from "path";
import foo from "@/foo.js";
```

当配置设为 "never" 时，以下模式不被视为问题：

```js
import foo from "./foo";
import bar from "./bar";
import Component from "./Component";
import express from "express/index";
import * as path from "path";
```

**按扩展名配置示例**：

```js
// 配置：{ "vue": "always", "ts": "never" }
import Component from "./Component.vue"; // ✓ OK - .vue 配置为 "always"
import utils from "./utils"; // ✓ OK - .ts 配置为 "never"
import styles from "./styles.css"; // ✓ OK - .css 未配置，已忽略

// 配置：["ignorePackages", { "js": "never", "ts": "never" }]
import foo from "./foo"; // ✓ OK - 无扩展名
import bar from "lodash/fp"; // ✓ OK - 包导入，已忽略（ignorePackages 将其设为 true）
```

### 与 `eslint-plugin-import` 的差异

如果你发现此规则实现与原始 `eslint-plugin-import`
规则之间存在差异，请注意，这两者在行为上有一些刻意且固有的差异。

Oxlint 能开箱即用地理解并解析 TypeScript 路径。如果你的 ESLint
配置未包含 `eslint-import-resolver-typescript` 或类似工具，那么原始
规则将无法正确解析 TypeScript 路径，因此 ESLint 与 Oxlint 之间的行为可能不同。一般来说，这意味着 Oxlint 会捕获比原始规则
更多的有效违规，尽管这取决于具体配置。

Oxlint 还能够在单个仓库中解析多个 `tsconfig.json` 文件，因此在
monorepo 场景下，它在解析文件路径方面会更强大。

## 配置

此规则接受三种类型的配置：

1. **全局规则**（字符串）：`"always"`、`"never"` 或 `"ignorePackages"`

```jsonc
{
  "rules": {
    // 这将要求所有 import 都带扩展名，*包括来自包的导入*
    // 例如，`import React from 'react';` 将被禁止。
    // 在使用 `always` 时，通常应始终将 `ignorePackages` 设为 `true`。
    "import/extensions": ["error", "always"],
  },
}
```

2. **按扩展名规则**（对象）：`{ "js": "always", "jsx": "never", ... }`

```jsonc
{
  "rules": {
    "import/extensions": [
      "error",
      // 按扩展名规则：
      // 要求 .js 导入带扩展名，并禁止 .ts 导入带扩展名
      { "js": "always", "ts": "never", "ignorePackages": true },
    ],
  },
}
```

3. **组合形式**（数组）：`["error", "always", { "js": "never" }]` 或 `["error", { "js": "always" }]`

```jsonc
{
  "rules": {
    "import/extensions": [
      "error",
      "always", // 默认情况下，要求所有 import 都带扩展名
      {
        "ts": "never", // 覆盖全局值，并禁止特定文件类型的 import 使用扩展名
        "ignorePackages": true,
      },
    ],
  },
}
```

**默认行为（无配置）**：所有 import —— 各种类型 —— 都会通过。
未配置的文件扩展名会被忽略，以避免误报。

此规则接受一个包含以下属性的配置对象：

### checkTypeImports

type: `boolean`

default: `false`

在强制执行扩展名规则时是否检查类型导入。

```ts
// 如果 checkTypeImports 为 `false`，我们不关心
// 这些导入是否带有文件扩展名，两种情况都始终允许：
import type { Foo } from "./foo";
import type { Foo } from "./foo.ts";
```

### ignorePackages

type: `boolean`

default: `false`

在强制执行扩展名规则时是否忽略包导入。

> [!IMPORTANT]
> 当将此规则设为 `always` 时，你还应将 `ignorePackages` 设为 `true`。
> 否则，没有扩展名的包导入（例如 `import React from 'react';`）
> 将被禁止，这既不理想，也无法修复。

一个布尔选项（不是按扩展名的），用于将包导入从 "always" 规则中豁免出来。

可以在配置对象中设置：`["error", "always", { "ignorePackages": true }]`

旧式简写：`["error", "ignorePackages"]` 等同于 `["error", "always", { "ignorePackages": true }]`

- **使用 "always" 时**：当为 `true`，包导入（例如 `lodash`、`@babel/core`）不需要扩展名
- **使用 "never" 时**：此选项不起作用；包导入仍然禁止使用扩展名

示例：`["error", "always", { "ignorePackages": true }]` 允许 `import foo from "lodash"`，但要求 `import bar from "./bar.js"`

### pathGroupOverrides

type: `array`

default: `[]`

自定义 import 标识符的路径组覆盖。

用于自定义 import 协议（monorepo 工具、自定义解析器）的模式-动作对数组。
每个覆盖项都有：`{ "pattern": "<glob-pattern>", "action": "enforce" | "ignore" }`

**模式匹配**：使用 glob 模式（`*`、`**`、`{a,b}`）匹配 import 标识符。
请注意，模式匹配是在 Rust 中使用 fast-glob 库完成的，因此可能与原始 ESLint 规则所使用的 JavaScript glob 库不同。

**动作**：

- `"enforce"`：应用正常的扩展名校验（遵循全局/按扩展名规则）
- `"ignore"`：跳过匹配导入的所有扩展名校验

**优先级**：第一个匹配到的模式优先。

**示例：**

```json
{
  "pattern": "rootverse{*,*/**}",
  "action": "ignore"
}
```

匹配来自 `rootverse+debug:src`、`rootverse+bfe:src/symbols` 的导入，并
忽略它们是否带有扩展名。

#### pathGroupOverrides[n]

type: `object`

##### pathGroupOverrides[n].action

type: `"enforce" | "ignore"`

匹配模式时采取的操作。

针对路径组覆盖要采取的操作。

决定如何对匹配的自定义 import 标识符验证 import 扩展名。

###### `"enforce"`

对匹配的导入强制执行扩展名校验（根据配置要求扩展名）。

###### `"ignore"`

完全忽略匹配的导入（跳过所有扩展名校验）。

##### pathGroupOverrides[n].pattern

type: `string`

用于匹配 import 标识符的 glob 模式。此处使用 Rust 的 fast-glob 库进行匹配。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.2.0 中新增。

## 参考

<RuleReferences />
