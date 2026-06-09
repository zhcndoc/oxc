---
title: "typescript/no-misused-spread | Oxlint"
rule: "typescript/no-misused-spread"
category: "Correctness"
version: "1.12.0"
default: true
type_aware: true
fix: "fixable_suggestion"
upstream: "https://typescript-eslint.io/rules/no-misused-spread/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_misused_spread.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_misused_spread/no_misused_spread.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许在不合理或可能导致运行时错误的地方使用展开语法。

### 这为什么不好？

展开运算符可能会被以不太明显的方式误用，从而导致运行时错误或意外行为。此规则有助于捕获常见的误用。

### 示例

此规则的**错误**代码示例：

```ts
// 在数组中展开一个不可迭代的值
const num = 42;
const arr = [...num]; // 运行时错误：num 不可迭代

// 在数组中展开一个 Promise
const promise = Promise.resolve([1, 2, 3]);
const arr2 = [...promise]; // 运行时错误：Promise 不可迭代

// 在对象字面量中展开非对象
const str = "hello";
const obj = { ...str }; // 创建 { '0': 'h', '1': 'e', ... }，这可能出乎意料
```

此规则的**正确**代码示例：

```ts
// 展开数组
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

// 展开对象
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };

// 展开已解析的 Promise
const promise = Promise.resolve([1, 2, 3]);
const arr3 = [...(await promise)];

// 如有需要，对不可迭代值使用 Array.from
const str = "hello";
const arr4 = Array.from(str); // ['h', 'e', 'l', 'l', 'o']
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[]`

一个允许被展开的类型或值说明符数组，
即使它们通常会被标记为误用。

#### allow[n]

type: `object | string`

用于匹配特定声明的类型或值说明符

支持四种说明符类型：

1. **字符串说明符**（已弃用）：按名称进行通配匹配

```json
"Promise"
```

2. **文件说明符**：匹配在本地文件中声明的类型/值

```json
{ "from": "file", "name": "MyType" }
{ "from": "file", "name": ["Type1", "Type2"] }
{ "from": "file", "name": "MyType", "path": "./types.ts" }
```

3. **库说明符**：匹配 TypeScript 内置库类型

```json
{ "from": "lib", "name": "Promise" }
{ "from": "lib", "name": ["Promise", "PromiseLike"] }
```

4. **包说明符**：匹配 npm 包中的类型/值

```json
{ "from": "package", "name": "Observable", "package": "rxjs" }
{ "from": "package", "name": ["Observable", "Subject"], "package": "rxjs" }
```

##### allow[n].from

type: `"file"`

必须为 "file"

##### allow[n].name

type: `array | string`

要匹配的类型或值的名称

名称说明符，可以是单个字符串或字符串数组

###### allow[n].name[n]

type: `string`

##### allow[n].path

type: `string`

用于指定类型或值必须声明于何处的可选文件路径。
如果省略，则会匹配所有文件。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中加入。

## 参考资料

<RuleReferences />
