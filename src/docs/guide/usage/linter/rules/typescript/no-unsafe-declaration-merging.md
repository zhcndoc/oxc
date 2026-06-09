---
title: "typescript/no-unsafe-declaration-merging | Oxlint"
rule: "typescript/no-unsafe-declaration-merging"
category: "Correctness"
version: "0.0.11"
default: true
type_aware: false
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-declaration-merging/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_declaration_merging.rs`;
</script>

<RuleHeader />

### 它的作用

禁止不安全的声明合并。

### 为什么这不好？

类和接口之间的声明合并是不安全的。
TypeScript 编译器不会检查属性是否已初始化，这可能导致 TypeScript 无法检测到会引发运行时错误的代码。

### 示例

以下是此规则的**错误**代码示例：

```ts
interface Foo {}
class Foo {}
```

以下是此规则的**正确**代码示例：

```ts
interface Foo {}
class Bar {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.11 中添加。

## 参考资料

<RuleReferences />
