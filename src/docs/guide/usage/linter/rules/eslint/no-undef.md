---
title: "eslint/no-undef | Oxlint"
rule: "eslint/no-undef"
category: "Nursery"
version: "0.0.8"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_undef.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用未声明的变量。

如果是 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器
会强制执行此检查。

### 为什么这不好？

这很可能是由于变量名或参数名拼写错误而导致的潜在 ReferenceError。

### 示例

此规则的**错误**代码示例：

```javascript
var foo = someFunction();
var bar = a + 1;
```

## 配置

此规则接受一个具有以下属性的配置对象：

### typeof

type: `boolean`

default: `false`

当设置为 `true` 时，在 `typeof` 表达式中使用未定义变量会发出警告。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
