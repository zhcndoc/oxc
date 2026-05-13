---
title: "eslint/no-inline-comments | Oxlint"
rule: "eslint/no-inline-comments"
category: "Pedantic"
version: "1.34.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_inline_comments.rs`;
</script>

<RuleHeader />

### 作用

不允许在代码同一行上添加注释。

### 为什么这不好？

放在代码行末尾的注释会让代码更难阅读。
在纵向浏览时，它们很容易被忽略，而且会使行更长。
将注释放到单独的行上会让它们更显眼，并减少行长度。

### 示例

以下是此规则的**错误**代码示例：

```js
var a = 1; // 行内注释
var b = 2; /* 另一个行内注释 */
```

以下是此规则的**正确**代码示例：

```js
// 单独一行的注释
var a = 1;

/* 单独一行的块注释 */
var b = 2;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignorePattern

type: `string`

用于忽略某些行内注释的正则表达式模式。

匹配此模式的注释将不会被报告。

配置示例：

```json
{
  "no-inline-comments": [
    "error",
    {
      "ignorePattern": "webpackChunkName"
    }
  ]
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.34.0 中添加。

## 参考

<RuleReferences />
