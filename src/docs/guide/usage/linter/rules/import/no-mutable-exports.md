---
title: "import/no-mutable-exports"
category: "Style"
version: "0.15.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_mutable_exports.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 var 或 let 导出可变变量。

### 为什么这不好？

通常情况下，我们应该始终导出常量

### 示例

以下是此规则的**错误**代码示例：

```js
export let count = 2;
export var count = 3;

let count = 4;
export { count };
```

以下是此规则的**正确**代码示例：

```js
export const count = 1;
export function getCount() {}
export class Counter {}
```

### 函数/类

请注意，已导出的 function/class 声明标识符可能会被重新赋值，
但目前不会被此规则标记。将来可能会。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.13 中加入。

## 参考资料

<RuleReferences />
