---
title: "eslint/object-shorthand"
category: "Style"
version: "1.59.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/object_shorthand.rs`;
</script>

<RuleHeader />

### 它的作用

要求或禁止对象字面量使用方法和属性的简写语法

### 为什么这不好？

风格偏好

### 示例

以下是一些使用 ES5 语法的常见示例：

```javascript
var properties = { x: x, y: y, z: z };
var methods = { a: function () {}, b: function () {} };
```

下面是对应的 ES6 写法：

```javascript
var properties = { x, y, z };
var methods = { a() {}, b() {} };
```

## 配置

### 第 1 个选项

type: `"always" | "methods" | "properties" | "consistent" | "consistent-as-needed" | "never"`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### avoidExplicitReturnArrows

type: `boolean`

default: `false`

#### avoidQuotes

type: `boolean`

default: `false`

#### ignoreConstructors

type: `boolean`

default: `false`

#### methodsIgnorePattern

type: `string`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.59.0 中添加。

## 参考资料

<RuleReferences />
