---
title: "eslint/preserve-caught-error | Oxlint"
rule: "eslint/preserve-caught-error"
category: "Suspicious"
version: "1.16.0"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/preserve_caught_error.rs`;
</script>

<RuleHeader />

### 作用

要求在 catch 块中重新抛出错误时，使用 'cause' 属性保留原始错误。

### 为什么这很糟糕？

在不保留原始错误的情况下重新抛出错误，会丢失重要的调试信息，并且使追踪问题根本原因更加困难。

### 示例

以下是此规则的**错误**代码示例：

```js
try {
  doSomething();
} catch (err) {
  throw new Error("Something failed");
}
```

以下是此规则的**正确**代码示例：

```js
try {
  doSomething();
} catch (err) {
  throw new Error("Something failed", { cause: err });
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### requireCatchParameter

type: `boolean`

default: `false`

设置为 `true` 时，要求 catch 子句始终带有参数。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.16.0 中添加。

## 参考资料

<RuleReferences />
