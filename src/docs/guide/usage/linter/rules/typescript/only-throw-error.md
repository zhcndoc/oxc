---
title: "typescript/only-throw-error"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/only_throw_error.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/only_throw_error/only_throw_error.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许抛出非 Error 值。

### 为什么这不好？

通常认为只抛出 Error 对象（或 Error 的子类）是一种良好的实践。这是因为 Error 对象会自动捕获堆栈跟踪，这对于调试很有用。此外，一些工具和环境期望抛出的值是 Error 对象。

### 示例

以下是此规则的**错误**代码示例：

```ts
throw "error"; // 抛出字符串

throw 42; // 抛出数字

throw true; // 抛出布尔值

throw { message: "error" }; // 抛出普通对象

throw null; // 抛出 null

throw undefined; // 抛出 undefined

const error = "Something went wrong";
throw error; // 抛出非 Error 变量
```

以下是此规则的**正确**代码示例：

```ts
throw new Error("Something went wrong");

throw new TypeError("Invalid type");

throw new RangeError("Value out of range");

// 自定义 Error 子类
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
throw new CustomError("Custom error occurred");

// Error 对象类型的变量
const error = new Error("Error message");
throw error;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[]`

一个类型或值说明符数组，用于指定允许额外抛出的类型。
可用它来允许抛出自定义错误类型。

#### allow[n]

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

##### allow[n].from

type: `"file"`

##### allow[n].name

type: `array | string`

名称说明符，可以是单个字符串或字符串数组

###### allow[n].name[n]

type: `string`

##### allow[n].path

type: `string`

用于指定类型或值必须声明于何处的可选文件路径。
如果省略，则会匹配所有文件。

### allowRethrowing

type: `boolean`

default: `true`

是否允许重新抛出那些不是 Error 对象的捕获值。

### allowThrowingAny

type: `boolean`

default: `true`

是否允许抛出类型为 `any` 的值。

### allowThrowingUnknown

type: `boolean`

default: `true`

是否允许抛出类型为 `unknown` 的值。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中加入。

## 参考资料

<RuleReferences />
