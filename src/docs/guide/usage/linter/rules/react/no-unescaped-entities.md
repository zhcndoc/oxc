---
title: "react/no-unescaped-entities"
category: "Pedantic"
version: "0.0.15"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_unescaped_entities.rs`;
</script>

<RuleHeader />

### 作用

此规则可防止你可能原本想作为 JSX 转义字符使用的字符，意外地在 JSX 语句中作为文本节点注入。

### 为什么这很糟糕？

JSX 转义字符用于向 JSX 语句中注入字符，否则这些字符会被解释为代码。

### 示例

错误

```jsx
<div> > </div>
```

正确

```jsx
<div> &gt; </div>
```

```jsx
<div> {">"} </div>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.15 中添加。

## 参考资料

<RuleReferences />
