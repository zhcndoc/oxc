---
title: "promise/always-return | Oxlint"
rule: "promise/always-return"
category: "Suspicious"
version: "1.13.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/always_return.rs`;
</script>

<RuleHeader />

### 它的作用

要求在每个 `then()` 中都返回，以创建可读且可复用的 Promise 链。
我们也允许在 `then()` 中抛出错误，这本质上与返回 `Promise.reject()` 相同。

### 为什么这不好？

Promise 链断裂。
在第一个 `then()` 回调中，调用了一个函数，但没有返回。
这会导致链中的下一个 `then()` 立即执行，而不会等待被调用的函数完成。

### 示例

此规则的**错误**代码示例：

```javascript
myPromise.then(function (val) {});
myPromise.then(() => {
  doSomething();
});
myPromise.then((b) => {
  if (b) {
    return "yes";
  } else {
    forgotToReturn();
  }
});
```

此规则的**正确**代码示例：

```javascript
myPromise.then((val) => val * 2);
myPromise.then(function (val) {
  return val * 2;
});
myPromise.then(doSomething); // 可以是任意一种
myPromise.then((b) => {
  if (b) {
    return "yes";
  } else {
    return "no";
  }
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreAssignmentVariable

type: `string[]`

default: `["globalThis"]`

你可以为此规则传入 `{ ignoreAssignmentVariable: [] }` 作为选项，
并提供一个变量名列表，这样在 promise 链的最后一个 `then()` 回调中，
如果它对全局变量进行赋值，就不会报警。默认值是
`["globalThis"]`。

```javascript
/* promise/always-return: ["error", { ignoreAssignmentVariable: ["globalThis"] }] */

// 正确
promise.then((x) => {
  globalThis = x;
});

promise.then((x) => {
  globalThis.x = x;
});

// 正确
promise.then((x) => {
  globalThis.x.y = x;
});

// 错误
promise.then((x) => {
  anyOtherVariable = x;
});

// 错误
promise.then((x) => {
  anyOtherVariable.x = x;
});

// 错误
promise.then((x) => {
  x();
});
```

### ignoreLastCallback

type: `boolean`

default: `false`

你可以为此规则传入 `{ ignoreLastCallback: true }` 作为选项，
这样在 promise 链的最后一个 `then()` 回调中，如果没有 `return`，就不会报警。默认值是 `false`。

```javascript
// 正确
promise.then((x) => {
  console.log(x);
});
// 正确
void promise.then((x) => {
  console.log(x);
});
// 正确
await promise.then((x) => {
  console.log(x);
});

promise
  // 错误
  .then((x) => {
    console.log(x);
  })
  // 正确
  .then((x) => {
    console.log(x);
  });

// 错误
const v = promise.then((x) => {
  console.log(x);
});
// 错误
const v = await promise.then((x) => {
  console.log(x);
});
function foo() {
  // 错误
  return promise.then((x) => {
    console.log(x);
  });
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.13.0。

## 参考资料

<RuleReferences />
