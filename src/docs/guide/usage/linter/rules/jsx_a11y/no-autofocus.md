---
title: "jsx-a11y/no-autofocus | Oxlint"
rule: "jsx-a11y/no-autofocus"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "可修复建议"
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
