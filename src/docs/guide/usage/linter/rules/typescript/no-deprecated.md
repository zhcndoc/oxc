---
title: "typescript/no-deprecated | Oxlint"
rule: "typescript/no-deprecated"
category: "Pedantic"
version: "1.26.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_deprecated.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_deprecated/no_deprecated.go`;
</script>

<RuleHeader />

### 它的作用

禁止使用标记为 `@deprecated` 的代码。

### 为什么这很糟糕？

JSDoc 的 `@deprecated` 标签可用于记录某段代码已被弃用。最好避免使用标记为已弃用的代码。此规则会报告任何对标记为 `@deprecated` 的代码的引用。

TypeScript 能识别 `@deprecated` 标签，使编辑器能够以可视化方式提示已弃用代码——通常会显示删除线。不过，TypeScript 本身不会为已弃用代码报告类型错误。

### 示例

此规则的**错误**代码示例：

```ts
/** @deprecated 使用 apiV2 替代。 */
declare function apiV1(): Promise<string>;
declare function apiV2(): Promise<string>;

await apiV1(); // 使用已弃用的函数

import { parse } from "node:url";
// 'parse' 已被弃用。请改用 WHATWG URL API。
const url = parse("/foo");
```

此规则的**正确**代码示例：

```ts
/** @deprecated 使用 apiV2 替代。 */
declare function apiV1(): Promise<string>;
declare function apiV2(): Promise<string>;

await apiV2(); // 使用未弃用的函数

// 现代 Node.js API，使用 `new URL()`
const url2 = new URL("/foo", "http://www.example.com");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[]`

一个允许使用的类型或值说明符数组，即使它们已被弃用。
可用它来允许你有意继续使用的特定已弃用 API。

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

此规则于 v1.26.0 中添加。

## 参考资料

<RuleReferences />
