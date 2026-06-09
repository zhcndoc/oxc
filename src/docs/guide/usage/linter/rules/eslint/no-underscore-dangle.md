---
title: "eslint/no-underscore-dangle | Oxlint"
rule: "eslint/no-underscore-dangle"
category: "可疑"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-underscore-dangle"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_underscore_dangle.rs`;
</script>

<RuleHeader />

### 它的作用

禁止标识符中出现悬挂下划线。

### 为什么这不好？

在 JavaScript 中，长期以来一直使用 `_` 作为私有成员的前缀或后缀。
不过，建议使用 ES2022 中引入的正式私有类特性。
更多信息请参见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements>。

### 示例

此规则的**错误**代码示例：

```js
let foo_;
const __proto__ = {};
foo._bar();
```

此规则的**正确**代码示例：

```js
const _ = require("underscore");
const obj = _.contains(items, item);
obj.__proto__ = {};
const file = __filename;
function foo(_bar) {}
const bar = { onClick(_bar) {} };
const baz = (_bar) => {};
```

## 配置

### allow

类型: `string[]`

默认值: `[]`

允许带有悬挂下划线的变量名数组。

### allowAfterSuper

类型: `boolean`

默认值: `false`

是否允许 `super` 对象的成员中出现悬挂下划线。

### allowAfterThis

类型: `boolean`

默认值: `false`

是否允许 `this` 对象的成员中出现悬挂下划线。

### allowAfterThisConstructor

类型: `boolean`

默认值: `false`

是否允许 `this.constructor` 对象的成员中出现悬挂下划线。

### allowFunctionParams

类型: `boolean`

默认值: `true`

是否允许函数参数名中出现悬挂下划线。

### allowInArrayDestructuring

类型: `boolean`

默认值: `true`

是否允许通过数组解构赋值的变量名中出现悬挂下划线。

### allowInObjectDestructuring

类型: `boolean`

默认值: `true`

是否允许通过对象解构赋值的变量名中出现悬挂下划线。

### allowInUsingDeclarations

类型: `boolean`

默认值: `false`

是否允许在 `using` 和 `await using` 声明中出现悬挂下划线。

### enforceInClassFields

类型: `boolean`

默认值: `false`

是否强制类字段名中出现悬挂下划线。

### enforceInMethodNames

类型: `boolean`

默认值: `false`

是否强制方法名中出现悬挂下划线。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.62.0 中添加。

## 参考资料

<RuleReferences />
