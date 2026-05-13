---
title: "promise/no-return-in-finally | Oxlint"
rule: "promise/no-return-in-finally"
category: "Nursery"
version: "0.7.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_return_in_finally.rs`;
</script>

<RuleHeader />

### 作用

禁止在 promise 的 `finally()` 回调中使用 return 语句。

### 为什么这很糟糕？

由于 finally() 中传入的回调返回值不会被任何地方消费，因此应禁止在该回调中使用 return 语句。

### 示例

以下是此规则的**错误**代码示例：

```javascript
myPromise.finally(function (val) {
  return val;
});
```

以下是此规则的**正确**代码示例：

```javascript
Promise.resolve(1).finally(() => {
  console.log(2);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.7.1 中新增。

## 参考资料

<RuleReferences />
