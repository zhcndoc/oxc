---
title: "promise/catch-or-return | Oxlint"
rule: "promise/catch-or-return"
category: "Restriction"
version: "0.9.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/catch_or_return.rs`;
</script>

<RuleHeader />

### 作用

确保每次对 promise 调用 `then()` 时，都必须同时调用 `catch()`。
对于从函数中返回的 promise，则属于例外。

### 为什么这不好？

未捕获 promise 中的错误可能会导致难以调试的问题，或遗漏对错误条件的处理。
在最坏的情况下，未处理的 promise rejection 可能会导致应用崩溃。

### 示例

以下是此规则的**错误**代码示例：

```javascript
myPromise.then(doSomething);
myPromise.then(doSomething, catchErrors); // `catch()` 可能会更好一些
```

以下是此规则的**正确**代码示例：

```javascript
myPromise.then(doSomething).catch(errors);
function doSomethingElse() {
  return myPromise.then(doSomething);
}
const arrowFunc = () => myPromise.then(doSomething);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowFinally

type: `boolean`

default: `false`

是否允许将 `finally()` 作为终止方法。

### allowThen

type: `boolean`

default: `false`

是否允许使用带两个参数的 `then()` 作为终止方法。

### terminationMethod

type: `string[]`

default: `["catch"]`

允许的终止方法列表（例如：`catch`、`done`）。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.9.2 中添加。

## 参考

<RuleReferences />
