---
title: "jsx-a11y/no-autofocus | Oxlint"
rule: "jsx-a11y/no-autofocus"
category: "正确性"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_autofocus.rs`;
</script>

<RuleHeader />

### 作用

强制不要在元素上使用 `autoFocus` 属性。

### 为什么这不好？

自动聚焦元素会给有视觉和无视觉障碍的用户都带来可用性问题。在没有用户输入的情况下焦点被转移时，可能会让人感到迷失方向，并且会干扰辅助技术。用户应该控制页面上焦点何时以及移动到哪里。

### 例外情况

`<dialog>` 元素、具有 `role="dialog"` 的元素，以及带有
`popover` 属性的元素（及其后代）都被豁免，因为在打开时将焦点
引导到这些元素中是预期行为。
参见 [MDN: `<dialog>` 可访问性](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility)。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div autoFocus />
<div autoFocus="true" />
<div autoFocus="false" />
<div autoFocus={undefined} />
```

以下是此规则的**正确**代码示例：

```jsx
<div />
<dialog><input autoFocus /></dialog>
<div role="dialog"><input autoFocus /></div>
<div popover><input autoFocus /></div>
```

## 配置

此规则接受一个具有以下属性的配置对象：

### ignoreNonDOM

type: `boolean`

default: `false`

决定是否检查开发者创建的组件。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.19 中添加的。

## 参考资料

<RuleReferences />
