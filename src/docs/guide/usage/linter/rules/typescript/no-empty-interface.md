---
title: "typescript/no-empty-interface"
category: "Style"
version: "0.0.6"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_empty_interface.rs`;
</script>

<RuleHeader />

### 它的作用

禁止声明空接口。

### 为什么这不好？

TypeScript 中的空接口几乎没有任何作用：任何非空值都可以赋值给 {}。
使用空接口通常意味着程序员出错，例如误解了 {} 的概念，或者忘记填充字段。
该规则旨在确保代码中只声明有意义的接口。

### 示例

以下是此规则的**错误**代码示例：

```ts
interface Foo {}
interface Bar extends Foo {}
```

以下是此规则的**正确**代码示例：

```ts
interface Foo {
  member: string;
}
interface Bar extends Foo {
  member: string;
}
```

## 配置

该规则接受一个包含以下属性的配置对象：

### allowSingleExtends

type: `boolean`

default: `false`

当设为 `true` 时，允许扩展单个接口的空接口。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.6 中添加。

## 参考资料

<RuleReferences />
