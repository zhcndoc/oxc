---
title: "import/first"
category: "Style"
version: "0.11.1"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/first.rs`;
</script>

<RuleHeader />

### 作用

禁止在导入语句之前出现任何非导入语句，除指令外。

### 为什么这不好？

值得注意的是，import 会被提升，这意味着被导入的模块会在它们之间夹杂的任何语句之前执行。
将所有 import 统一放在文件顶部，可以避免因规范的这一部分而产生的意外情况

### 示例

以下是此规则的**错误**代码示例：

```js
import { x } from "./foo";
export { x };
import { y } from "./bar";
```

以下是此规则的**正确**代码示例：

```js
import { x } from "./foo";
import { y } from "./bar";
export { x, y };
```

## 配置

此规则接受以下字符串值之一：

### `"absolute-first"`

强制绝对导入排在相对导入之前。

以下是使用 `"absolute-first"` 时此规则的**错误**代码示例：

```js
import { x } from "./foo";
import { y } from "bar";
```

以下是使用 `"absolute-first"` 时此规则的**正确**代码示例：

```js
import { y } from "bar";
import { x } from "./foo";
```

### `"disable-absolute-first"`

禁用 absolute-first 行为。
这是默认行为。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.11.1 中添加。

## 参考

<RuleReferences />
