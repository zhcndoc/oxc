---
title: "eslint/max-depth | Oxlint"
rule: "eslint/max-depth"
category: "Pedantic"
version: "0.15.12"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/max-depth"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_depth.rs`;
</script>

<RuleHeader />

### 作用

强制限制块可以嵌套的最大深度。此规则有助于限制嵌套块的复杂度，通过确保代码不会嵌套过深来提高可读性和可维护性。

### 为什么不好？

许多开发者认为，如果块嵌套超过一定深度，代码将难以阅读。过多的嵌套会使跟踪代码流程变得更加困难，增加认知负荷，并使维护更容易出错。通过强制限制最大块深度，此规则鼓励更清晰、更易读的代码。

### 示例

此规则在默认 `{ "max": 3 }` 选项下的 **错误** 代码示例：

```js
function foo() {
  for (;;) { // 嵌套 1 层深
    while (true) { // 嵌套 2 层深
      if (true) { // 嵌套 3 层深
        if (true) { // 嵌套 4 层深 }
      }
    }
  }
}
```

此规则在默认 `{ "max": 3 }` 选项下的 **正确** 代码示例：

```js
function foo() {
  for (;;) { // 嵌套 1 层深
    while (true) { // 嵌套 2 层深
      if (true) { // 嵌套 3 层深 }
    }
  }
}
```

请注意，类静态块不计入嵌套块，并且其中的深度是单独计算的，与包围上下文无关。

示例：

```js
function foo() {
  if (true) { // 嵌套 1 层深
    class C {
      static {
        if (true) { // 嵌套 1 层深
          if (true) { // 嵌套 2 层深 }
        }
      }
    }
  }
}
```

## 配置

### max

类型：`integer`

默认值：`4`

`max` 强制限制块可以嵌套的最大深度

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.12。

## 参考资料

<RuleReferences />
