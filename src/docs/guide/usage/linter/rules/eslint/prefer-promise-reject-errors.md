---
title: "eslint/prefer-promise-reject-errors | Oxlint"
rule: "eslint/prefer-promise-reject-errors"
category: "Style"
version: "0.15.7"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/prefer-promise-reject-errors"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_promise_reject_errors.rs`;
</script>

<RuleHeader />

### 它的作用

要求将 Error 对象用作 Promise 的拒绝原因。

### 为什么这不好？

对于 Promise 中用户定义的错误，通常认为最佳实践是仅将内置 `Error` 对象的实例传递给
`reject()` 函数。`Error` 对象会自动
存储堆栈跟踪，可用于通过确定错误来源来调试错误。如果 Promise 以非 `Error` 值被拒绝，
就可能很难
确定拒绝发生的位置。

### 示例

此规则的**错误**代码示例：

```js
Promise.reject("something bad happened");

Promise.reject(5);

Promise.reject();

new Promise(function (resolve, reject) {
  reject("something bad happened");
});

new Promise(function (resolve, reject) {
  reject();
});
```

此规则的**正确**代码示例：

```js
Promise.reject(new Error("something bad happened"));

Promise.reject(new TypeError("something bad happened"));

new Promise(function (resolve, reject) {
  reject(new Error("something bad happened"));
});

var foo = getUnknownValue();
Promise.reject(foo);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowEmptyReject

type: `boolean`

default: `false`

是否允许不带参数调用 `Promise.reject()`。

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.15.7。

## 参考资料

<RuleReferences />
