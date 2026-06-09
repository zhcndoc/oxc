---
title: "eslint/no-useless-escape | Oxlint"
rule: "eslint/no-useless-escape"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-useless-escape"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_escape.rs`;
</script>

<RuleHeader />

### 作用

禁止不必要的转义字符。

### 为什么这不好？

不必要地转义字符不会影响字符串或正则表达式的行为，
并且会通过增加不必要的复杂性，使代码更难阅读和理解。
这适用于字符串字面量、模板字面量和正则表达式。

### 示例

此规则的**错误**代码示例：

```javascript
"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
/[a-z\-]/;
```

此规则的**正确**代码示例：

```javascript
"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
/[[]/;
/[\]]/;
/[a-z-]/;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowRegexCharacters

type: `string[]`

default: `[]`

一个允许在正则表达式中被不必要转义的字符数组。
例如，将其设置为 `["#"]` 允许在正则表达式中使用 `\#`。

此数组中的每个字符串都必须是单个字符。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.5 中添加。

## 参考资料

<RuleReferences />
