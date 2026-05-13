---
title: "eslint/no-invalid-regexp | Oxlint"
rule: "eslint/no-invalid-regexp"
category: "正确性"
version: "0.9.4"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_invalid_regexp.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 RegExp 构造函数中使用无效的正则表达式字符串。

### 为什么这很糟糕？

正则表达式字面量中的无效模式在解析代码时会抛出 SyntaxError，
但 RegExp 构造函数中的无效字符串只会在代码执行时抛出 SyntaxError。

### 示例

以下是此规则的**错误**代码示例：

```js
RegExp("[");
RegExp(".", "z");
new RegExp("\\");
```

以下是此规则的**正确**代码示例：

```js
RegExp(".");
new RegExp();
this.RegExp("[");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowConstructorFlags

type: `string[]`

default: `[]`

区分大小写的标志数组，将被允许使用。

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.9.4。

## 参考资料

<RuleReferences />
