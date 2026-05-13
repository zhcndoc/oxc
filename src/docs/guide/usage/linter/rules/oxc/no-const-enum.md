---
title: "oxc/no-const-enum | Oxlint"
rule: "oxc/no-const-enum"
category: "Restriction"
version: "0.4.2"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_const_enum.rs`;
</script>

<RuleHeader />

### 作用

禁止 TypeScript `const enum`

### 为什么这很糟糕？

const enum 是应该在使用位置内联的枚举。
打包工具不支持 const enum，并且与 isolatedModules 模式不兼容。
使用它们可能会导致导入不存在的值（因为 const enum 会被擦除）。

### 示例

以下是此规则的**错误**代码示例：

```ts
const enum Color {
  Red,
  Green,
  Blue,
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.2 中添加。

## 参考资料

<RuleReferences />
