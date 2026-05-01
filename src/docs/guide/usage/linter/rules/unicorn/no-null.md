---
title: "unicorn/no-null"
category: "Style"
version: "0.0.21"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_null.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `null` 字面量，以鼓励改用 `undefined`。

### 为什么这不好？

使用 `undefined` 而不是 `null` 有一些原因。

- 根据经验，大多数开发者对 `null` 和 `undefined` 的使用并不一致，且常常混用，很少有人知道何时该用哪个。
- 同时支持 `null` 和 `undefined` 会使输入验证变得更复杂。
- 使用 `null` 会让 TypeScript 类型更冗长：`type A = {foo?: string | null}` vs `type A = {foo?: string}`。

### 示例

此规则的**错误**代码示例：

```javascript
let foo = null;
```

此规则的**正确**代码示例：

```javascript
let foo;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkStrictEquality

type: `boolean`

default: `false`

当设置为 `true` 时，该规则还会检查与 `null` 的严格相等/不等比较（`===` 和 `!==`）。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.21 中添加。

## 参考资料

<RuleReferences />
