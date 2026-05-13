---
title: "typescript/array-type | Oxlint"
rule: "typescript/array-type"
category: "Style"
version: "0.2.8"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/array_type.rs`;
</script>

<RuleHeader />

### 它的作用

要求始终一致地使用 `T[]` 或 `Array<T>` 来表示数组。

### 为什么这不好？

直接使用 `Array` 类型并不符合惯用写法。应改为使用数组类型 `T[]` 或 `Array<T>`。

### 示例

以下是此规则的**错误**代码示例（使用默认配置）：

```typescript
const arr: Array<number> = new Array<number>();
const readonlyArr: ReadonlyArray<number> = [1, 2, 3];
```

以下是此规则的**正确**代码示例（使用默认配置）：

```typescript
const arr: number[] = new Array<number>();
const readonlyArr: readonly number[] = [1, 2, 3];
```

## 配置

此规则接受一个包含以下属性的配置对象：

### default

type: `"array" | "array-simple" | "generic"`

default: `"array"`

可变情况所期望使用的数组类型。

#### `"array"`

强制所有数组类型都使用 `T[]`。

此选项的**错误**代码示例：

```ts
const arr: Array<number> = new Array<number>();
```

此选项的**正确**代码示例：

```ts
const arr: number[] = new Array<number>();
```

#### `"array-simple"`

简单类型强制使用 `T[]`，复杂类型强制使用 `Array<T>`。

此选项的**错误**代码示例：

```ts
const a: (string | number)[] = ["a", "b"];
const b: { prop: string }[] = [{ prop: "a" }];
const c: Array<MyType> = ["a", "b"];
const d: Array<string> = ["a", "b"];
```

此选项的**正确**代码示例：

```ts
const a: Array<string | number> = ["a", "b"];
const b: Array<{ prop: string }> = [{ prop: "a" }];
const c: string[] = ["a", "b"];
const d: MyType[] = ["a", "b"];
```

#### `"generic"`

强制所有数组类型都使用 `Array<T>`。

此选项的**错误**代码示例：

```ts
const arr: number[] = new Array<number>();
```

此选项的**正确**代码示例：

```ts
const arr: Array<number> = new Array<number>();
```

### readonly

type: `"array" | "array-simple" | "generic"`

default: `null`

只读情况所期望使用的数组类型。如果省略，则使用 `default` 的值。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.8 中添加。

## 参考资料

<RuleReferences />
