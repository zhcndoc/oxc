---
title: "eslint/no-async-promise-executor"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_async_promise_executor.rs`;
</script>

<RuleHeader />

### 作用

禁止将异步函数用作 Promise 执行器。

### 为什么不好？

`new Promise` 构造函数接受一个执行器函数作为参数，
该函数具有 `resolve` 和 `reject` 参数，可用于控制
所创建 Promise 的状态。例如：

```javascript
const result = new Promise(function executor(resolve, reject) {
  readFile("foo.txt", function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
```

执行器函数也可以是 `async function`。然而，这通常是一个错误，原因如下：

- 如果异步执行器函数抛出错误，该错误将会丢失，并且不会导致
  新构造的 `Promise` 被拒绝。这可能会使调试和处理某些错误变得困难。
- 如果 `Promise` 执行器函数使用了 `await`，这通常表明
  实际上没有必要使用新的 `Promise` 构造函数，或者新的
  `Promise` 构造函数的作用域可以缩小。

### 示例

此规则 **不正确** 代码示例：

```javascript
const foo = new Promise(async (resolve, reject) => {
  readFile("foo.txt", function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});
```

此规则 **正确** 代码示例：

```javascript
const foo = new Promise((resolve, reject) => {
  readFile("foo.txt", function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
