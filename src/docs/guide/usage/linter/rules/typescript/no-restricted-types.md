---
title: "typescript/no-restricted-types"
category: "限制"
version: "1.31.0"
default: false
type_aware: false
fix: "fixable_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_restricted_types.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用某些类型。

### 这为什么不好？

一些内置类型有别名，而另一些类型被认为是危险或有害的。
通常，禁止某些类型有助于保持一致性和安全性。

### 示例

给定 `{ "types": { "Foo": { "message": "请改用 Bar", "fixWith": "Bar" } } }`：

此规则的**错误**代码示例：

```ts
let value: Foo;
```

此规则的**正确**代码示例：

```ts
let value: Bar;
```

此规则的其他配置选项示例：

- 仅通过消息禁止 `Foo` 类型，不提供修复或建议：
  `{ "types": { "Foo": "请改用 `OtherType`。" } }`

- 通过建议禁止 `Bar` 类型：
  `{ "types": { "Bar": { "message": "请避免使用 `Bar`。", "suggest": "BazQux" } } }`

- 使用通用消息禁止 `Object` 类型：
  `{ "types": { "Object": true } }`

## 配置

此规则接受一个包含以下属性的配置对象：

### types

type: `object`

default: `{}`

类型名称到禁止配置的映射。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.31.0 中添加。

## 参考资料

<RuleReferences />
