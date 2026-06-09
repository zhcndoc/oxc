---
title: "nextjs/no-assign-module-variable | Oxlint"
rule: "nextjs/no-assign-module-variable"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-assign-module-variable"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_assign_module_variable.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 Next.js 应用中对名为 `module` 的变量进行赋值或声明。

### 为什么这不好？

变量名 `module` 在 Next.js 中保留用于内部使用和模块系统功能。声明你自己的 `module` 变量可能会与 Next.js 的内部模块系统冲突，导致应用中出现意外行为，并引发代码分割和热模块替换方面的问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 声明 module 变量
let module = {};

// 在变量声明中使用 module
const module = {
  exports: {},
};

// 赋值给 module
module = { id: "my-module" };
```

以下是此规则的**正确**代码示例：

```javascript
// 使用不同的变量名
let myModule = {};

// 使用更具描述性的名称
const customModule = {
  exports: {},
};

// 访问实际的 module 对象（在可用时）
console.log(module.exports);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考资料

<RuleReferences />
