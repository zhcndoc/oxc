---
title: "eslint/no-div-regex | Oxlint"
rule: "eslint/no-div-regex"
category: "Restriction"
version: "0.4.2"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_div_regex.rs`;
</script>

<RuleHeader />

### 作用

禁止在正则表达式开头显式使用等号。

### 为什么不好？

正则表达式字面量开头的字符 /= 可能会被混淆为除法赋值运算符。

### 示例

此规则的 **错误** 代码示例：

```javascript
function bar() {
  return /=foo/;
}
```

此规则的 **正确** 代码示例：

```javascript
function bar() {
  return /[=]foo/;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.4.2 中添加的。

## 参考资料

<RuleReferences />
