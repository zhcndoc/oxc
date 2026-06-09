---
title: "typescript/consistent-return | Oxlint"
rule: "typescript/consistent-return"
category: "Suspicious"
version: "0.0.8"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/consistent-return/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_return.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/consistent_return/consistent_return.go`;
</script>

<RuleHeader />

### 它的作用

强制函数中的返回行为保持一致。

### 为什么这不好？

将返回值和不返回值的代码路径混在一起，会使控制流更难推理，并且经常意味着存在 bug。

::: warning
如果可能，优先使用 TypeScript 的 `noImplicitReturns` 编译器选项，而不是此规则。
`noImplicitReturns` 使用 TypeScript 的类型信息和控制流分析，
因此它可以检测到比此规则更多的隐式返回路径。
:::

### 示例

以下是此规则的**错误**代码示例：

```ts
function maybe(flag: boolean): number {
  if (flag) {
    return 1;
  }
  return;
}
```

以下是此规则的**正确**代码示例：

```ts
function maybe(flag: boolean): number {
  if (flag) {
    return 1;
  }
  return 0;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### `treatUndefinedAsUnspecified`

type: `boolean`

default: `false`

将显式的 `return undefined` 视为与未指定返回等价。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.8 中添加。

## 参考资料

<RuleReferences />
