---
title: "eslint/vars-on-top | Oxlint"
rule: "eslint/vars-on-top"
category: "Style"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/vars_on_top.rs`;
</script>

<RuleHeader />

### 作用

强制所有 `var` 声明都放在其所在作用域的顶部。

### 为什么这不好？

在 JavaScript 中，`var` 声明会被提升到其所在作用域的顶部。显式地将 `var` 声明放在顶部，可以让变量作用域更加清晰，从而提高代码的可读性和可维护性。

### 示例

以下是此规则的**错误**代码示例：

```js
function doSomething() {
  if (true) {
    var first = true;
  }
  var second;
}

function doSomethingElse() {
  for (var i = 0; i < 10; i++) {}
}

f();
var a;

class C {
  static {
    if (something) {
      var a = true;
    }
  }
  static {
    f();
    var a;
  }
}
```

以下是此规则的**正确**代码示例：

```js
function doSomething() {
  var first;
  var second;
  if (true) {
    first = true;
  }
}

function doSomethingElse() {
  var i;
  for (i = 0; i < 10; i++) {}
}

var a;
f();

class C {
  static {
    var a;
    if (something) {
      a = true;
    }
  }
  static {
    var a;
    f();
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.4。

## 参考资料

<RuleReferences />
