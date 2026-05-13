---
title: "typescript/no-floating-promises | Oxlint"
rule: "typescript/no-floating-promises"
category: "正确性"
version: "1.11.0"
default: true
type_aware: true
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_floating_promises.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_floating_promises/no_floating_promises.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止 TypeScript 代码中的“悬空” Promise，即创建后没有任何代码处理其完成或拒绝的 Promise。

此规则会报告未以以下任一方式处理的、具有 Promise 值的语句：

- 使用两个参数调用其 `.then()`
- 使用一个参数调用其 `.catch()`
- 对其 `await`
- `return` 它
- 对其使用 `void`

此规则还会报告创建了包含 Promise 的数组但未被正确处理的情况。解决此问题的主要方式是使用某个 Promise 并发方法创建一个单独的 Promise，然后按照上述流程对其进行处理。这些方法包括：

- `Promise.all()`
- `Promise.allSettled()`
- `Promise.any()`
- `Promise.race()`

### 为什么这很糟糕？

悬空 Promise 会导致多种问题，例如操作顺序不正确、Promise 拒绝被忽略等。

### 示例

此规则的**错误**代码示例：

```ts
const promise = new Promise((resolve, reject) => resolve("value"));
promise;

async function returnsPromise() {
  return "value";
}
returnsPromise().then(() => {});

Promise.reject("value").catch();

Promise.reject("value").finally();

[1, 2, 3].map(async (x) => x + 1);
```

此规则的**正确**代码示例：

```ts
const promise = new Promise((resolve, reject) => resolve("value"));
await promise;

async function returnsPromise() {
  return "value";
}

void returnsPromise();

returnsPromise().then(
  () => {},
  () => {},
);

Promise.reject("value").catch(() => {});

await Promise.reject("value").finally(() => {});

await Promise.all([1, 2, 3].map(async (x) => x + 1));
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowForKnownSafeCalls

type: `array`

default: `[]`

允许忽略特定调用，按类型或值说明符指定。

#### allowForKnownSafeCalls[n]

type: `object | string`

用于匹配特定声明的类型或值说明符

支持四种说明符类型：

1. **字符串说明符**（已弃用）：按名称进行全局匹配

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

4. **包说明符**：匹配来自 npm 包的类型/值

```json
{ "from": "package", "name": "Observable", "package": "rxjs" }
{ "from": "package", "name": ["Observable", "Subject"], "package": "rxjs" }
```

##### allowForKnownSafeCalls[n].from

type: `"file"`

必须为 "file"

##### allowForKnownSafeCalls[n].name

type: `array | string`

要匹配的类型或值名称

名称说明符可以是单个字符串或字符串数组

###### allowForKnownSafeCalls[n].name[n]

type: `string`

##### allowForKnownSafeCalls[n].path

type: `string`

可选文件路径，用于指定类型或值必须声明的位置。
如果省略，则会匹配所有文件。

### allowForKnownSafePromises

type: `array`

default: `[]`

允许忽略特定 Promise 类型，按类型或值说明符指定。

#### allowForKnownSafePromises[n]

type: `object | string`

用于匹配特定声明的类型或值说明符

支持四种说明符类型：

1. **字符串说明符**（已弃用）：按名称进行全局匹配

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

4. **包说明符**：匹配来自 npm 包的类型/值

```json
{ "from": "package", "name": "Observable", "package": "rxjs" }
{ "from": "package", "name": ["Observable", "Subject"], "package": "rxjs" }
```

##### allowForKnownSafePromises[n].from

type: `"file"`

必须为 "file"

##### allowForKnownSafePromises[n].name

type: `array | string`

要匹配的类型或值名称

名称说明符可以是单个字符串或字符串数组

###### allowForKnownSafePromises[n].name[n]

type: `string`

##### allowForKnownSafePromises[n].path

type: `string`

可选文件路径，用于指定类型或值必须声明的位置。
如果省略，则会匹配所有文件。

### checkThenables

type: `boolean`

default: `false`

检查不一定是 Promise 的 thenable 对象。

### ignoreIIFE

type: `boolean`

default: `false`

忽略立即调用函数表达式（IIFE）。

### ignoreVoid

type: `boolean`

default: `true`

忽略作为 void 表达式的 Promise。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.11.0 中新增。

## 参考资料

<RuleReferences />
