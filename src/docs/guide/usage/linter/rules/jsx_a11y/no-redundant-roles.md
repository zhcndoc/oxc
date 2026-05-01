---
title: "jsx-a11y/no-redundant-roles"
category: "Correctness"
version: "0.2.1"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_redundant_roles.rs`;
</script>

<RuleHeader />

### 它的作用

强制代码不要包含多余的 `role` 属性，前提是它与元素类型的隐式 `role` 属性相同。

### 为什么这不好？

多余的角色会导致代码库中的混淆和冗余。

### 示例

此规则适用于以下元素及其隐式角色：

- `<nav>`: `navigation`
- `<button>`: `button`
- `<body>`: `document`

以下是此规则的**错误**代码示例：

```jsx
<nav role="navigation"></nav>
<button role="button"></button>
<body role="document"></body>
```

以下是此规则的**正确**代码示例：

```jsx
<nav></nav>
<button></button>
<body></body>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.2.1 中添加。

## 参考资料

<RuleReferences />
