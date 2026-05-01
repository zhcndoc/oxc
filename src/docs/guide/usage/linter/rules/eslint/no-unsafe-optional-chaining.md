---
title: "eslint/no-unsafe-optional-chaining"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unsafe_optional_chaining.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `undefined` 值不被允许的上下文中使用可选链。

### 为什么这不好？

可选链（`?.`）表达式可能会短路并返回 `undefined`。
因此，将求值后的可选链表达式当作函数、对象、数字等来使用，
可能会导致 TypeError 或意外结果。例如：

### 示例

以下是此规则的**错误**代码示例：

```javascript
var obj = undefined;
1 in obj?.foo; // TypeError
with (obj?.foo); // TypeError
for (bar of obj?.foo); // TypeError
bar instanceof obj?.foo; // TypeError
const { bar } = obj?.foo; // TypeError
```

## 配置

此规则接受一个包含以下属性的配置对象：

### disallowArithmeticOperators

type: `boolean`

default: `false`

禁止在可选链表达式上进行算术运算。
如果为 true，则此规则会警告对可选链表达式进行算术运算，因为这可能会导致 NaN。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.5 中添加。

## 参考资料

<RuleReferences />
