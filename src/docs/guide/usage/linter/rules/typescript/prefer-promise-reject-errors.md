---
title: "typescript/prefer-promise-reject-errors"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_promise_reject_errors.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_promise_reject_errors/prefer_promise_reject_errors.go`;
</script>

<RuleHeader />

### 作用

此规则强制将 `Error` 对象传递给 `Promise.reject()`。

### 为什么这是不好的？

通常认为，只用 `Error` 对象来拒绝 Promise 是一种良好实践。这是因为 `Error` 对象会自动捕获堆栈跟踪，这对调试很有帮助。此外，一些工具和环境期望拒绝原因是 `Error` 对象。

### 示例

此规则的**错误**代码示例：

```ts
Promise.reject("error"); // 使用字符串拒绝

Promise.reject(42); // 使用数字拒绝

Promise.reject(true); // 使用布尔值拒绝

Promise.reject({ message: "error" }); // 使用普通对象拒绝

Promise.reject(null); // 使用 null 拒绝

Promise.reject(); // 使用 undefined 拒绝

const error = "Something went wrong";
Promise.reject(error); // 使用非 Error 变量拒绝
```

此规则的**正确**代码示例：

```ts
Promise.reject(new Error("Something went wrong"));

Promise.reject(new TypeError("Invalid type"));

Promise.reject(new RangeError("Value out of range"));

// 自定义 Error 子类
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
Promise.reject(new CustomError("Custom error occurred"));

// 值为 Error 对象的变量
const error = new Error("Error message");
Promise.reject(error);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[]`

允许作为 Promise 拒绝原因的附加类型或值说明符数组。

#### allow[n]

type: `object | string`

用于匹配特定声明的类型或值说明符

支持四种说明符类型：

1. **字符串说明符**（已弃用）：按名称进行通用匹配

```json
"Promise"
```

2. **文件说明符**：匹配在本地文件中声明的类型/值

```json
{ "from": "file", "name": "MyType" }
{ "from": "file", "name": ["Type1", "Type2"] }
{ "from": "file", "name": "MyType", "path": "./types.ts" }
```

3. **库说明符**：匹配 TypeScript 内置 lib 类型

```json
{ "from": "lib", "name": "Promise" }
{ "from": "lib", "name": ["Promise", "PromiseLike"] }
```

4. **包说明符**：匹配来自 npm 包的类型/值

```json
{ "from": "package", "name": "Observable", "package": "rxjs" }
{ "from": "package", "name": ["Observable", "Subject"], "package": "rxjs" }
```

##### allow[n].from

type: `"file"`

##### allow[n].name

type: `array | string`

名称说明符，可以是单个字符串或字符串数组

###### allow[n].name[n]

type: `string`

##### allow[n].path

type: `string`

可选的文件路径，用于指定类型或值必须在哪些位置声明。
如果省略，则会匹配所有文件。

### allowEmptyReject

type: `boolean`

default: `false`

是否允许在不传入任何参数的情况下调用 `Promise.reject()`。

### allowThrowingAny

type: `boolean`

default: `false`

是否允许拒绝类型为 `any` 的 Promise。

### allowThrowingUnknown

type: `boolean`

default: `false`

是否允许拒绝类型为 `unknown` 的 Promise。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
