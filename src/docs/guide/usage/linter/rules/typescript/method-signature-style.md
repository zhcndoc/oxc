---
title: "typescript/method-signature-style | Oxlint"
rule: "typescript/method-signature-style"
category: "Style"
version: "1.68.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://typescript-eslint.io/rules/method-signature-style/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/method_signature_style.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用特定的方法签名语法。

### 为什么这不好？

TypeScript 提供了两种定义对象/interface 函数属性的方式：

```ts
interface Example {
  // 方法简写语法
  func(arg: string): number;

  // 带函数类型的普通属性
  func: (arg: string) => number;
}
```

这两者非常相似；大多数情况下，使用哪一种并不重要。
不过，当启用 TypeScript 的 `strictFunctionTypes` 选项时，会有一个重要区别：方法的参数始终是双变的，而函数属性是逆变的。
这意味着，从方法语法切换到属性语法（或反过来）可能会导致 TypeScript 报告新的类型错误，或者停止报告已有的错误。

一个好的实践是使用 TypeScript 的 `strict` 选项（它包含 `strictFunctionTypes`），这样只会对函数属性启用正确的类型检查（方法签名仍使用旧行为）。

TypeScript FAQ：

> 同类型的方法和函数属性的行为不同。
> 在 `strictFunctionTypes` 下，方法在参数上始终是双变的，而函数属性在参数上是逆变的。

关于这一点的原因，请参见 [TypeScript 编译器选项的 PR](https://github.com/microsoft/TypeScript/pull/18654)。

### 示例

以下是此规则在 `property` 选项下的**错误**代码示例：

```ts
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
interface T3 {
  func(arg: number): void;
  func(arg: string): void;
  func(arg: boolean): void;
}
```

以下是此规则在 `property` 选项下的**正确**代码示例：

```ts
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
// 这等价于重载
interface T3 {
  func: ((arg: number) => void) & ((arg: string) => void) & ((arg: boolean) => void);
}
```

以下是此规则在 `method` 选项下的**错误**代码示例：

```ts
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
```

以下是此规则在 `method` 选项下的**正确**代码示例：

```ts
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
```

## 配置

此规则接受以下字符串值之一：

### `"property"`

强制函数使用属性签名。可在 TypeScript 的严格模式下与之配合，以强制获得最高的正确性。

### `"method"`

强制函数使用方法签名。如果你没有使用 TypeScript 的严格模式，并且更喜欢这种风格，可以使用它。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.68.0 中添加。

## 参考

<RuleReferences />
