---
title: "typescript/no-unsafe-member-access | Oxlint"
rule: "typescript/no-unsafe-member-access"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-member-access/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_member_access.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_member_access/no_unsafe_member_access.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止对类型为 `any` 的值进行成员访问。

### 为什么这不好？

TypeScript 中的 `any` 类型会禁用类型检查。当你对一个类型为 `any` 的值访问成员（属性或方法）时，TypeScript 无法验证该成员是否存在或其类型是什么。这可能导致运行时错误。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const anyValue: any;

anyValue.foo; // 不安全的成员访问

anyValue.bar.baz; // 不安全的嵌套成员访问

anyValue["key"]; // 不安全的计算成员访问

const result = anyValue.method(); // 不安全的方法访问
```

以下是此规则的**正确**代码示例：

```ts
declare const obj: { foo: string; bar: { baz: number } };
declare const unknownValue: unknown;

obj.foo; // 安全

obj.bar.baz; // 安全

obj["foo"]; // 安全

// unknown 的类型守卫
if (typeof unknownValue === "object" && unknownValue !== null && "foo" in unknownValue) {
  console.log(unknownValue.foo); // 类型守卫后安全
}

// 如有需要，显式类型断言
(anyValue as { foo: string }).foo; // 明确不安全，但这是有意为之
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowOptionalChaining

type: `boolean`

default: `false`

是否允许在 `any` 值上使用 `?.` 可选链。
当为 `true` 时，不会对 `any` 值上的可选链进行标记。
默认值为 `false`。

## 使用方法

<RuleHowToUse />

## 版本

此规则添加于 v1.12.0。

## 参考资料

<RuleReferences />
