---
title: "jsdoc/require-returns"
category: "Pedantic"
version: "0.4.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_returns.rs`;
</script>

<RuleHeader />

### 它的作用

要求为返回语句添加文档说明。
如果存在多个 `@returns` 标签，也会进行报告。

### 为什么这不好？

该规则旨在防止在需要时遗漏 `@returns` 标签。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** Foo. */
function quux() {
  return foo;
}

/**
 * @returns Foo!
 * @returns Foo?
 */
function quux() {
  return foo;
}
```

以下是此规则的**正确**代码示例：

```javascript
/** @returns Foo. */
function quux() {
  return foo;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkConstructors

type: `boolean`

default: `false`

是否检查构造函数方法。

### checkGetters

type: `boolean`

default: `true`

是否检查 getter 方法。

### exemptedBy

type: `string[]`

default: `["inheritdoc"]`

使函数免于要求 `@returns` 的标签。

### forceRequireReturn

type: `boolean`

default: `false`

即使函数没有返回值，是否也要求 `@returns` 标签。

### forceReturnsWithAsync

type: `boolean`

default: `false`

是否对异步函数要求 `@returns` 标签。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.0 中添加。

## 参考

<RuleReferences />
