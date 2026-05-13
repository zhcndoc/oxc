---
title: "eslint/no-redeclare | Oxlint"
rule: "eslint/no-redeclare"
category: "Pedantic"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_redeclare.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止在同一作用域内重复声明变量，确保每个变量只被声明一次。它有助于避免代码中的混淆和意外行为。

### 为什么这不好？

在同一作用域内重复声明变量可能会导致意外行为、覆盖现有值，并使代码更难理解和维护。

### 示例

此规则的**错误**代码示例：

```javascript
var a = 3;
var a = 10;
```

此规则的**正确**代码示例：

```javascript
var a = 3;
a = 10;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### builtinGlobals

type: `boolean`

default: `true`

设置为 `true` 时，会标记对内置全局变量的重复声明（例如，`let Object = 1;`）。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.13 中添加。

## 参考资料

<RuleReferences />
