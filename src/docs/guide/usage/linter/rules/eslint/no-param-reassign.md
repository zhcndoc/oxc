---
title: "eslint/no-param-reassign | Oxlint"
rule: "eslint/no-param-reassign"
category: "Restriction"
version: "1.20.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_param_reassign.rs`;
</script>

<RuleHeader />

### 它的作用

禁止重新赋值函数参数，或者可选地禁止重新赋值其属性。

### 为什么这很糟糕？

重新赋值参数可能会导致意外行为，尤其是在依赖传入函数的原始参数时。修改参数属性也可能同样令人意外，并且更难推理。

### 示例

```javascript
function foo(bar) {
  bar = 1;
}

function baz(qux) {
  qux.prop = 2; // 当启用 `props` 选项时
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignorePropertyModificationsFor

type: `string[]`

default: `[]`

一个参数名数组，应忽略这些参数名的属性修改。

### ignorePropertyModificationsForRegex

type: `string[]`

default: `[]`

一个参数名的正则表达式模式数组（以字符串形式），应忽略这些参数名的属性修改。
请注意，这里使用的是 [Rust 正则表达式语法](https://docs.rs/regex/latest/regex/)，因此可能不具备 JavaScript 正则表达式中的所有特性。

### props

type: `boolean`

default: `false`

当为 true 时，也会检查对参数属性的修改。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中添加。

## 参考资料

<RuleReferences />
