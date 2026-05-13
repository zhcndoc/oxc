---
title: "eslint/max-lines-per-function | Oxlint"
rule: "eslint/max-lines-per-function"
category: "Pedantic"
version: "0.15.12"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_lines_per_function.rs`;
</script>

<RuleHeader />

### 作用

强制限制函数中的最大代码行数。此规则确保函数不超过指定的行数，提倡更小、更专注的函数，使其更易于维护和理解。

### 为什么不好？

有些人认为大型函数是代码异味。大型函数倾向于做很多事情，使得难以跟进发生了什么。许多编码风格指南规定了函数所能包含的行数限制。此规则可以帮助强制实施该风格。

### 示例

此规则在特定最大值下的 **错误** 代码示例：

```js
/* { "eslint/max-lines-per-function": ["error", 2] } */
function foo() {
  const x = 0;
}

/* { "eslint/max-lines-per-function": ["error", 4] } */
function foo() {
  // 一条注释后跟一个空行

  const x = 0;
}
```

此规则在特定最大值下的 **正确** 代码示例：

```js
/* { "eslint/max-lines-per-function": ["error", 3] } */
function foo() {
  const x = 0;
}

/* { "eslint/max-lines-per-function": ["error", 5] } */
function foo() {
  // 一条注释后跟一个空行

  const x = 0;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### IIFEs

类型：`boolean`

默认值：`false`

`IIFEs` 选项控制是否将 IIFE 包含在行数计数中。默认情况下，不考虑 IIFE，但当设置为 `true` 时，它们将包含在函数的行数计数中。

### max

类型：`integer`

默认值：`50`

函数中允许的最大行数。

### skipBlankLines

类型：`boolean`

默认值：`false`

跳过仅由空白字符组成的行。

### skipComments

类型：`boolean`

默认值：`false`

跳过仅包含注释的行。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.12 中添加。

## 参考资料

<RuleReferences />
