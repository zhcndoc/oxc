---
title: "typescript/dot-notation | Oxlint"
rule: "typescript/dot-notation"
category: "样式"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/dot_notation.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/dot_notation/dot_notation.go`;
</script>

<RuleHeader />

### 它的作用

在属性访问能够安全地写成 `obj.prop` 时，强制使用点号表示法。

### 为什么这很糟糕？

对于静态属性名，点号表示法通常比方括号表示法更易读、更简洁。

### 示例

以下是此规则的**错误**代码示例：

```ts
obj["name"];
foo["bar"];
```

以下是此规则的**正确**代码示例：

```ts
obj.name;
foo.bar;

obj[key];
obj["not-an-identifier"];
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowIndexSignaturePropertyAccess

type: `boolean`

default: `false`

允许对由索引签名覆盖的属性使用方括号表示法。

### allowKeywords

type: `boolean`

default: `true`

允许对 ES3 关键字属性名使用方括号表示法（例如 `obj["class"]`）。

### allowPattern

type: `string`

default: `""`

允许使用方括号表示法的属性名的正则表达式模式。

### allowPrivateClassPropertyAccess

type: `boolean`

default: `false`

允许对私有类成员使用方括号表示法。

### allowProtectedClassPropertyAccess

type: `boolean`

default: `false`

允许对受保护的类成员使用方括号表示法。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.49.0 中添加。

## 参考

<RuleReferences />
