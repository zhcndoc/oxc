---
title: "eslint/no-labels | Oxlint"
rule: "eslint/no-labels"
category: "Style"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_labels.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用带标签的语句。

### 为什么这很糟糕？

JavaScript 中的带标签语句与 `break` 和 `continue` 一起使用，用于控制多个循环之间的流程。例如：

```js
outer: while (true) {
  while (true) {
    break outer;
  }
}
```

`break outer` 语句可确保这段代码不会进入无限循环，因为控制流会在应用了 `outer` 标签后的下一条语句继续执行。如果将这条语句改为仅使用 `break`，控制流就会回到外层 `while` 语句，从而导致无限循环。
虽然在某些情况下很方便，但标签通常很少使用，并且一些人认为它是一种补救式的流程控制方式，更容易出错，也更难理解。

### 示例

此规则的**错误**代码示例：

```js
label: while (true) {
  // ...
}

label: while (true) {
  break label;
}

label: while (true) {
  continue label;
}

label: switch (a) {
  case 0:
    break label;
}

label: {
  break label;
}

label: if (a) {
  break label;
}
```

此规则的**正确**代码示例：

```js
var f = {
  label: "foo",
};

while (true) {
  break;
}

while (true) {
  continue;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowLoop

类型：`boolean`

默认值：`false`

如果设置为 `true`，此规则会忽略附着在循环语句上的标签。
将此选项设置为 `true` 时的**正确**代码示例：

```js
label: while (true) {
  break label;
}
```

### allowSwitch

类型：`boolean`

默认值：`false`

如果设置为 `true`，此规则会忽略附着在 switch 语句上的标签。
将此选项设置为 `true` 时的**正确**代码示例：

```js
label: switch (a) {
  case 0:
    break label;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.4 中加入。

## 参考资料

<RuleReferences />
