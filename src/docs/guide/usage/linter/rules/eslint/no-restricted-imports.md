---
title: "eslint/no-restricted-imports | Oxlint"
rule: "eslint/no-restricted-imports"
category: "限制"
version: "0.15.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-restricted-imports"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_restricted_imports.rs`;
</script>

<RuleHeader />

### 它的作用

此规则允许你指定在应用程序中不希望使用的导入。
它只适用于静态导入，不适用于动态导入。

### 为什么这不好？

某些导入在特定环境下可能没有意义。
例如，Node.js 的 fs 模块在没有文件系统的环境中就没有意义。

有些模块提供了相似或相同的功能，比如 lodash 和 underscore。你的项目可能已经对某个模块做了标准化。
你需要确保没有使用其他替代方案，因为这样会不必要地增加项目体积，
并且在一个依赖就足够时，使用两个依赖会带来更高的维护成本。

### 示例

此规则的**错误**代码示例：

```js
/* no-restricted-imports: ["error", "disallowed-import"] */

import foo from "disallowed-import";
export * from "disallowed-import";
```

此规则的**正确**代码示例：

```js
/* no-restricted-imports: ["error", "fs"] */

import crypto from "crypto";
export * from "bar";
```

### 选项

你也可以使用对象中的 `name` 和 `message` 属性为特定模块指定自定义消息，
其中 name 的值是模块的 `name`，message 属性包含自定义消息。
自定义消息会作为帮助文本显示给用户。

此规则的**错误**代码示例：

```js
/* no-restricted-imports: ["error", {
  "name": "disallowed-import",
  "message": "请改用 'allowed-import'"
}] */

import foo from "disallowed-import";
```

#### paths

这是一个对象选项，其值为一个包含你想要限制的模块名称的数组。

```json
{"rules: {"no-restricted-imports": ["error", { "paths": ["import1", "import2"] }]}}
```

`paths` 的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { "paths": ["cluster"] }] */

import cluster from "cluster";
```

也可以在 `paths` 数组中使用包含 `name` 和 `message` 的对象来为特定模块指定自定义消息。

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "message": "请改用 import-bar。"
  }, {
    "name": "import-baz",
    "message": "请改用 import-quux。"
  }]
}]
```

##### importNames

`paths` 中的这个选项是一个数组，可用于指定从模块导出的某些绑定名称。
在 `paths` 数组中指定的导入名称会影响对应对象中 `name` 属性所指定的模块，
因此在使用 `importNames` 或 `message` 选项时，必须先指定 `name` 属性。

在 `importNames` 数组中指定 `"default"` 字符串将限制默认导出的导入。

此规则的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { paths: [{
  "name": "foo",
  "importNames": ["default"]
}, {
  "name": "bar",
  "importNames": ["Baz"]
}]}] */

import DisallowedObject from "foo";
import { Baz } from "far";
```

##### allowImportNames

此选项是一个数组。`allowImportNames` 与 `importNames` 相反，它允许数组中指定的导入。
因此它会限制来自某个模块的所有导入，除了指定允许的那些。

注意：`allowImportNames` 不能与 `importNames` 组合使用。

此规则的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { paths: [{
  "name": "foo",
  "allowImportNames": ["AllowedObject"],
  "message": "请仅使用 'foo' 中的 'AllowedObject'。"
}]}] */

import { DisallowedObject } from "foo";
```

#### allowTypeImports

是否允许某个路径的仅类型导入。默认值：`false`。

此规则的**错误**代码示例：

```typescript
/* no-restricted-imports: ["error", { paths: [{
  "name": "foo",
  "allowTypeImports": true
}]}] */

import foo from "import-foo";
export { Foo } from "import-foo";
```

此规则的**正确**代码示例：

```typescript
/* no-restricted-imports: ["error", { paths: [{
  "name": "foo",
  "allowTypeImports": true
}]}] */

import type foo from "import-foo";
export type { Foo } from "import-foo";
```

#### patterns

这也是一个对象选项，其值为一个数组。
此选项允许你使用 `gitignore` 风格的模式或正则表达式指定多个要限制的模块。

`paths` 选项接受精确的导入路径，而 `patterns` 选项可以更灵活地指定导入路径，
从而可以限制同一目录下的多个模块。例如：

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
  }]
}]
```

