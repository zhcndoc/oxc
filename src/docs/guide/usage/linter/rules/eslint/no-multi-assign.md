---
title: "eslint/no-multi-assign | Oxlint"
rule: "eslint/no-multi-assign"
category: "Style"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-multi-assign"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_multi_assign.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用链式赋值表达式。

### 为什么这不好？

变量的链式赋值可能导致意外结果，而且难以阅读。

```js
(function () {
  const foo = (bar = 0); // 你是想写成 `foo = bar == 0` 吗？
  bar = 1; // 这不会失败，因为 `bar` 不是常量。
})();
console.log(bar); // 这将输出 1，因为 `bar` 不在作用域内。
```

### 示例

以下是此规则的**错误**代码示例：

```js
var a = (b = c = 5);

const foo = (bar = "baz");

let d = (e = f);

class Foo {
  a = (b = 10);
}

a = b = "quux";
```

以下是此规则的**正确**代码示例：

```js
var a = 5;
var b = 5;
var c = 5;

const foo = "baz";
const bar = "baz";

let d = c;
let e = c;

class Foo {
  a = 10;
  b = 10;
}

a = "quux";
b = "quux";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreNonDeclaration

type: `boolean`

default: `false`

当设置为 `true` 时，该规则允许不包括在声明中初始化变量或初始化类字段的链式赋值。

以下是当此选项设置为 `true` 时的**正确**代码示例：

```js
let a;
let b;
a = b = "baz";

const x = {};
const y = {};
x.one = y.one = 1;
```

以下是当此选项设置为 `true` 时的**错误**代码示例：

```js
let a = (b = "baz");

const foo = (bar = 1);

class Foo {
  a = (b = 10);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.4 中添加。

## 参考资料

<RuleReferences />
