---
title: "import/no-dynamic-require"
category: "Restriction"
version: "0.9.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_dynamic_require.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用表达式作为模块参数的导入。这包括在 `require` 或 `import` 语句中动态解析的路径。

### 为什么这不好？

在导入语句中使用运行时才会解析的表达式，会使得很难确定模块是从哪里被导入的。这会使代码导航变得复杂，并阻碍静态分析工具的工作；这些工具依赖可预测的模块路径来进行 lint 检查、打包以及其他优化。

### 示例

以下是此规则下**错误**代码的示例：

```javascript
require(name);
require(`../${name}`);
```

以下是此规则下**正确**代码的示例：

```javascript
require("../name");
require(`../name`);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### esmodule

type: `boolean`

default: `false`

当为 `true` 时，也会检查 `import()` 表达式中的动态模块说明符。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.9.3 中添加的。

## 参考资料

<RuleReferences />
