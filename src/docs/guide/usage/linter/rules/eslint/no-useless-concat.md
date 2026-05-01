---
title: "eslint/no-useless-concat"
category: "Suspicious"
version: "0.4.2"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_concat.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对字面量或模板字面量进行不必要的拼接。

### 这为什么不好？

当两个字符串可以合并为一个单一字面量时，将它们拼接在一起是没有必要的。

### 示例

此规则的**错误**代码示例：

```javascript
var foo = "a" + "b";
```

```javascript
var foo = "a" + "b" + "c";
```

此规则的**正确**代码示例：

```javascript
var foo = "a" + bar;

// 当字符串拼接为多行时
var foo = "a" + "b" + "c";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.2 中添加。

## 参考资料

<RuleReferences />
