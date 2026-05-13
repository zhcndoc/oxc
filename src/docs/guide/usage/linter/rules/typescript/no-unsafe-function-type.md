---
title: "typescript/no-unsafe-function-type | Oxlint"
rule: "typescript/no-unsafe-function-type"
category: "Pedantic"
version: "0.11.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_function_type.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用不安全的内置 Function 类型。

### 这为什么不好？

TypeScript 内置的 Function 类型允许以任意数量的参数调用，并返回 any 类型。Function 也允许类或普通对象，只要它们恰好拥有 Function 类的所有属性即可。通常更好的做法是使用函数类型语法来明确指定函数参数和返回类型。

### 示例

以下是此规则的 **错误** 代码示例：

```ts
let noParametersOrReturn: Function;
noParametersOrReturn = () => {};

let stringToNumber: Function;
stringToNumber = (text: string) => text.length;

let identity: Function;
identity = (value) => value;
```

以下是此规则的 **正确** 代码示例：

```ts
let noParametersOrReturn: () => void;
noParametersOrReturn = () => {};

let stringToNumber: (text: string) => number;
stringToNumber = (text) => text.length;

let identity: <T>(value: T) => T;
identity = (value) => value;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.11.1。

## 参考资料

<RuleReferences />
