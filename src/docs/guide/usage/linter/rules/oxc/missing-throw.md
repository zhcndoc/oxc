---
title: "oxc/missing-throw"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/missing_throw.rs`;
</script>

<RuleHeader />

### 作用

检查 `throw` 关键字是否缺失在 `new` 表达式前面。

### 为什么这不好？

在 `new` 表达式前面需要 `throw` 关键字才能抛出错误。省略它通常是一个错误。

### 示例

此规则的**错误**代码示例：

```javascript
function foo() {
  throw Error();
}
const foo = () => {
  new Error();
};
```

此规则的**正确**代码示例：

```javascript
function foo() {
  throw new Error();
}
const foo = () => {
  throw new Error();
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考

<RuleReferences />
