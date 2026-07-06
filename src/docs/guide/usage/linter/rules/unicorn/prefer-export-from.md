---
title: "unicorn/prefer-export-from | Oxlint"
rule: "unicorn/prefer-export-from"
category: "样式"
version: "1.70.0"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_export_from.rs`;
</script>

<RuleHeader />

### 作用

当从某个模块重新导出时，没有必要先导入再导出。
可以使用一条单独的 export…from 声明来完成。
这条规则鼓励使用直接重新导出语法（export ... from），而不是先导入再导出。
它有助于减少样板代码，并通过避免不必要的局部绑定来保持模块作用域整洁。

### 为什么这是不好的？

将重新导出拆分为 import 和 export 语句是不推荐的，因为这会
不必要地污染当前模块的作用域，并增加多余的样板代码。

### 示例

以下是此规则的**错误**代码示例：

```js
import defaultExport from "./foo.js";
export default defaultExport;
```

以下是此规则的**正确**代码示例：

```js
export { default } from "./foo.js";
```

以下是此规则的**错误**代码示例：

```js
import { named } from "./foo.js";
export { named };
```

以下是此规则的**正确**代码示例：

```js
export { named } from "./foo.js";
```

## 配置

此规则接受一个配置对象，包含以下属性：

### checkUsedVariables

类型：`boolean`

默认值：`true`

当为 false 时，如果任何导入绑定在除重新导出之外的其他地方被使用，则会忽略导入声明中的所有变量。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.70.0 中添加。

## 参考资料

<RuleReferences />
