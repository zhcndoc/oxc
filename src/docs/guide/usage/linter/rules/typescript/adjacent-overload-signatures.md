---
title: "typescript/adjacent-overload-signatures"
category: "Style"
version: "0.0.7"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/adjacent_overload_signatures.rs`;
</script>

<RuleHeader />

### 它的作用

要求函数重载签名必须连续排列。

### 为什么这不好？

函数重载签名表示一个函数可以被调用的多种方式，且可能具有不同的返回类型。
通常，描述某个函数的接口或类型别名会将所有重载签名放在一起。
如果签名分散在类型的其他位置，未来阅读代码的开发者更容易忽略它们。

### 示例

以下是此规则的**错误**代码示例：

```typescript
declare namespace Foo {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function bar(): void;
  export function foo(sn: string | number): void;
}

type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
};

interface Foo {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
}

class Foo {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void {}
  foo(sn: string | number): void {}
}

export function foo(s: string): void;
export function foo(n: number): void;
export function bar(): void;
export function foo(sn: string | number): void;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.7 中添加。

## 参考资料

<RuleReferences />
