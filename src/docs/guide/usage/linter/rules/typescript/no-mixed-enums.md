---
title: "typescript/no-mixed-enums | Oxlint"
rule: "typescript/no-mixed-enums"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-mixed-enums/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_mixed_enums.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_mixed_enums/no_mixed_enums.go`;
</script>

<RuleHeader />

### 作用

此规则不允许枚举同时包含字符串成员和数字成员。

### 为什么这不好？

TypeScript 枚举可以包含字符串、数字或计算成员。在同一个枚举中混合字符串和数字成员，可能会由于 TypeScript 编译枚举的方式而导致混淆和意外的运行时行为。

### 示例

以下是此规则的**错误**代码示例：

```ts
enum Status {
  Open = 1,
  Closed = "closed",
}

enum Direction {
  Up = "up",
  Down = 2,
  Left = "left",
  Right = 4,
}
```

以下是此规则的**正确**代码示例：

```ts
// 全为数字
enum Status {
  Open = 1,
  Closed = 2,
}

// 全为字符串
enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

// 自动递增的数字
enum Color {
  Red,
  Green,
  Blue,
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
