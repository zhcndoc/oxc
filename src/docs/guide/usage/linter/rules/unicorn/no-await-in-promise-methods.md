---
title: "unicorn/no-await-in-promise-methods | Oxlint"
rule: "unicorn/no-await-in-promise-methods"
category: "正确性"
version: "0.2.18"
default: true
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-in-promise-methods.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_await_in_promise_methods.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `Promise` 方法参数中使用 `await`。

### 为什么这不好？

在传递给 `Promise.all()`、
`Promise.allSettled()`、`Promise.any()` 或 `Promise.race()` 的参数上使用 `await`
很可能是个错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function foo() {
  Promise.all([await promise, anotherPromise]);
  Promise.allSettled([await promise, anotherPromise]);
  Promise.any([await promise, anotherPromise]);
  Promise.race([await promise, anotherPromise]);
}
```

以下是此规则的**正确**代码示例：

```javascript
async function foo() {
  Promise.all([promise, anotherPromise]);
  Promise.allSettled([promise, anotherPromise]);
  Promise.any([promise, anotherPromise]);
  Promise.race([promise, anotherPromise]);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.2.18 中添加。

## 参考资料

<RuleReferences />
