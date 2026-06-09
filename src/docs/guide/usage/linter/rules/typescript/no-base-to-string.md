---
title: "typescript/no-base-to-string | Oxlint"
rule: "typescript/no-base-to-string"
category: "Correctness"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-base-to-string/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_base_to_string.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_base_to_string/no_base_to_string.go`;
</script>

<RuleHeader />

### 它的作用

此规则要求 `toString()` 和 `toLocaleString()` 仅可在调用字符串化后能提供有用信息的对象上调用。

### 为什么这很糟糕？

JavaScript 的 `toString()` 方法在普通对象上返回 `'[object Object]'`，这并不是有用的信息。此规则可防止在返回较不有用字符串的对象上调用 `toString()` 和 `toLocaleString()`。

### 示例

以下是此规则的**错误**代码示例：

```ts
// 这些将求值为 '[object Object]'
({}).toString();
({ foo: "bar" }).toString();
({ foo: "bar" }).toLocaleString();

// 这将求值为 'Symbol()'
Symbol("foo").toString();
```

以下是此规则的**正确**代码示例：

```ts
const someString = "Hello world";
someString.toString();

const someNumber = 42;
someNumber.toString();

const someBoolean = true;
someBoolean.toString();

class CustomToString {
  toString() {
    return "CustomToString";
  }
}
new CustomToString().toString();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkUnknown

type: `boolean`

default: `false`

是否也检查 `unknown` 类型的值。
当为 `true` 时，对 `unknown` 值调用 `toString` 将会被标记。
默认值为 `false`。

### ignoredTypeNames

type: `string[]`

default: `["Error", "RegExp", "URL", "URLSearchParams"]`

检查不安全的 `toString` 用法时要忽略的类型名称列表。
即使这些类型没有提供自定义实现，也会被认为可以安全地调用 `toString`。

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v1.12.0 起加入。

## 参考资料

<RuleReferences />
