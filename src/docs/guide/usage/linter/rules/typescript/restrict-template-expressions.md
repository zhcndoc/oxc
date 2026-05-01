---
title: "typescript/restrict-template-expressions"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/restrict_template_expressions.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/restrict_template_expressions/restrict_template_expressions.go`;
</script>

<RuleHeader />

### 作用

此规则限制模板字面量表达式中允许使用的类型。

### 为什么这不好？

模板字面量会对插值的值调用 `toString()`。某些类型没有有意义的字符串表示形式（例如会变成 `"[object Object]"` 的对象），或者可能根本没有 `toString` 方法。此规则有助于确保模板表达式中只使用合适的类型。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const obj: object;
declare const sym: symbol;
declare const fn: () => void;
declare const arr: unknown[];

// 对象会变成 "[object Object]"
const str1 = `Value: ${obj}`;

// Symbol 可能不是你所期望的
const str2 = `Symbol: ${sym}`;

// 函数会变成其源代码或 "[Function]"
const str3 = `Function: ${fn}`;

// 数组的格式可能不符合预期
const str4 = `Array: ${arr}`;

// undefined/null 会变成 "undefined"/"null"，这可能会让人困惑
declare const maybeValue: string | undefined;
const str5 = `Value: ${maybeValue}`; // 可能是 "Value: undefined"
```

以下是此规则的**正确**代码示例：

```ts
declare const str: string;
declare const num: number;
declare const bool: boolean;
declare const obj: object;

// 安全的类型
const result1 = `String: ${str}`;
const result2 = `Number: ${num}`;
const result3 = `Boolean: ${bool}`;

// 复杂类型的显式转换
const result4 = `Object: ${JSON.stringify(obj)}`;
const result5 = `Array: ${arr.join(", ")}`;

// 显式处理 undefined/null
declare const maybeValue: string | undefined;
const result6 = `Value: ${maybeValue ?? "N/A"}`;
const result7 = `Value: ${maybeValue || "default"}`;

// unknown 值的类型守卫
declare const unknown: unknown;
const result8 = typeof unknown === "string" ? `Value: ${unknown}` : "Invalid";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[{"from":"lib", "name":["Error", "URL", "URLSearchParams"]}]`

一个用于在模板表达式中允许额外类型的类型或值说明符数组。
默认包括来自 lib 的 Error、URL 和 URLSearchParams。

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

3. **Lib 说明符**：匹配 TypeScript 内置 lib 类型

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

可选的文件路径，用于指定类型或值必须在何处声明。
如果省略，将匹配所有文件。

### allowAny

type: `boolean`

default: `true`

是否允许在模板表达式中使用 `any` 类型的值。

### allowArray

type: `boolean`

default: `false`

是否允许在模板表达式中使用数组类型。

### allowBoolean

type: `boolean`

default: `true`

是否允许在模板表达式中使用布尔类型。

### allowNever

type: `boolean`

default: `false`

是否允许在模板表达式中使用 `never` 类型。

### allowNullish

type: `boolean`

default: `true`

是否允许在模板表达式中使用空值类型（`null` 或 `undefined`）。

### allowNumber

type: `boolean`

default: `true`

是否允许在模板表达式中使用 number 和 bigint 类型。

### allowRegExp

type: `boolean`

default: `true`

是否允许在模板表达式中使用 RegExp 值。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
