---
title: "typescript/no-unnecessary-type-constraint"
category: "Suspicious"
version: "0.0.6"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_type_constraint.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对泛型类型使用不必要的约束。

### 为什么这不好？

TypeScript 中的泛型类型参数（`<T>`）可以通过 `extends`
关键字来“约束”。当未提供 `extends` 时，类型参数默认的约束为 `unknown`。
因此，从 `any` 或 `unknown` 继承是多余的。

### 示例

以下是此规则的**错误**代码示例：

```typescript
interface FooAny<T extends any> {}
interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};
type BarUnknown<T extends unknown> = {};

const QuuxAny = <T extends any>() => {};

function QuuzAny<T extends any>() {}
```

```typescript
class BazAny<T extends any> {
  quxAny<U extends any>() {}
}
```

以下是此规则的**正确**代码示例：

```typescript
interface Foo<T> {}

type Bar<T> = {};

const Quux = <T>() => {};

function Quuz<T>() {}
```

```typescript
class Baz<T> {
  qux<U>() {}
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.6 中加入。

## 参考资料

<RuleReferences />
