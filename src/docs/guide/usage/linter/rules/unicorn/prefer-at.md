---
title: "unicorn/prefer-at | Oxlint"
rule: "unicorn/prefer-at"
category: "Pedantic"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_at.rs`;
</script>

<RuleHeader />

### 作用

优先使用用于索引访问的 [`Array#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) 和
[`String#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at)
方法。

此规则也不鼓励使用 [`String#charAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)。

### 为什么这不好？

`.at()` 方法在按索引访问元素时更易读，也更一致，
尤其是对于负索引，它们会从数组或字符串末尾开始访问元素。

### 示例

以下是此规则的**错误**代码示例：

```js
const foo = array[array.length - 1];
const foo = array.slice(-1)[0];
const foo = string.charAt(string.length - 1);
```

以下是此规则的**正确**代码示例：

```js
const foo = array.at(-1);
const foo = array.at(-5);
const foo = string.at(-1);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkAllIndexAccess

type: `boolean`

default: `false`

检查所有索引访问，而不仅仅是像 `array.length - 1` 这样的特殊模式。
启用后，`array[0]`、`array[1]` 等也会被标记。

### getLastElementFunctions

type: `string[]`

default: `[]`

将函数名称列表视为“获取最后一个元素”函数。
这些函数将检查是否使用了 `.at(-1)`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中添加。

## 参考资料

<RuleReferences />
