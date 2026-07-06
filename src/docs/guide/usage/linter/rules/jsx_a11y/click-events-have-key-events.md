---
title: "jsx-a11y/click-events-have-key-events | Oxlint"
rule: "jsx-a11y/click-events-have-key-events"
category: "Correctness"
version: "0.2.1"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/click_events_have_key_events.rs`;
</script>

<RuleHeader />

### 说明

强制 `onClick` 至少伴随以下之一：`onKeyUp`、`onKeyDown`、`onKeyPress`。

### 为什么这很重要？

键盘操作对无法使用鼠标的肢体残障用户、辅助技术兼容性以及屏幕阅读器用户都很重要。
这不适用于可交互元素或隐藏元素。

### 示例

此规则的**错误**代码示例：

```jsx
<div onClick={() => void 0} />
```

此规则的**正确**代码示例：

```jsx
<div onClick={() => void 0} onKeyDown={() => void 0} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.1 中添加。

## 参考资料

<RuleReferences />
