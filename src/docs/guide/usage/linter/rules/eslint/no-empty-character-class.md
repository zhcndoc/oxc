---
title: "eslint/no-empty-character-class"
category: "正确性"
version: "0.0.7"
default: true
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_empty_character_class.rs`;
</script>

<RuleHeader />

### 作用

禁止在正则表达式中使用空的字符类。

### 为什么不好？

因为正则表达式中的空字符类无法匹配任何内容，它们可能是输入错误。

### 示例

此规则 **错误** 代码示例：

```javascript
var foo = /^abc[]/;
```

此规则 **正确** 代码示例：

```javascript
var foo = /^abc/;
var foo2 = /^abc[123]/;
```

## 如何使用

<RuleHowToUse />

## 版本

该规则在 v0.0.7 中添加。

## 参考资料

<RuleReferences />
