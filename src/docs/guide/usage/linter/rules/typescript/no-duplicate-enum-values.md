---
title: "typescript/no-duplicate-enum-values | Oxlint"
rule: "typescript/no-duplicate-enum-values"
category: "Correctness"
version: "0.0.8"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_duplicate_enum_values.rs`;
</script>

<RuleHeader />

### 作用

禁止枚举成员值重复。

### 为什么这不好？

尽管 TypeScript 支持重复的枚举成员值，但人们通常期望同一个枚举中的成员具有唯一值。重复的值可能会导致难以追踪的错误。

### 示例

此规则不允许定义一个有多个成员初始化为相同值的枚举。没有初始化器的成员不会被检查。

**错误** 示例代码：

```ts
enum E {
  A = 0,
  B = 0,
}
```

```ts
enum E {
  A = "A",
  B = "A",
}
```

**正确** 示例代码：

```ts
enum E {
  A = 0,
  B = 1,
}
```

```ts
enum E {
  A = "A",
  B = "B",
}
```

```ts
enum E {
  A,
  B,
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.8。

## 参考资料

<RuleReferences />
