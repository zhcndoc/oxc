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

代码库中可能不允许使用对象上的某些属性。这对于弃用 API 或限制模块方法的使用很有帮助。例如，在使用 Mocha 时，你可能希望禁止使用 describe.only，或者建议人们使用 Object.assign 而不是 _.extend。

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

JSON.parse('{ "json": "here" }'); // 禁止使用 'JSON.parse'。
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

unsafeUtils.extend(value); // 禁止使用 'extend'。属性 'extend' 仅允许用于这些对象：safeUtils。
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

legacyApi.unstableMethod(); // 禁止使用 'legacyApi'。仅允许这些属性：stableMethod。
```

此规则的**正确**代码示例：

```js
/* no-restricted-properties: ["error", { "object": "legacyApi", "allowProperties": ["stableMethod"] }] */

legacyApi.stableMethod();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.63.0 中新增。

## 参考资料

<RuleReferences />
