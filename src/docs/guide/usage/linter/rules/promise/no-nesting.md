---
title: "promise/no-nesting | Oxlint"
rule: "promise/no-nesting"
category: "Style"
version: "0.15.13"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-nesting.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_nesting.rs`;
</script>

<RuleHeader />

### 它的作用

不允许嵌套的 `then()` 或 `catch()` 语句。

### 为什么这很糟糕？

嵌套 Promise 会使代码更难阅读和理解。

### 示例

此规则的**错误**代码示例：

```javascript
doThing().then(() => a.then());

doThing().then(function () {
  a.then();
});

doThing().then(() => {
  b.catch();
});

doThing().catch((val) => doSomething(val).catch(errors));
```

此规则的**正确**代码示例：

```javascript
doThing().then(() => 4);

doThing().then(function () {
  return 4;
});

doThing().catch(() => 4);
```

```javascript
doThing()
  .then(() => Promise.resolve(1))
  .then(() => Promise.resolve(2));
```

这个示例不构成规则违反，因为如果在这里取消嵌套，
表达式 `getC(a, b)` 中的 `a` 将变为未定义。

```javascript
doThing().then((a) => getB(a).then((b) => getC(a, b)));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.13 中添加。

## 参考

<RuleReferences />
