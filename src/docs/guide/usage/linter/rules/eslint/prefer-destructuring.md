---
title: "eslint/prefer-destructuring | Oxlint"
rule: "eslint/prefer-destructuring"
category: "Style"
version: "1.10.0"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/prefer-destructuring"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_destructuring.rs`;
</script>

<RuleHeader />

### 它的作用

要求对数组和/或对象进行解构。

### 为什么这不好？

在 JavaScript ES2015 中，新增了一种从数组索引或对象属性创建变量的语法，称为解构。此规则强制使用解构，
而不是通过成员表达式访问属性。

### 示例

以下是此规则的**错误**代码示例：

```js
// 启用 `array` 时
const foo = array[0];
bar.baz = array[0];
// 启用 `object` 时
const qux = object.qux;
const quux = object["quux"];
```

以下是此规则的**正确**代码示例：

```js
// 启用 `array` 时
const [foo] = array;
const arr = array[someIndex];
[bar.baz] = array;

// 启用 `object` 时
const { baz } = object;
const obj = object.bar;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### AssignmentExpression

type: `object`

default: `{"array":true, "object":true}`

用于在赋值表达式中进行解构的配置，数组和对象分别独立配置。

#### AssignmentExpression.array

type: `boolean`

default: `true`

#### AssignmentExpression.object

type: `boolean`

default: `true`

### VariableDeclarator

type: `object`

default: `{"array":true, "object":true}`

用于在变量声明中进行解构的配置，数组和对象分别独立配置。

#### VariableDeclarator.array

type: `boolean`

default: `true`

#### VariableDeclarator.object

type: `boolean`

default: `true`

### enforceForRenamedProperties

type: `boolean`

default: `false`

决定对象解构规则是否适用于重命名变量。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.10.0 中新增。

## 参考资料

<RuleReferences />
