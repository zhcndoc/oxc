---
title: "unicorn/no-single-promise-in-promise-methods | Oxlint"
rule: "unicorn/no-single-promise-in-promise-methods"
category: "Correctness"
version: "0.2.18"
default: true
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_single_promise_in_promise_methods.rs`;
</script>

<RuleHeader />

### 作用

禁止将单元素数组传递给 `Promise` 方法。

### 为什么这不好？

将单元素数组传递给 `Promise.all()`、`Promise.any()` 或
`Promise.race()` 很可能是一个错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function bad() {
  const foo = await Promise.all([promise]);
  const foo = await Promise.any([promise]);
  const foo = await Promise.race([promise]);
  const promise = Promise.all([nonPromise]);
}
```

以下是此规则的**正确**代码示例：

```javascript
async function good() {
  const foo = await promise;
  const promise = Promise.resolve(nonPromise);
  const foo = await Promise.all(promises);
  const foo = await Promise.any([promise, anotherPromise]);
  const [{ value: foo, reason: error }] = await Promise.allSettled([promise]);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.18 中添加。

## 参考资料

<RuleReferences />
