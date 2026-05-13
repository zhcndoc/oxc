---
title: "eslint/no-var | Oxlint"
rule: "eslint/no-var"
category: "Restriction"
version: "0.1.1"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_var.rs`;
</script>

<RuleHeader />

### 它的作用

ECMAScript 2015 允许程序员使用 `let` 和 `const` 关键字创建具有块作用域的变量，
而不是函数作用域。块作用域在许多其他编程语言中都很常见，并且有助于
程序员避免错误。

### 为什么这不好？

在 ES2015 环境中使用 `var` 会触发此错误

### 示例

以下是此规则的**错误**代码示例：

```javascript
var x = "y";
var CONFIG = {};
```

以下是此规则的**正确**代码示例：

```javascript
let x = "y";
const CONFIG = {};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.1.1 中添加。

## 参考资料

<RuleReferences />
