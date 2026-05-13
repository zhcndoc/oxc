---
title: "typescript/ban-ts-comment | Oxlint"
rule: "typescript/ban-ts-comment"
category: "Pedantic"
version: "0.0.8"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/ban_ts_comment.rs`;
</script>

<RuleHeader />

### 它的作用

此规则允许您设置在代码库中允许使用哪些指令注释。

### 为什么这不好？

使用 TypeScript 指令来抑制 TypeScript 编译器错误
会降低 TypeScript 整体的有效性。

### 示例

此规则的**错误**代码示例如下：

```ts
if (false) {
  // @ts-ignore: 无法执行的代码错误
  console.log("hello");
}
```

## 配置

此规则允许您指定应如何处理不同的 TypeScript 指令注释。

对于每个指令（`@ts-expect-error`、`@ts-ignore`、`@ts-nocheck`、`@ts-check`），您可以选择以下选项之一：

- `true`：完全禁止该指令，阻止其在整个代码库中使用。
- `false`：不加限制地允许该指令。
- `"allow-with-description"`：仅当该指令后跟有说明其用途的描述时才允许使用。该描述必须满足 `minimumDescriptionLength` 指定的最小长度。
- `{ "descriptionFormat": "<regex>" }`：仅当描述匹配指定的正则表达式模式时才允许使用该指令。

例如：

```json
{
  "ts-expect-error": "allow-with-description",
  "ts-ignore": true,
  "ts-nocheck": { "descriptionFormat": "^: TS\\d+ because .+$" },
  "ts-check": false,
  "minimumDescriptionLength": 3
}
```

此规则接受一个包含以下属性的配置对象：

### minimumDescriptionLength

type: `integer`

default: `3`

使用 `allow-with-description` 指令时所需的最小描述长度。

### ts-check

如何处理 `@ts-check` 指令。

### ts-expect-error

如何处理 `@ts-expect-error` 指令。

### ts-ignore

如何处理 `@ts-ignore` 指令。

### ts-nocheck

如何处理 `@ts-nocheck` 指令。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.8 中添加。

## 参考

<RuleReferences />
