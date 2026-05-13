---
title: "eslint/max-nested-callbacks | Oxlint"
rule: "eslint/max-nested-callbacks"
category: "Pedantic"
version: "0.15.12"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_nested_callbacks.rs`;
</script>

<RuleHeader />

### 作用

强制规定回调函数可以嵌套的最大深度。此规则有助于限制回调嵌套的复杂度，确保回调不会嵌套过深，从而提高代码的可读性和可维护性。

### 为什么不好？

许多 JavaScript 库使用回调模式来管理异步操作。任何复杂程度的程序大多需要在不同并发级别上管理多个异步操作。一个常见的陷阱是过度嵌套回调，使得代码更难阅读和理解。

### 示例

此规则在 `{ "max": 3 }` 选项下**错误**代码的示例：

```js
foo1(function () {
  foo2(function () {
    foo3(function () {
      foo4(function () {
        // ...
      });
    });
  });
});
```

此规则在 `{ "max": 3 }` 选项下**正确**代码的示例：

```js
foo1(handleFoo1);

function handleFoo1() {
  foo2(handleFoo2);
}

function handleFoo2() {
  foo3(handleFoo3);
}

function handleFoo3() {
  foo4(handleFoo4);
}

function handleFoo4() {
  foo5();
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### max

类型：`integer`

默认值：`10`

`max` 强制规定回调函数可以嵌套的最大深度。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.12 中添加。

## 参考资料

<RuleReferences />
