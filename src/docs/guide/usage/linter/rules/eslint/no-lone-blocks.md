---
title: "eslint/no-lone-blocks | Oxlint"
rule: "eslint/no-lone-blocks"
category: "Style"
version: "0.15.6"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-lone-blocks"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_lone_blocks.rs`;
</script>

<RuleHeader />

### 作用

禁止不必要的独立代码块语句。

### 为什么这很糟糕？

独立代码块可能会让人困惑，因为在不必要地使用时，它们并没有任何实际用途。
它们可能会引入额外的嵌套，降低代码可读性，并可能误导读者对作用域或意图的理解。

### 示例

以下是此规则的**错误**代码示例：

```js
{
  var x = 1;
}
```

以下是此规则的**正确**代码示例：

```js
if (condition) {
  var x = 1;
}

{
  let x = 1; // 用于创建一个有效的块级作用域。
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.15.6 中添加。

## 参考资料

<RuleReferences />
