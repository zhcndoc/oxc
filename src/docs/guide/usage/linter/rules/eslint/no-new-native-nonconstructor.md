---
title: "eslint/no-new-native-nonconstructor | Oxlint"
rule: "eslint/no-new-native-nonconstructor"
category: "正确性"
version: "0.3.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_new_native_nonconstructor.rs`;
</script>

<RuleHeader />

### 作用

禁止对全局的非构造函数（`Symbol`、`BigInt`）使用 `new` 运算符。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制执行此检查。

### 为什么这不好？

`new Symbol` 和 `new BigInt` 都会抛出类型错误，因为它们是函数而不是类。很容易因为大写字母而误以为它们是类，从而犯下这个错误。

### 示例

以下是此规则的**错误**代码示例：

```js
// 抛出 TypeError
let foo = new Symbol("foo");

// 抛出 TypeError
let result = new BigInt(9007199254740991);
```

以下是此规则的**正确**代码示例：

```js
let foo = Symbol("foo");

let result = BigInt(9007199254740991);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.3.3。

## 参考资料

<RuleReferences />
