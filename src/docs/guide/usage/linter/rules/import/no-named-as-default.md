---
title: "import/no-named-as-default | Oxlint"
rule: "import/no-named-as-default"
category: "可疑"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_named_as_default.rs`;
</script>

<RuleHeader />

### 它的作用

报告将已导出的名称用作默认导出的本地导入名。
当导入的默认导出被赋予一个与同一模块中的命名导出冲突的名称时，就会发生这种情况。

### 为什么这很糟糕？

将命名导出的标识符用于默认导出可能会造成混淆，
并在理解正在导入哪个值时引发错误。这也会降低
代码清晰度，使其他开发者更难理解预期的
导入内容。

### 示例

给定

```javascript
// foo.js
export default "foo";
export const bar = true;
```

此规则的**错误**代码示例：

```javascript
// 无效：将已导出的名称 'bar' 用作默认导出的标识符。
import bar from "./foo.js";
```

此规则的**正确**代码示例：

```javascript
// 有效：使用不冲突的名称正确导入默认导出。
import foo from "./foo.js";
```

### 与 `eslint-plugin-import` 的差异

如果您发现此规则实现与原始 `eslint-plugin-import`
规则之间存在差异，请注意，由于模块解析的实现和配置方式不同，
在某些情况下行为可能会有所不同。

例如，原始规则可能需要额外的解析器配置来处理某些
导入，尤其是在使用 TypeScript 路径或在包含多个
`tsconfig.json` 文件的 monorepo 设置中。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.3 中添加的。

## 参考资料

<RuleReferences />
