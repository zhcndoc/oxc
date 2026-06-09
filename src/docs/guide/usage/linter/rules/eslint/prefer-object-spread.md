---
title: "eslint/prefer-object-spread | Oxlint"
rule: "eslint/prefer-object-spread"
category: "Style"
version: "0.15.9"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/prefer-object-spread"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_object_spread.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `Object.assign` 中使用对象字面量作为第一个参数，而应改用对象展开语法。

### 为什么这不好？

当以对象字面量作为第一个参数调用 `Object.assign` 时，此规则要求改用对象展开语法。此规则也会对仅使用一个参数且该参数为对象字面量的 `Object.assign` 调用发出警告，在这种情况下，`Object.assign` 调用是不必要的。

### 示例

以下是此规则的**错误**代码示例：

```js
Object.assign({}, foo);

Object.assign({}, { foo: "bar" });

Object.assign({ foo: "bar" }, baz);

Object.assign({}, baz, { foo: "bar" });

Object.assign({}, { ...baz });

// 使用单个对象字面量参数的 Object.assign
Object.assign({});

Object.assign({ foo: bar });
```

以下是此规则的**正确**代码示例：

```js
({ ...foo });

({ ...baz, foo: "bar" });

// 任何第一个参数不是对象字面量的 Object.assign 调用
Object.assign(foo, { bar: baz });

Object.assign(foo, bar);

Object.assign(foo, { bar, baz });

Object.assign(foo, { ...baz });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.9 中添加。

## 参考资料

<RuleReferences />
