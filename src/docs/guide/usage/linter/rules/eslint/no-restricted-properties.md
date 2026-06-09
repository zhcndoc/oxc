---
title: "eslint/no-restricted-properties | Oxlint"
rule: "eslint/no-restricted-properties"
category: "限制"
version: "1.63.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-restricted-properties"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_restricted_properties.rs`;
</script>

<RuleHeader />

### 它的作用

此规则允许你禁止访问某些对象上的特定属性。

### 为什么这很糟糕？

对象上的某些属性在代码库中可能会被禁止使用。这对于废弃某个 API 或限制某个模块方法的使用很有用。例如，你可能希望在使用 Mocha 时禁止使用 describe.only，或者告诉人们使用 Object.assign 而不是 \_.extend。

如果你想禁止使用标记为 `@deprecated` 的 API，建议改用支持类型感知的 `typescript/no-deprecated` 规则。

### 示例

**使用选项：**

```json
"no-restricted-properties": ["error", {
  "object": "JSON",
  "property": "parse"
}]
```

此规则的**错误**代码示例：

```js
/* no-restricted-properties: ["error", { "object": "JSON", "property": "parse" }] */

JSON.parse('{ "json": "here" }'); // 'JSON.parse' 被禁止使用。
```

此规则的**正确**代码示例：

```js
/* no-restricted-properties: ["error", { "object": "JSON", "property": "parse" }] */

JSON.stringify({ json: "here" });
```

**使用选项：**

```json
"no-restricted-properties": ["error", {
  "property": "extend",
  "allowObjects": ["safeUtils"]
}]
```

此规则的**错误**代码示例：

```js
/* no-restricted-properties: ["error", { "property": "extend", "allowObjects": ["safeUtils"] }] */

unsafeUtils.extend(value); // 'extend' 被禁止使用。属性 'extend' 仅允许用于这些对象：safeUtils。
```

此规则的**正确**代码示例：

```js
/* no-restricted-properties: ["error", { "property": "extend", "allowObjects": ["safeUtils"] }] */

safeUtils.extend(value);
```

**使用选项：**

```json
"no-restricted-properties": ["error", {
  "object": "legacyApi",
  "allowProperties": ["stableMethod"]
}]
```

此规则的**错误**代码示例：

```js
/* no-restricted-properties: ["error", { "object": "legacyApi", "allowProperties": ["stableMethod"] }] */

legacyApi.unstableMethod(); // 'legacyApi' 被禁止使用。仅允许这些属性：stableMethod。
```

此规则的**正确**代码示例：

```js
/* no-restricted-properties: ["error", { "object": "legacyApi", "allowProperties": ["stableMethod"] }] */

legacyApi.stableMethod();
```

## 配置

###

type: `object`

#### allowObjects

type: `string[]`

default: `null`

允许进行属性访问的对象。必须与 `property` 一起使用，不能与 `object` 一起使用。

#### allowProperties

type: `string[]`

default: `null`

允许进行属性访问的属性。必须与 `object` 一起使用，不能与 `property` 一起使用。

#### message

type: `string`

default: `null`

要显示的自定义消息。

#### object

type: `string`

default: `null`

正在访问其属性的对象。

#### property

type: `string`

default: `null`

正在访问的属性。如果未指定 `object`，则此项适用于所有对象上的指定属性。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.63.0 中新增。

## 参考资料

<RuleReferences />
