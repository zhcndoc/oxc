---
title: "jsx-a11y/aria-activedescendant-has-tabindex | Oxlint"
rule: "jsx-a11y/aria-activedescendant-has-tabindex"
category: "Correctness"
version: "0.2.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/aria_activedescendant_has_tabindex.rs`;
</script>

<RuleHeader />

### 它的作用

强制带有 aria-activedescendant 的元素可通过 Tab 键聚焦。

### 为什么这有问题？

带有 `aria-activedescendant` 的元素必须能够通过 Tab 键聚焦，以便用户使用键盘输入导航到它们。若没有正确的 tabindex，屏幕阅读器用户就无法通过键盘导航访问该元素，从而导致该功能无法访问。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const Bad = <div aria-activedescendant={someID} />;
```

以下是此规则的**正确**代码示例：

```jsx
const Good = (
  <>
    <CustomComponent />
    <CustomComponent aria-activedescendant={someID} />
    <CustomComponent aria-activedescendant={someID} tabIndex={0} />
    <CustomComponent aria-activedescendant={someID} tabIndex={-1} />
    <div />
    <input />
    <div tabIndex={0} />
    <div aria-activedescendant={someID} tabIndex={0} />
    <div aria-activedescendant={someID} tabIndex="0" />
    <div aria-activedescendant={someID} tabIndex={1} />
    <div aria-activedescendant={someID} tabIndex={-1} />
    <div aria-activedescendant={someID} tabIndex="-1" />
    <input aria-activedescendant={someID} />
    <input aria-activedescendant={someID} tabIndex={0} />
    <input aria-activedescendant={someID} tabIndex={-1} />
  </>
);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.1 中添加的。

## 参考资料

<RuleReferences />
