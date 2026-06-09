---
title: "typescript/return-await | Oxlint"
rule: "typescript/return-await"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_safe_fix_or_suggestion"
upstream: "https://typescript-eslint.io/rules/return-await/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/return_await.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/return_await/return_await.go`;
</script>

<RuleHeader />

### 功能说明

此规则强制从 async 函数中返回已 await 的值时保持一致。

### 为什么这是坏的？

从 async 函数返回已 await 的值有不同的模式。
有时你希望在返回前先 await（以便在当前函数中处理错误），有时你希望直接返回 Promise（以获得更好的性能）。此规则有助于强制保持一致性。

### 示例

以下是此规则的**错误**代码示例（取决于配置）：

```ts
// 如果配置为要求 await：
async function fetchData() {
  return fetch("/api/data"); // 应为：return await fetch('/api/data');
}

async function processData() {
  return someAsyncOperation(); // 应为：return await someAsyncOperation();
}

// 如果配置为禁止不必要的 await：
async function fetchData() {
  return await fetch("/api/data"); // 应为：return fetch('/api/data');
}

async function processData() {
  return await someAsyncOperation(); // 应为：return someAsyncOperation();
}
```

以下是此规则的**正确**代码示例：

```ts
// 当需要 await 进行错误处理时：
async function fetchData() {
  try {
    return await fetch("/api/data");
  } catch (error) {
    console.error("获取失败：", error);
    throw error;
  }
}

// 当为了性能直接返回 Promise 时：
async function fetchData() {
  return fetch("/api/data");
}

// 返回前进行处理需要 await：
async function fetchAndProcess() {
  const response = await fetch("/api/data");
  return response.json();
}

// 多个异步操作：
async function multipleOperations() {
  const data1 = await fetchData1();
  const data2 = await fetchData2();
  return data1 + data2;
}
```

## 配置

此规则接受以下字符串值之一：

### `"in-try-catch"`

在 try/catch/finally 块内返回 Promise 时要求使用 `await`。
这可确保正确的错误处理和堆栈跟踪。

### `"always"`

在所有情况下返回 Promise 前都要求使用 `await`。
例如：需要使用 `return await Promise.resolve()`。

### `"error-handling-correctness-only"`

仅在 `await` 会影响错误处理正确性时才要求使用。
只标记省略 await 会改变错误处理行为的情况。

### `"never"`

在所有情况下都禁止在返回 Promise 前使用 `await`。
例如：需要使用 `return Promise.resolve()`（不含 await）。

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.12.0。

## 参考资料

<RuleReferences />
