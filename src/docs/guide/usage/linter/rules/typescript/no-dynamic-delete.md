---
title: "typescript/no-dynamic-delete | Oxlint"
rule: "typescript/no-dynamic-delete"
category: "Restriction"
version: "0.5.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_dynamic_delete.rs`;
</script>

<RuleHeader />

### 作用

禁止在计算出的键表达式上使用 delete 运算符。

### 为什么这很糟糕？

删除动态计算的键可能很危险，而且在某些情况下优化效果并不好。
在不是运行时常量的键上使用 delete 运算符，可能表明你使用了错误的数据结构。
如果你把对象当作键值集合使用，请考虑使用 Map 或 Set。

### 示例

此规则的**错误**代码示例：

```ts
const container: { [i: string]: 0 } = {};
delete container["aa" + "b"];
```

此规则的**正确**代码示例：

```ts
const container: { [i: string]: 0 } = {};
delete container.aab;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.5.2 中添加。

## 参考资料

<RuleReferences />
