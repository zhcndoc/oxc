---
title: "eslint/prefer-template | Oxlint"
rule: "eslint/prefer-template"
category: "样式"
version: "1.12.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/prefer-template"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_template.rs`;
</script>

<RuleHeader />

### 作用

要求使用模板字面量，而不是字符串拼接。

### 为什么这不好？

在 ES2015（ES6）中，我们可以使用模板字面量来代替字符串拼接。

### 示例

以下是此规则的**错误**代码示例：

```js
const str = "Hello, " + name + "!";
const str1 = "Time: " + 12 * 60 * 60 * 1000;
```

以下是此规则的**正确**代码示例：

```js
const str = "Hello World!";
const str2 = `Time: ${12 * 60 * 60 * 1000}`;
const str4 = "Hello, " + "World!";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考资料

<RuleReferences />
