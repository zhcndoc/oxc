---
title: "jsdoc/require-property"
category: "正确性"
version: "0.2.18"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_property.rs`;
</script>

<RuleHeader />

### 作用

当 `@typedef` 和 `@namespace` 标记的类型为普通 `object`、`Object` 或 `PlainObject` 时，
要求它们具有 `@property` 标记。

注意：此规则可通过 [jsdoc settings](https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#settings) 选项进行配置。

### 为什么这不好？

对象类型应该定义属性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/**
 * @typedef {Object} SomeTypedef
 */

/**
 * @namespace {Object} SomeNamespace
 */
```

以下是此规则的**正确**代码示例：

```javascript
/**
 * @typedef {Object} SomeTypedef
 * @property {SomeType} propName 属性描述
 */

/**
 * @typedef {object} Foo
 * @property someProp
 */
```

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v0.2.18 起加入。

## 参考资料

<RuleReferences />
