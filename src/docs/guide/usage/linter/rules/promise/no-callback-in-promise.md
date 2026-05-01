---
title: "promise/no-callback-in-promise"
category: "正确性"
version: "0.10.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_callback_in_promise.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `Promise.prototype.then()`
或 `Promise.prototype.catch()` 中调用回调函数（`cb()`）。

### 为什么这不好？

直接在 `then()` 或 `catch()` 方法中调用回调，可能会导致
意外行为，例如回调被多次调用。此外，
以这种方式混用回调和 Promise 范式会使代码变得混乱，
且更难维护。

### 示例

以下是此规则的**错误**代码示例：

```js
function callback(err, data) {
  console.log("Callback got called with:", err, data);
  throw new Error("My error");
}

Promise.resolve()
  .then(() => callback(null, "data"))
  .catch((err) => callback(err.message, null));
```

以下是此规则的**正确**代码示例：

```js
Promise.resolve()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

## 配置

此规则接受一个包含以下属性的配置对象：

### callbacks

type: `string[]`

default: `["callback", "cb", "done", "next"]`

要在 Promise `then` 和 `catch` 方法中检查的回调函数名称列表。

### exceptions

type: `string[]`

default: `[]`

允许在 Promise `then` 和 `catch` 方法中使用的回调函数名称列表。

### timeoutsErr

type: `boolean`

default: `false`

布尔值，表示诸如 `setTimeout` 之类的超时函数中的回调是否会报错。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.10.0 中加入。

## 参考资料

<RuleReferences />
