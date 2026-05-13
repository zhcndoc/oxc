---
title: "eslint/prefer-object-has-own | Oxlint"
rule: "eslint/prefer-object-has-own"
category: "Style"
version: "0.11.0"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_object_has_own.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `Object.prototype.hasOwnProperty.call()`，并优先使用 `Object.hasOwn()`

### 为什么这不好？

编写如下代码非常常见：

```javascript
if (Object.prototype.hasOwnProperty.call(object, "foo")) {
  console.log("has property foo");
}
```

之所以这是一种常见做法，是因为 `Object.prototype` 上的方法有时可能不可用或被重新定义（参见 no-prototype-builtins 规则）。
`Object.hasOwn()` 于 ES2022 引入，是 `Object.prototype.hasOwnProperty.call()` 更简短的替代方案：

```javascript
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo");
}
```

### 示例

此规则的**错误**代码示例：

```js
Object.prototype.hasOwnProperty.call(obj, "a");
Object.hasOwnProperty.call(obj, "a");
({}).hasOwnProperty.call(obj, "a");
const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
```

此规则的**正确**代码示例：

```js
Object.hasOwn(obj, "a");
const hasProperty = Object.hasOwn(object, property);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.11.0 中添加。

## 参考资料

<RuleReferences />
