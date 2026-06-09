---
title: "typescript/prefer-function-type | Oxlint"
rule: "typescript/prefer-function-type"
category: "Style"
version: "0.2.11"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://typescript-eslint.io/rules/prefer-function-type/"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_function_type.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用函数类型，而不是带有调用签名的接口。

### 这为什么不好？

TypeScript 允许用两种常见方式来声明函数类型：

- 函数类型：`() => string`
- 带有签名的对象类型：`{ (): string }`

在可能的情况下，通常更推荐使用函数类型，因为它更简洁、更易读。只有调用签名的接口会增加不必要的冗长，而不会提供额外功能。

### 示例

以下是此规则判定为**错误**的代码示例：

```typescript
interface Example {
  (): string;
}

function foo(example: { (): number }): number {
  return example();
}

interface ReturnsSelf {
  (arg: string): this;
}
```

以下是此规则判定为**正确**的代码示例：

```typescript
type Example = () => string;

function foo(example: () => number): number {
  return example();
}

// 返回函数本身，而不是 `this` 参数
type ReturnsSelf = (arg: string) => ReturnsSelf;

// 允许多个属性
function foo(bar: { (): string; baz: number }): string {
  return bar();
}

// 允许多个调用签名（重载）
interface Overloaded {
  (data: string): number;
  (id: number): string;
}

// 这等价于 Overloaded 接口。
type Intersection = ((data: string) => number) & ((id: number) => string);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.11 中新增。

## 参考资料

<RuleReferences />
