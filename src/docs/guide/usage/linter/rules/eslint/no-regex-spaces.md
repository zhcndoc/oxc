---
title: "eslint/no-regex-spaces"
category: "Restriction"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_regex_spaces.rs`;
</script>

<RuleHeader />

### 作用

禁止在正则表达式中出现连续 2 个及以上的空格。

### 为什么这不好？

在正则表达式中，很难判断要匹配多少个空格。
最好只使用一个空格，然后用量词来指定预期的空格数量。

```javascript
var re = /foo {3}bar/;
```

### 示例

以下是此规则的**错误**代码示例：

```javascript
var re = /foo   bar/;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中添加。

## 参考资料

<RuleReferences />
