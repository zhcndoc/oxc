---
title: "typescript/await-thenable | Oxlint"
rule: "typescript/await-thenable"
category: "Correctness"
version: "1.12.0"
default: true
type_aware: true
fix: "fixable_suggestion"
upstream: "https://typescript-eslint.io/rules/await-thenable/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/await_thenable.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/await_thenable/await_thenable.go`;
</script>

<RuleHeader />

### 作用

此规则不允许对非 Thenable 的值使用 await。

### 为什么这很糟糕？

虽然在 JavaScript 中对非 Promise-like 的值使用 await 是合法的（它会立即解析），但对于不了解这一行为的读者来说，这种做法可能会令人困惑。它也可能是程序员错误的迹象，例如忘记添加括号来调用一个返回 Promise 的函数。

### 示例

以下是此规则的**错误**代码示例：

```
await 12;
await (() => {});

// 非 Promise 值
await Math.random;
await { then() {} };

// 这不是一个 Promise - 它是一个返回 Promise 的函数
declare const getPromise: () => Promise<string>;
await getPromise;
```

以下是此规则的**正确**代码示例：

```
await Promise.resolve('value');
await Promise.reject(new Error());

// 类 Promise 值
await {
  then(onfulfilled, onrejected) {
    onfulfilled('value');
  },
};

// 这是一个 Promise - 由调用函数产生
declare const getPromise: () => Promise<string>;
await getPromise();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中加入。

## 参考

<RuleReferences />
