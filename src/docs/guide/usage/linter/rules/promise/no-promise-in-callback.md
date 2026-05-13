---
title: "promise/no-promise-in-callback | Oxlint"
rule: "promise/no-promise-in-callback"
category: "Suspicious"
version: "0.13.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_promise_in_callback.rs`;
</script>

<RuleHeader />

### 作用

禁止在错误优先回调函数中使用 Promise。

### 为什么这很糟糕？

将 Promise 和回调混用会导致代码不清晰且不一致。
Promise 和回调是处理异步代码的两种不同模式。
将它们混用会使逻辑流程更难跟踪，并使错误处理更复杂，
因为回调依赖错误优先模式，而 Promise 使用 `catch`。

### 示例

以下是此规则的**错误**代码示例：

```js
doSomething((err, val) => {
  if (err) console.error(err);
  else doSomethingElse(val).then(console.log);
});
```

以下是此规则的**正确**代码示例：

```js
promisify(doSomething)().then(doSomethingElse).then(console.log).catch(console.error);
```

## 配置

### exemptDeclarations

type: `boolean`

default: `false`

是否免除函数声明。默认为 `false`。

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.13.1。

## 参考资料

<RuleReferences />
