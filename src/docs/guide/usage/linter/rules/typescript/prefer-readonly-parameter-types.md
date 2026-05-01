---
title: "typescript/prefer-readonly-parameter-types"
category: "Pedantic"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_readonly_parameter_types.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_readonly_parameter_types/prefer_readonly_parameter_types.go`;
</script>

<RuleHeader />

### 作用

要求函数和方法参数使用与 readonly 兼容的类型。

### 为什么这不好？

可变参数类型更容易导致意外修改，并削弱函数契约。
readonly 参数类型能够传达意图，并提升 API 安全性。

### 示例

以下是此规则的**错误**代码示例：

```ts
function update(items: string[]) {
  items.push("x");
}

function consume(obj: { value: string }) {
  obj.value = obj.value.trim();
}
```

以下是此规则的**正确**代码示例：

```ts
function update(items: readonly string[]) {
  return items.length;
}

function consume(obj: Readonly<{ value: string }>) {
  return obj.value;
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allow

type: `array`

default: `[]`

应豁免于此规则的类型/值说明符。

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

3. **lib 说明符**：匹配 TypeScript 内置 lib 类型

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

可选的文件路径，用于指定类型或值必须声明于何处。
如果省略，则会匹配所有文件。

### checkParameterProperties

type: `boolean`

default: `true`

是否检查构造函数参数属性。

### ignoreInferredTypes

type: `boolean`

default: `false`

是否忽略没有显式类型注解的参数。

### treatMethodsAsReadonly

type: `boolean`

default: `false`

是否将可变方法视为 readonly 成员。

## 如何使用

<RuleHowToUse />

## Version

此规则在 v1.49.0 中添加。

## References

<RuleReferences />
