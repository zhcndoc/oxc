---
title: "unicorn/prefer-native-coercion-functions | Oxlint"
rule: "unicorn/prefer-native-coercion-functions"
category: "Pedantic"
version: "0.0.19"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_native_coercion_functions.rs`;
</script>

<RuleHeader />

### 作用

优先使用内置函数，而不是具有相同功能的自定义函数。

### 为什么这不好？

如果一个函数等价于 [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)、[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)、[`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 或 [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)，你应该直接使用原生的那个。
将原生函数再包装一层是没有意义的。

### 示例

此规则的**错误**代码示例：

```javascript
const foo = (v) => String(v);
foo(1);
const foo = (v) => Number(v);
array.some((v) => /* 注释 */ v);
```

此规则的**正确**代码示例：

```javascript
String(1);
Number(1);
array.some(Boolean);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考资料

<RuleReferences />
