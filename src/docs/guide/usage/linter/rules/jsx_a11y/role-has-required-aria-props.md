---
title: "jsx-a11y/role-has-required-aria-props"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/role_has_required_aria_props.rs`;
</script>

<RuleHeader />

### 作用

强制具有 ARIA 角色的元素必须拥有该角色所需的全部属性。

### 为什么这不好？

某些 ARIA 角色需要特定属性，以向辅助技术表达必要的语义。

### 示例

此规则的**错误**代码示例：

```jsx
<div role="checkbox" />
```

此规则的**正确**代码示例：

```jsx
<div role="checkbox" aria-checked="false" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
