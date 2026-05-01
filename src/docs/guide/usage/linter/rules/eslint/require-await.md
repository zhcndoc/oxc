---
title: "eslint/require-await"
category: "迂腐"
version: "0.4.2"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/require_await.rs`;
</script>

<RuleHeader />

### 它的作用

禁止没有 `await` 表达式的 async 函数。

::: warning 注意
此规则的准确性不如具备类型感知的
`typescript/require-await` 规则。如果使用类型感知
规则，请始终优先使用该规则而不是本规则。
:::

### 为什么这不好？

JavaScript 中的异步函数在两个重要方面与其他函数的行为不同：

1. 返回值始终是 `Promise`。
2. 你可以在其中使用 `await` 操作符。

使用异步函数的主要原因通常是使用
await 操作符，例如：

```js
async function fetchData(processDataItem) {
  const response = await fetch(DATA_URL);
  const data = await response.json();

  return data.map(processDataItem);
}
```

不使用 `await` 的异步函数可能并不需要是
异步函数，且可能是重构时无意造成的结果。

注意：此规则会忽略 async 生成器函数。这是因为
生成器产生值而不是返回值，而 async 生成器可能会
生成另一个 async 生成器的所有值，却从未真正需要
使用 `await`。

### 示例

以下是此规则的**错误**代码示例：

```js
async function foo() {
  doSomething();
}
```

以下是此规则的**正确**代码示例：

```js
async function foo() {
  await doSomething();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中添加。

## 参考资料

<RuleReferences />
