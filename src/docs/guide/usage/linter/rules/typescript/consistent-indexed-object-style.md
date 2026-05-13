---
title: "typescript/consistent-indexed-object-style | Oxlint"
rule: "typescript/consistent-indexed-object-style"
category: "Style"
version: "0.4.2"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_indexed_object_style.rs`;
</script>

<RuleHeader />

### 它的作用

在 `Record` 类型和索引签名类型之间进行选择时要求保持一致。

这两种类型是等价的，该规则会强制在两种风格中保持一致，二者择一：

```ts
type Foo = Record<string, unknown>;

type Foo = {
  [key: string]: unknown;
};
```

### 为什么这不好？

索引对象类型风格不一致会影响项目的可读性。

### 示例

对于此规则，使用
`consistent-indexed-object-style: ["error", "record"]`（默认值）时，**错误** 的代码示例如下：

```ts
interface Foo {
  [key: string]: unknown;
}
type Foo = {
  [key: string]: unknown;
};
```

对于此规则，使用
`consistent-indexed-object-style: ["error", "record"]`（默认值）时，**正确** 的代码示例如下：

```ts
type Foo = Record<string, unknown>;
```

对于此规则，使用
`consistent-indexed-object-style: ["error", "index-signature"]` 时，**错误** 的代码示例如下：

```ts
type Foo = Record<string, unknown>;
```

对于此规则，使用
`consistent-indexed-object-style: ["error", "index-signature"]` 时，**正确** 的代码示例如下：

```ts
interface Foo {
  [key: string]: unknown;
}
type Foo = {
  [key: string]: unknown;
};
```

## 配置

该规则接受以下字符串值之一：

### `"record"`

设置为 `record` 时，会强制对索引对象类型使用 `Record`，例如 `Record<string, unknown>`。

### `"index-signature"`

设置为 `index-signature` 时，会强制使用索引签名类型，例如 `{ [key: string]: unknown }`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中新增。

## 参考资料

<RuleReferences />
