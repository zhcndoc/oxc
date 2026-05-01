---
title: "unicorn/no-typeof-undefined"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_typeof_undefined.rs`;
</script>

<RuleHeader />

### 作用

不允许使用 `typeof` 与 `undefined` 进行比较。

### 为什么这不好？

使用 `typeof value === 'undefined'` 来检查一个值是否为 `undefined`，过于冗长。通常更好的是直接与 `undefined` 比较。只有在全局变量可能不存在时才需要使用 `typeof`，在这种情况下，使用 `globalThis.value === undefined` 可能更好。

### 示例

此规则的**不正确**代码示例：

```javascript
typeof foo === "undefined";
```

此规则的**正确**代码示例：

```javascript
foo === undefined;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkGlobalVariables

type: `boolean`

default: `false`

如果设置为 `true`，当 `x` 可能是一个未声明的全局变量时，也会报告 `typeof x === "undefined"`（通常通过 `typeof foo === "undefined"` 来检查）。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中加入。

## 参考

<RuleReferences />
