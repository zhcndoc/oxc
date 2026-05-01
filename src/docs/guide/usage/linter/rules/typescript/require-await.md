---
title: "typescript/require-await"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/require_await.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/require_await/require_await.go`;
</script>

<RuleHeader />

### 作用

此规则不允许没有 await 表达式的 async 函数。

### 为什么这不好？

不使用 await 的 async 函数通常是一个错误。它们会不必要地返回一个 Promise，而且通常可以转换为普通函数。这可以提升性能并使代码更清晰。

### 示例

此规则的**错误**代码示例：

```ts
// 没有 await 的 Async 函数
async function fetchData() {
  return fetch("/api/data");
}

// 没有 await 的 Async 箭头函数
const processData = async () => {
  return someData.map((x) => x * 2);
};

// 没有 await 的 Async 方法
class DataService {
  async getData() {
    return this.data;
  }
}

// 返回 Promise 但不 await 的 Async 函数
async function getPromise() {
  return Promise.resolve("value");
}
```

此规则的**正确**代码示例：

```ts
// 带有 await 的 Async 函数
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}

// 返回 Promise 的普通函数
function fetchDataSync() {
  return fetch("/api/data");
}

// 在条件分支中使用 await 的 Async 函数
async function conditionalAwait(condition: boolean) {
  if (condition) {
    return await someAsyncOperation();
  }
  return "default";
}

// 在循环中使用 await 的 Async 函数
async function processItems(items: string[]) {
  const results = [];
  for (const item of items) {
    results.push(await processItem(item));
  }
  return results;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考

<RuleReferences />
