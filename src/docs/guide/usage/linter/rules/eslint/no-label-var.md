---
title: "eslint/no-label-var"
category: "Style"
version: "0.6.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_label_var.rs`;
</script>

<RuleHeader />

### 作用

禁止与变量同名的标签。

### 为什么这不好？

此规则旨在通过禁止创建与作用域内变量同名的标签这一不良实践，来使代码更清晰。

### 示例

此规则的**错误**代码示例：

```js
var x = foo;
function bar() {
  x: for (;;) {
    break x;
  }
}
```

此规则的**正确**代码示例：

```js
// 与标签同名的变量不在作用域内。

function foo() {
  var q = t;
}

function bar() {
  q: for (;;) {
    break q;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.6.0 中添加。

## 参考

<RuleReferences />
