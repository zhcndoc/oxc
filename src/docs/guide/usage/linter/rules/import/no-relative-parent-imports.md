---
title: "import/no-relative-parent-imports | Oxlint"
rule: "import/no-relative-parent-imports"
category: "Restriction"
version: "1.43.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_relative_parent_imports.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用相对路径从父目录导入模块。

### 为什么这不好？

这一限制强制使用树状的文件夹结构，而不是复杂的
图状结构，从而让大型代码库更易于维护。
依赖关系单向流动（从父到子），这使得
模块关系更加清晰。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import foo from "../bar";
import foo from "../../utils/helper";
const baz = require("../config");
export { qux } from "../shared";
```

以下是此规则的**正确**代码示例：

```javascript
import foo from "lodash";
import a from "./lib/a";
import b from "./b";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.43.0 中添加。

## 参考资料

<RuleReferences />
