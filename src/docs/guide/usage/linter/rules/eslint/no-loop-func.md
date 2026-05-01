---
title: "eslint/no-loop-func"
category: "Pedantic"
version: "1.33.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_loop_func.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在循环语句内部声明函数或使用函数表达式，
当它们引用了外部作用域中声明、且可能在各次迭代中发生变化的变量时。

### 为什么这很糟糕？

在循环中编写函数往往会由于 JavaScript 中闭包的工作方式而导致错误。
函数是按引用捕获变量，而不是按值捕获。使用 `var` 时，由于它是函数作用域，
所有迭代都会共享同一个变量绑定，从而导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```js
for (var i = 0; i < 10; i++) {
  funcs[i] = function () {
    return i;
  };
}
```

以下是此规则的**正确**代码示例：

```js
for (let i = 0; i < 10; i++) {
  funcs[i] = function () {
    return i;
  };
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.33.0 中添加。

## 参考资料

<RuleReferences />
