---
title: "eslint/sort-vars"
category: "Pedantic"
version: "0.9.3"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/sort_vars.rs`;
</script>

<RuleHeader />

### 作用

当在同一个代码块中声明多个变量时，对变量名进行排序会让
以后更容易找到所需的变量。

### 为什么这不好？

未排序的变量声明会让代码更难阅读和维护。

### 示例

以下是此规则的**错误**代码示例：

```js
var b, a;
var a, B, c;
```

以下是此规则的**正确**代码示例：

```js
var a, b, c, d;
var B, a, c;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreCase

type: `boolean`

default: `false`

当为 `true` 时，该规则在对变量排序时会忽略大小写。

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v0.9.3 起添加。

## 参考资料

<RuleReferences />
