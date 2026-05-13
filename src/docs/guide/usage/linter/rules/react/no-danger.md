---
title: "react/no-danger | Oxlint"
rule: "react/no-danger"
category: "Restriction"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_danger.rs`;
</script>

<RuleHeader />

### 它的作用

此规则禁止使用 `dangerouslySetInnerHTML` 属性。

### 这为什么不好？

`dangerouslySetInnerHTML` 是一种将 HTML 注入到你的 React
组件中的方式。这很危险，因为它很容易导致 XSS
漏洞。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import React from "react";

const Hello = <div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>;
```

以下是此规则的**正确**代码示例：

```jsx
import React from "react";

const Hello = <div>Hello World</div>;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
