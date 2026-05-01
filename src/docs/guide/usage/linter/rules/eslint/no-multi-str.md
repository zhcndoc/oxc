---
title: "eslint/no-multi-str"
category: "Style"
version: "0.5.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_multi_str.rs`;
</script>

<RuleHeader />

### 它的作用

不允许多行字符串。

### 为什么这不好？

有些人认为这是一种不好的做法，因为它最初是 JavaScript 的一个未文档化特性，后来才被正式规范化。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var x =
  "第 1 行 \
 第 2 行";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.5.3 中添加。

## 参考资料

<RuleReferences />
