---
title: "typescript/unified-signatures | Oxlint"
rule: "typescript/unified-signatures"
category: "Style"
version: "1.48.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/unified_signatures.rs`;
</script>

<RuleHeader />

### 作用

不允许可以合并为一个的重载签名。

### 为什么这不好？

仅在单个类型不同，或仅在可选/剩余参数不同的重复重载签名，比一个统一的签名更难维护和阅读。

### 示例

以下是此规则的**错误**代码示例：

```ts
function f(a: number): void;
function f(a: string): void;
```

以下是此规则的**正确**代码示例：

```ts
function f(a: number | string): void;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreDifferentlyNamedParameters

type: `boolean`

default: `false`

在比较签名时，是否忽略参数名差异。如果为 `false`，那么即使参数类型相同，只要签名在相同位置上的参数名称不同，也不会被视为可统一。

### ignoreOverloadsWithDifferentJSDoc

type: `boolean`

default: `false`

在比较签名时，是否忽略 JSDoc 差异。如果为 `false`，那么即使签名本身完全相同，只要这些签名最接近的前导块注释不同，也不会被视为可统一。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.48.0 中添加。

## 参考资料

<RuleReferences />