这个配置会限制 `import-foo` 模块的导入，
但不会限制 `import-foo/bar` 或 `import-foo/baz` 的导入。你可以使用 `patterns` 同时限制它们：

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
  }],
  "patterns": [{
    "group": ["import-foo/ba*"],
  }]
}]
```

这个配置不仅会通过路径限制来自 `import-foo` 的导入，
还会通过 `patterns` 限制 `import-foo/bar` 和 `import-foo/baz`。

你也可以使用正则表达式来限制模块（参见 `regex` 选项）。

`patterns` 选项的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { "patterns": ["lodash/*"] }] */

import pick from "lodash/pick";
```

`patterns` 选项的**正确**代码示例：

```js
/* no-restricted-imports: ["error", { "patterns": ["crypto/*"] }] */

import crypto from "crypto";
```

##### group

`patterns` 数组也可以包含对象。`group` 属性用于指定 `gitignore` 风格的模式，
以限制模块，`message` 属性用于指定自定义消息。

在使用 `patterns` 选项时，`group` 或 `regex` 属性中至少需要有一个。

`group` 选项的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  group: ["lodash/*"],
  message: "请改用从 'lodash' 的默认导入。"
}]}] */

import pick from "lodash/pick";
```

##### regex

`regex` 属性用于指定限制模块的正则表达式模式。

注意：`regex` 不能与 `group` 组合使用。

**警告**：此规则使用 [Rust-Regex](https://docs.rs/regex/latest/regex/)，它并不支持所有 JS-Regex 特性，
例如 Lookahead 和 Lookbehind。

`regex` 选项的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  regex: "@app/(api|enums).*",
}]}] */

import Foo from "@app/api";
import Bar from "@app/api/bar";
import Baz from "@app/api/baz";
import Bux from "@app/api/enums/foo";
```

##### caseSensitive

这是一个布尔选项，当其为 `true` 时，会将 `group` 属性中指定的模式设置为区分大小写。默认值为 `false`。

**警告**：它不会对 `regex` 进行区分大小写检查。`regex` 使用 Rust-RegEx，其自身实现了大小写敏感性。

##### importNames

你也可以在 `patterns` 数组中的对象里指定 `importNames`。
在这种情况下，指定的名称只适用于关联的 `group` 或 `regex` 属性。

`patterns` 中 `importNames` 的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  group: ["utils/*"],
  importNames: ['isEmpty'],
  message: "改用 lodash 中的 'isEmpty'。"
}]}] */

import { isEmpty } from "utils/collection-utils";
```

##### allowImportNames

你也可以在 `patterns` 数组中的对象里指定 `allowImportNames`。
在这种情况下，指定的名称只适用于关联的 `group` 或 `regex` 属性。

注意：`allowImportNames` 不能与 `importNames`、`importNamePattern` 或 `allowImportNamePattern` 组合使用。

##### importNamePattern

此选项允许你使用正则表达式模式来限制导入名称。

`importNamePattern` 选项的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  group: ["foo/*"],
  importNamePattern: '^(is|has)',
  message: "请改用 baz/bar 中的 'is*' 和 'has*' 函数"
}]}] */

import { isSomething, hasSomething } from "foo/bar";
```

##### allowImportNamePattern

这是一个字符串选项。`allowImportNamePattern` 与 `importNamePattern` 相反，它允许匹配指定正则模式的导入。
因此它会限制来自某个模块的所有导入，除了指定允许的模式。

注意：`allowImportNamePattern` 不能与 `importNames`、`importNamePattern` 或 `allowImportNames` 组合使用。

```json
"no-restricted-imports": ["error", {
  "patterns": [{
    "group": ["import-foo/*"],
    "allowImportNamePattern": "^foo",
  }]
}]
```

`allowImportNamePattern` 选项的**错误**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  group: ["utils/*"],
  allowImportNamePattern: '^has'
}]}] */

import { isEmpty } from "utils/collection-utils";
```

`allowImportNamePattern` 选项的**正确**代码示例：

```js
/* no-restricted-imports: ["error", { patterns: [{
  group: ["utils/*"],
  allowImportNamePattern: '^is'
}]}] */

import { isEmpty } from "utils/collection-utils";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.0。

## 参考

<RuleReferences />
