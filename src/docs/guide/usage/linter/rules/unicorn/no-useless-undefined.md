---
title: "unicorn/no-useless-undefined | Oxlint"
rule: "unicorn/no-useless-undefined"
category: "Pedantic"
version: "0.6.1"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_undefined.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 `undefined` 毫无意义的情况下使用它。

::: warning
此规则可能会与 `eslint/array-callback-return`
和 `eslint/getter-return` 规则的默认行为冲突。对于这两个规则，你可以设置
`allowImplicit` 选项来避免冲突。
:::

### 为什么这不好？

`undefined` 是新变量、参数、
返回语句等的默认值，因此在这些情况下指定 `undefined`
是没有意义的。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let foo = undefined;
const noop = () => undefined;
```

以下是此规则的**正确**代码示例：

```javascript
let foo;
const noop = () => {};
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkArguments

type: `boolean`

default: `true`

是否检查函数调用参数中无意义的 `undefined`。

### checkArrowFunctionBody

type: `boolean`

default: `true`

是否检查箭头函数体中无意义的 `undefined`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.6.1 中添加。

## 参考资料

<RuleReferences />
