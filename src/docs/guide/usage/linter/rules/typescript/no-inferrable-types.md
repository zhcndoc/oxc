---
title: "typescript/no-inferrable-types | Oxlint"
rule: "typescript/no-inferrable-types"
category: "Style"
version: "0.14.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_inferrable_types.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对已初始化为数字、字符串或布尔值的变量或参数显式声明类型。

### 为什么这不好？

对初始化为字面量值的变量或参数显式标注类型是不必要的，因为 TypeScript 可以从值中推断出类型。

### 示例

此规则的**错误**代码示例：

```ts
const a: number = 5;
const b: string = "foo";
const c: boolean = true;
const fn = (a: number = 5, b: boolean = true, c: string = "foo") => {};
```

此规则的**正确**代码示例：

```ts
const a = 5;
const b = "foo";
const c = true;
const fn = (a = 5, b = true, c = "foo") => {};
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreParameters

type: `boolean`

default: `false`

设为 `true` 时，忽略函数参数上的类型注解。

### ignoreProperties

type: `boolean`

default: `false`

设为 `true` 时，忽略类属性上的类型注解。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.14.0 中添加。

## 参考

<RuleReferences />
