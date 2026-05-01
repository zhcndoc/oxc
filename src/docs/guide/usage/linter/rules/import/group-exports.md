---
title: "import/group-exports"
category: "Style"
version: "0.16.6"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/group_exports.rs`;
</script>

<RuleHeader />

### 它的作用

当具名导出没有在单个 export 声明中分组时，或者当对 CommonJS 的 module.exports
或 exports 对象有多个赋值并存在于同一个文件中时，会进行报告。

### 为什么这不好？

export 声明或 module.exports 赋值可以出现在代码中的任何位置。
通过要求使用单个 export 声明，所有导出都将保持在同一个位置，
这样更容易看出一个模块提供了哪些导出。

### 示例

以下是此规则的**错误**代码示例：

```js
export const first = true;
export const second = true;
```

以下是此规则的**正确**代码示例：

```js
const first = true;
const second = true;
export { first, second };
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.6 中新增。

## 参考资料

<RuleReferences />
