---
title: "typescript/no-extra-non-null-assertion"
category: "正确性"
version: "0.0.6"
default: true
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_extra_non_null_assertion.rs`;
</script>

<RuleHeader />

### 它的作用

禁止多余的非空断言。

### 为什么这不好？

TypeScript 中的 `!` 非空断言运算符用于断言某个值的类型
不包含 `null` 或 `undefined`。在同一个值上多次使用该运算符
不会产生任何作用。

### 示例

以下是此规则的**错误**代码示例：

```ts
const foo: { bar: number } | null = null;
const bar = foo!!!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!!!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar!?.n;
}
```

以下是此规则的**正确**代码示例：

```ts
const foo: { bar: number } | null = null;
const bar = foo!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar?.n;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.6 中添加。

## 参考资料

<RuleReferences />
