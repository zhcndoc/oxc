---
title: "unicorn/numeric-separators-style | Oxlint"
rule: "unicorn/numeric-separators-style"
category: "样式"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/numeric_separators_style.rs`;
</script>

<RuleHeader />

### 它的作用

通过数字分隔符强制使用数字分组的约定。

### 这为什么不好？

一长串数字可能难以阅读，
也可能难以一眼确定数字的值。
使用数字分隔符（`_`）将数字拆分开来可以大大
提高可读性。

比较下面这两个数字，以及理解它们数量级的难易程度：

```js
1000000000;
1_000_000_000;
```

此规则还会强制正确的分组大小，例如
要求每 3 位使用一次 `_` 分隔符。

### 示例

此规则的**错误**代码示例：

```javascript
const invalid = [1_23_4444, 1_234.56789, 0xab_c_d_ef, 0b10_00_1111, 0o1_0_44_21, 1_294_28771_2n];
```

此规则的**正确**代码示例：

```javascript
const valid = [1_234_567, 1_234.567_89, 0xab_cd_ef, 0b1000_1111, 0o10_4421, 1_294_287_712n];
```

## 配置

此规则接受一个包含以下属性的配置对象：

### binary

type: `object`

default: `{"groupLength":4, "minimumDigits":0}`

二进制字面量的配置（例如 `0b1010_0001` 及 bigint 变体）。
控制数字如何分组以及何时应用分隔符。

#### binary.groupLength

type: `integer`

default: `0`

插入数字分隔符时每组的数字位数。
例如，`groupLength` 为 3 时，`1234567` 会格式化为 `1_234_567`。

#### binary.minimumDigits

type: `integer`

default: `0`

应用分组前所需的最少数字位数。
少于此阈值的值不会分组。

#### binary.onlyIfContainsSeparator

type: `boolean`

仅在数字字面量已经包含分隔符（`_`）时强制执行该规则。

当为 `true` 时，没有分隔符的数字将保持原样；当为 `false`（默认）时，
即使尚未包含分隔符，也会对符合条件的数字强制分组。

### hexadecimal

type: `object`

default: `{"groupLength":2, "minimumDigits":0}`

十六进制字面量的配置（例如 `0xAB_CD`、`0Xab_cd` 以及 bigint 变体）。
控制数字如何分组以及何时应用分隔符。

#### hexadecimal.groupLength

type: `integer`

default: `0`

插入数字分隔符时每组的数字位数。
例如，`groupLength` 为 3 时，`1234567` 会格式化为 `1_234_567`。

#### hexadecimal.minimumDigits

type: `integer`

default: `0`

应用分组前所需的最少数字位数。
少于此阈值的值不会分组。

#### hexadecimal.onlyIfContainsSeparator

type: `boolean`

仅在数字字面量已经包含分隔符（`_`）时强制执行该规则。

当为 `true` 时，没有分隔符的数字将保持原样；当为 `false`（默认）时，
即使尚未包含分隔符，也会对符合条件的数字强制分组。

### number

type: `object`

十进制数字的配置（整数、小数部分和指数）。
控制数字如何分组以及何时应用分隔符。

#### number.fractionGroupLength

type: `integer`

default: `Infinity`

小数部分（小数点后）每组数字的位数。

#### number.groupLength

type: `integer`

default: `0`

插入数字分隔符时每组的数字位数。
例如，`groupLength` 为 3 时，`1234567` 会格式化为 `1_234_567`。

#### number.minimumDigits

type: `integer`

default: `0`

应用分组前所需的最少数字位数。
少于此阈值的值不会分组。

#### number.onlyIfContainsSeparator

type: `boolean`

仅在数字字面量已经包含分隔符（`_`）时强制执行该规则。

当为 `true` 时，没有分隔符的数字将保持原样；当为 `false`（默认）时，
即使尚未包含分隔符，也会对符合条件的数字强制分组。

### octal

type: `object`

default: `{"groupLength":4, "minimumDigits":0}`

八进制字面量的配置（例如 `0o1234_5670` 及 bigint 变体）。
控制数字如何分组以及何时应用分隔符。

#### octal.groupLength

type: `integer`

default: `0`

插入数字分隔符时每组的数字位数。
例如，`groupLength` 为 3 时，`1234567` 会格式化为 `1_234_567`。

#### octal.minimumDigits

type: `integer`

default: `0`

应用分组前所需的最少数字位数。
少于此阈值的值不会分组。

#### octal.onlyIfContainsSeparator

type: `boolean`

仅在数字字面量已经包含分隔符（`_`）时强制执行该规则。

当为 `true` 时，没有分隔符的数字将保持原样；当为 `false`（默认）时，
即使尚未包含分隔符，也会对符合条件的数字强制分组。

### onlyIfContainsSeparator

type: `boolean`

default: `false`

仅在数字字面量已经包含分隔符（`_`）时强制执行该规则。

当为 `true` 时，没有分隔符的数字将保持原样；当为 `false`（默认）时，
即使尚未包含分隔符，也会对符合条件的数字强制分组。

## How to use

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考

<RuleReferences />
