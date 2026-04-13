---
title: "eslint/block-scoped-var"
category: "可疑"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/block_scoped_var.rs`;
</script>

<RuleHeader />

### 作用

强制要求变量在同一块级作用域内既被**声明**又被**使用**。
此规则防止意外地在预期块之外使用变量，模仿 JavaScript 中 C 风格的块级作用域。

### 为什么不好？

JavaScript 的 `var` 声明会被提升到其包围函数的顶部，这可能导致在块中声明的变量（例如在 `if` 或 `for` 内部）在块外部也可访问。
这可能导致难以发现的 bug。
通过强制块级作用域，此规则有助于避免提升问题，并与其他语言处理块变量的方式更加一致。

### 示例

此规则**错误**代码示例：

```js
/* block-scoped-var: "error" */

function doIf() {
  if (true) {
    var build = true;
  }
  console.log(build);
}

function doLoop() {
  for (var i = 0; i < 10; i++) {
    // 做一些事情
  }
  console.log(i); // i 在此处可访问
}

function doSomething() {
  if (true) {
    var foo = 1;
  }
  if (false) {
    foo = 2;
  }
}

function doTry() {
  try {
    var foo = 1;
  } catch (e) {
    console.log(foo);
  }
}
```

此规则**正确**代码示例：

```js
/* block-scoped-var: "error" */

function doIf() {
  var build;
  if (true) {
    build = true;
  }
  console.log(build);
}

function doLoop() {
  var i;
  for (i = 0; i < 10; i++) {
    // 做一些事情
  }
  console.log(i);
}

function doSomething() {
  var foo;
  if (true) {
    foo = 1;
  }
  if (false) {
    foo = 2;
  }
}

function doTry() {
  var foo;
  try {
    foo = 1;
  } catch (e) {
    console.log(foo);
  }
}
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
