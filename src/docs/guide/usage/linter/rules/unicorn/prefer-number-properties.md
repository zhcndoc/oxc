---
title: "unicorn/prefer-number-properties | Oxlint"
rule: "unicorn/prefer-number-properties"
category: "Restriction"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_number_properties.rs`;
</script>

<RuleHeader />

### 作用

不允许将 `parseInt()`、`parseFloat()`、`isNaN()`、`isFinite()`、`NaN`、`Infinity` 和 `-Infinity` 作为全局变量使用。

### 为什么这不好？

ECMAScript 2015 为了保持一致性并稍微改进这些全局对象，将它们移到了 `Number` 构造函数上。此规则强制使用这些属性，以减少全局变量的使用：

- 使用 [`Number.parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) 而不是 [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- 使用 [`Number.parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat) 而不是 [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- 使用 [`Number.isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 而不是 [`isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) _（它们的[行为略有不同](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#difference_between_number.isnan_and_global_isnan)）_
- 使用 [`Number.isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) 而不是 [`isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite) _（它们的[行为略有不同](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#difference_between_number.isfinite_and_global_isfinite)）_
- 使用 [`Number.NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 而不是 [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
- 使用 [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) 而不是 [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)
- 使用 [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY) 而不是 [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

### 示例

此规则的**错误**代码示例：

```javascript
const foo = parseInt("10", 2);
const bar = parseFloat("10.5");
```

此规则的**正确**代码示例：

```javascript
const foo = Number.parseInt("10", 2);
const bar = Number.parseFloat("10.5");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkInfinity

类型：`boolean`

默认值：`false`

如果设置为 `true`，则检查是否使用 `Infinity` 和 `-Infinity` 作为全局变量。

### checkNaN

类型：`boolean`

默认值：`true`

如果设置为 `true`，则检查是否使用 `NaN` 作为全局变量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中加入。

## 参考资料

<RuleReferences />
