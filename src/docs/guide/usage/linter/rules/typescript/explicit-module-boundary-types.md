---
title: "typescript/explicit-module-boundary-types | Oxlint"
rule: "typescript/explicit-module-boundary-types"
category: "限制"
version: "1.9.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/explicit_module_boundary_types.rs`;
</script>

<RuleHeader />

### 作用

要求导出的函数以及类的公共类方法显式声明返回类型和参数类型。

### 为什么这很糟糕？

为函数返回值和参数显式添加类型，可以让任何调用代码清楚地知道模块边界的输入和输出。
为这些类型添加显式类型注解有助于提高代码可读性。
它还可以提升 TypeScript 在大型代码库上的类型检查性能。

### 示例

以下是此规则的**错误**代码示例：

```ts
// 应指明没有返回值（void）
export function test() {
  return;
}

// 应指明返回了一个字符串
export var arrowFn = () => "test";

// 所有参数都应有类型
export var arrowFn = (arg): string => `test ${arg}`;
export var arrowFn = (arg: any): string => `test ${arg}`;

export class Test {
  // 应指明没有返回值（void）
  method() {
    return;
  }
}
```

以下是此规则的**正确**代码示例：

```ts
// 没有返回值的函数（void）
export function test(): void {
  return;
}

// 类型为 string 的返回值
export var arrowFn = (): string => "test";

// 所有参数都应有类型
export var arrowFn = (arg: string): string => `test ${arg}`;
export var arrowFn = (arg: unknown): string => `test ${arg}`;

export class Test {
  // 没有返回值的类方法（void）
  method(): void {
    return;
  }
}

// 该函数不适用，因为它不是导出函数。
function test() {
  return;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowArgumentsExplicitlyTypedAsAny

type: `boolean`

default: `false`

是否忽略显式标注为 `any` 的参数。

### allowDirectConstAssertionInArrowFunctions

type: `boolean`

default: `true`

是否忽略那些返回 `as const` 类型断言的无函数体箭头函数上的返回类型注解。
你仍然必须为函数参数指定类型。

### allowHigherOrderFunctions

type: `boolean`

default: `true`

是否忽略那些立即返回另一个函数表达式的函数上的返回类型注解。
你仍然必须为函数参数指定类型。

### allowOverloadFunctions

type: `boolean`

default: `false`

是否忽略带有重载签名的函数上的返回类型注解。

### allowTypedFunctionExpressions

type: `boolean`

default: `true`

是否忽略函数表达式变量上的类型注解。

### allowedNames

type: `string[]`

default: `[]`

不会检查其参数或返回值的函数/方法名称数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.9.0 中添加。

## 参考资料

<RuleReferences />
