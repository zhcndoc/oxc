---
title: "typescript/no-generated-empty-object-type | Oxlint"
rule: "typescript/no-generated-empty-object-type"
category: "可疑"
version: "next"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-generated-empty-object-type/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_generated_empty_object_type.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_generated_empty_object_type/no_generated_empty_object_type.go`;
</script>

<RuleHeader />

### 作用

禁止解析为空对象类型 `{}` 的类型操作。
这包括泛型类型引用和交叉类型，但不包括其键尚未解析的映射类型。

### 为什么这是不好的做法？

空对象类型 `{}` 接受任何非 nullish 值，包括字符串和数字等原始值。因此，使用工具类型意外生成此类型可能会允许原本不应允许的值。

此规则检查生成的类型。使用 `typescript/no-empty-object-type` 可禁止显式写出的空对象类型。

### 示例

此规则的**错误**代码示例：

```ts
type Data = { name: string; value: number };
type Empty = Omit<Data, "name" | "value">;
type NoProperties = Pick<Data, never>;
type NonNullish = NonNullable<unknown>;
```

此规则的**正确**代码示例：

```ts
type Data = { name: string; value: number };
type WithValue = Omit<Data, "name">;
type WithOther = Omit<Data, "name" | "value"> & { other: string };

type Keys<T> = T extends infer U ? keyof U : never;
type Mapped<T extends object> = { [Key in Keys<T>]: Key };
type Referenced<T extends object> = Mapped<T>;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
