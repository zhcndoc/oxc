---
title: "import/no-namespace | Oxlint"
rule: "import/no-namespace"
category: "样式"
version: "0.12.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_namespace.rs`;
</script>

<RuleHeader />

### 作用

强制遵循不使用命名空间（即“通配符” \*）导入的约定。

### 这为什么不好？

命名空间导入虽然有时会被使用，但在现代 JavaScript 开发中，通常被认为不那么理想，原因如下：

1. **特指性和命名空间污染**：

- **特指性**：命名空间导入会导入整个模块，把所有内容都带入，即使你只需要少数特定函数或类。这可能会在不同模块对不同函数使用相同名称时导致潜在的命名冲突。
- **污染**：导入整个命名空间会用可能并不需要的函数和变量污染当前作用域。这会增加无意中使用了不想要的函数或变量的可能性，从而导致更难调试的错误。

2. **可维护性**：

- **清晰性**：命名空间导入会让人更难理解代码中具体使用了哪些函数或类。对于导入项很多的大型项目来说尤其如此。
- **重构**：如果被导入模块中的某个函数或类名称发生变化，而你使用的是命名空间导入，那么你可能需要更新代码的多个部分。在处理多个命名空间时，这会变得更加困难。

3. **现代实践**：

- **显式导入**：现代 JavaScript 实践鼓励针对特定组件使用显式导入。这能提升代码可读性和可维护性。
- **Tree-Shaking**：Webpack 和 Rollup 等工具会使用 tree-shaking 从打包结果中移除未使用的代码。命名空间导入可能会阻碍高效的 tree-shaking，导致更大的打包体积。

### 示例

以下是此规则的**错误**代码示例：

```js
import * as user from "user-lib";

import some, * as user from "./user";
```

以下是此规则的**正确**代码示例：

```js
import { getUserName, isUser } from "user-lib";

import user from "user-lib";
import defaultExport, { isUser } from "./user";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignore

type: `string[]`

default: `[]`

一个用于需要被该规则忽略的模块的 glob 字符串数组。
例如，`["*.json"]` 将忽略所有 JSON 导入。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.12.0 中添加。

## 参考资料

<RuleReferences />
