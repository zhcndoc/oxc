---
title: "typescript/no-misused-new"
category: "正确性"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_misused_new.rs`;
</script>

<RuleHeader />

### 作用

强制 `new` 和构造函数的有效定义。此规则可防止类定义名为 `new` 的方法，以及接口定义名为 `constructor` 的方法。

### 为什么这不好？

JavaScript 类可以定义一个构造函数方法，当类实例被新建时会运行该方法。

TypeScript 允许描述静态类对象的接口定义一个 `new()` 方法（不过在实际代码中很少使用）。对 JavaScript 类和/或 TypeScript 接口不熟悉的开发者，有时可能会混淆何时使用 constructor 或 new。

### 示例

以下是此规则的**错误**代码示例：

```typescript
declare class C {
  new(): C;
}
```

```typescript
interface I {
  new (): I;
  constructor(): void;
}
```

以下是此规则的**正确**代码示例：

```typescript
declare class C {
  constructor();
}
```

```typescript
interface I {
  new (): C;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.7 中添加。

## 参考资料

<RuleReferences />
