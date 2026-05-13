---
title: "eslint/no-unsafe-negation | Oxlint"
rule: "eslint/no-unsafe-negation"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unsafe_negation.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对关系运算符的左操作数取反，以防止由于误解运算符优先级或意外使用取反而导致的逻辑错误。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制执行此检查。

### 为什么这很糟糕？

对关系运算符的左操作数取反，可能会由于运算符优先级而导致意外行为，从而引发逻辑错误。例如，`!a in b` 可能会被解释为 `(!a) in b`，而不是 `!(a in b)`，这并不是预期的逻辑。

### 示例

以下是此规则的**错误**代码示例：

<!-- prettier-ignore-start -->
```javascript
if (!key in object) {}

if (!obj instanceof Ctor) {}
```

以下是此规则的**正确**代码示例：
```javascript
if (!(key in object)) {}

if (!(obj instanceof Ctor)) {}
```
<!-- prettier-ignore-end -->

## 配置

此规则接受一个包含以下属性的配置对象：

### enforceForOrderingRelations

type: `boolean`

default: `false`

`enforceForOrderingRelations` 选项决定是否允许在排序关系运算符（<、>、<=、>=）左侧使用取反。

其目的是避免出现诸如 `!a < b`（它等价于 `(a ? 0 : 1) < b`）这样的表达式，而真正想要的是 `!(a < b)`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中添加。

## 参考资料

<RuleReferences />
