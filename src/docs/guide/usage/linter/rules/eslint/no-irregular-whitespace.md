---
title: "eslint/no-irregular-whitespace | Oxlint"
rule: "eslint/no-irregular-whitespace"
category: "Correctness"
version: "0.1.1"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-irregular-whitespace"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_irregular_whitespace.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在代码中使用不规则空白字符。

### 为什么这很糟糕？

不规则空白字符对大多数编辑器来说是不可见的，可能会导致意外行为，使代码更难调试和维护。  
它们还可能导致代码格式化和解析方面的问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 包含不规则空白字符（不可见）
function example() {
  var foo = "bar"; // 在 'bar' 前有不规则空白
}
```

以下是此规则的**正确**代码示例：

```javascript
function example() {
  var foo = "bar"; // 仅使用普通空格
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### skipComments

type: `boolean`

default: `true`

是否跳过注释中的不规则空白。

### skipJSXText

type: `boolean`

default: `true`

是否跳过 JSX 文本中的不规则空白。

### skipRegExps

type: `boolean`

default: `true`

是否跳过正则表达式字面量中的不规则空白。

### skipStrings

type: `boolean`

default: `true`

是否跳过字符串字面量中的不规则空白。

### skipTemplates

type: `boolean`

default: `true`

是否跳过模板字面量中的不规则空白。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.1.1 中添加。

## 参考资料

<RuleReferences />
