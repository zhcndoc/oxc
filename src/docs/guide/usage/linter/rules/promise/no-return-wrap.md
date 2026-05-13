---
title: "promise/no-return-wrap | Oxlint"
rule: "promise/no-return-wrap"
category: "Style"
version: "0.15.14"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_return_wrap.rs`;
</script>

<RuleHeader />

### 说明

防止在 promises 中不必要地使用 `Promise.resolve`
或 `Promise.reject` 包装返回值。

此规则强制执行以下观点：

1. 当一个 promise 要被 resolve 时，与其返回 `Promise.resolve(value)`，不如
   直接返回原始值 `return value`。

2. 当一个 promise 要被 reject 时，与其返回 `Promise.reject(error)`，不如
   像 `throw error` 一样直接抛出原始错误值。

可以通过一个选项来关闭第 2 条的强制检查，详见下方配置部分。

### 这为什么不好？

在 `then` 和 `catch` 回调的 `return` 语句中，使用 `Promise.resolve` 和 `Promise.reject`
将原始值转换为 promise 是不必要的。使用这些操作来把原始值转换为 promise 并无必要，
因为在成功情况下直接返回原始值，在失败情况下抛出原始错误值，效果是相同的。
因此，有些人认为返回诸如 `Promise.resolve(1)` 或 `Promise.reject(err)` 这样的写法
只是语法噪音。

### 示例

此规则的**错误**代码示例：

```js
myPromise().then(() => Promise.resolve(4));
myPromise().then(function () {
  return Promise.resolve(4);
});

myPromise().then(() => Promise.reject("err"));
myPromise().then(function () {
  return Promise.reject("err");
});
```

```js
myPromise().catch(function () {
  return Promise.reject("err");
});
```

```js
myPromise().finally(function () {
  return Promise.reject("err");
});
```

```js
myPromise().finally(() => Promise.resolve(4));
```

此规则的**正确**代码示例：

```js
myPromise().then(() => 4);
myPromise().then(function () {
  return 4;
});

myPromise().then(() => throw "err");
myPromise().then(function () {
  throw "err";
});
```

```js
myPromise().catch(function () {
  throw "err";
});
```

```js
myPromise().finally(() => 4);
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowReject

type: `boolean`

default: `false`

`allowReject` 允许在 promise 处理器内部返回 `Promise.reject`。

当将 `allowReject` 设置为 `true` 时，以下是正确代码示例：

```js
myPromise().then(function () {
  return Promise.reject(0);
});
```

```js
myPromise()
  .then()
  .catch(() => Promise.reject("err"));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.14 中添加。

## 参考

<RuleReferences />
