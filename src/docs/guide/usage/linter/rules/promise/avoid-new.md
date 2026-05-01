---
title: "promise/avoid-new"
category: "Style"
version: "0.6.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/avoid_new.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `new Promise()` 创建 promise。

### 为什么这不好？

许多使用 `new Promise()` 的场景都可以重构为使用
`async` 函数。现代 JavaScript 中，`async` 被认为更符合惯用写法。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function foo() {
  return new Promise((resolve, reject) => {
    /* ... */
  });
}
```

以下是此规则的**正确**代码示例：

```javascript
async function foo() {
  // ...
}
const bar = await Promise.all([baz(), bang()]);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.6.1 中添加。

## 参考资料

<RuleReferences />
