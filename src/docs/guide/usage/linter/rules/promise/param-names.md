---
title: "promise/param-names"
category: "Style"
version: "0.6.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/param_names.rs`;
</script>

<RuleHeader />

### 它的作用

强制 Promise 构造函数使用标准的参数名。

### 为什么这不好？

确保 new Promise() 使用参数名 resolve、reject 进行实例化，以避免与 reject、resolve 这类顺序混淆。Promise 构造函数使用揭示构造函数（RevealingConstructor）模式。使用与语言规范相同的参数名可以使代码更加统一，也更容易理解。

### 示例

以下是此规则下**错误**代码的示例：

```javascript
new Promise(function (reject, resolve) {
  /* ... */
}); // 顺序错误
new Promise(function (ok, fail) {
  /* ... */
}); // 非标准参数名
```

以下是此规则下**正确**代码的示例：

```javascript
new Promise(function (resolve, reject) {});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### rejectPattern

type: `string`

用于验证 `reject` 参数名的正则表达式模式。如果提供了该模式，则会使用它替代默认的 `^_?reject$` 检查。

### resolvePattern

type: `string`

用于验证 `resolve` 参数名的正则表达式模式。如果提供了该模式，则会使用它替代默认的 `^_?resolve$` 检查。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.6.1 中添加。

## 参考资料

<RuleReferences />
