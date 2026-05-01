---
title: "unicorn/prefer-string-trim-start-end"
category: "Style"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_string_trim_start_end.rs`;
</script>

<RuleHeader />

### 它的作用

[`String#trimLeft()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft) 和 [`String#trimRight()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight) 是 [`String#trimStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) 和 [`String#trimEnd()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) 的别名。这样做是为了确保一致性，并使用与 [direction](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Handling_different_text_directions) 无关的表述。

### 为什么这不好？

`trimLeft` 和 `trimRight` 这两个名称令人困惑，并且与语言的其他部分不一致。

### 示例

此规则的**错误**代码示例：

```javascript
str.trimLeft();
str.trimRight();
```

此规则的**正确**代码示例：

```javascript
str.trimStart();
str.trimEnd();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.16 中添加。

## 参考资料

<RuleReferences />
