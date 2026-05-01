---
title: "promise/prefer-await-to-then"
category: "Style"
version: "0.7.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/prefer_await_to_then.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `await` 而不是 `then()`/`catch()`/`finally()` 来读取 Promise 值。

### 为什么这不好？

Async/await 语法通常被认为更易读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function foo() {
  hey.then((x) => {});
}
```

以下是此规则的**正确**代码示例：

```javascript
async function hi() {
  await thing();
}
```

### 严格模式示例

使用 `{ strict: true }` 的**错误**代码示例：

```javascript
async function hi() {
  await thing().then((x) => {});
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### strict

type: `boolean`

default: `false`

如果为 true，即使在 `await` 或 `yield` 表达式之后，也会强制执行此规则。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.7.1 中添加。

## 参考资料

<RuleReferences />
