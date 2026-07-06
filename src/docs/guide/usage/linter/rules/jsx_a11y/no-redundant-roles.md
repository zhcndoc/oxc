---
title: "jsx-a11y/no-redundant-roles | Oxlint"
rule: "jsx-a11y/no-redundant-roles"
category: "正确性"
version: "0.2.1"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md"
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

- `<button>`: `button`

以下是此规则的**错误**代码示例：

```jsx
<button role="button"></button>
```

以下是此规则的**正确**代码示例：

```jsx
<button></button>
```

### 选项

此规则接受一个对象，其键为元素名称，值为允许在该元素上出现的多余角色数组。提供某个条目会覆盖该元素的默认例外情况。

默认情况下，`<nav>` 上允许使用 `role="navigation"`。还可以允许其他角色，例如，为了保留一些浏览器在应用 `list-style: none` 时会移除的显式列表语义：

```json
{
  "jsx-a11y/no-redundant-roles": ["error", { "ul": ["list"], "ol": ["list"], "li": ["listitem"] }]
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

type: `Record<string, array>`

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.2.1 中添加。

## 参考资料

<RuleReferences />
