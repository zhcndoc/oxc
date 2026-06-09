---
title: "eslint/no-template-curly-in-string | Oxlint"
rule: "eslint/no-template-curly-in-string"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-template-curly-in-string"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_template_curly_in_string.rs`;
</script>

<RuleHeader />

### 作用

禁止在普通字符串中使用模板字面量占位符语法。此规则确保像
`${variable}` 这样的表达式只在模板字面量中使用，避免在普通字符串中出现错误
用法。

### 为什么这很糟糕？

ECMAScript 6 允许程序员使用模板字面量来创建包含变量或表达式的字符串。
这是通过在反引号之间嵌入 `${variable}` 之类的表达式来实现的。
如果将普通引号（`'` 或 `"`）与模板字面量语法混用，结果会得到字面字符串
`"${variable}"`，而不是对表达式求值。此规则有助于避免这种错误，
确保表达式在模板字面量中被正确求值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
"Hello ${name}!";
"Hello ${name}!";
"Time: ${12 * 60 * 60 * 1000}";
```

以下是此规则的**正确**代码示例：

```javascript
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;
templateFunction`Hello ${name}`;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.14 中添加的。

## 参考资料

<RuleReferences />
