---
title: "jsx-a11y/mouse-events-have-key-events | Oxlint"
rule: "jsx-a11y/mouse-events-have-key-events"
category: "Correctness"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/mouse_events_have_key_events.rs`;
</script>

<RuleHeader />

### 作用

强制 `onMouseOver`/`onMouseOut` 需要配合 `onFocus`/`onBlur` 使用。

### 为什么这不好？

为键盘进行编码对有身体残疾、无法使用鼠标的用户、辅助技术兼容性以及屏幕阅读器用户来说都很重要。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div onMouseOver={() => void 0} />
```

以下是此规则的**正确**代码示例：

```jsx
<div onMouseOver={() => void 0} onFocus={() => void 0} />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### hoverInHandlers

type: `string[]`

default: `["onMouseOver"]`

需要对应键盘事件处理器的悬停进入鼠标事件处理器列表。

### hoverOutHandlers

type: `string[]`

default: `["onMouseOut"]`

需要对应键盘事件处理器的悬停离开鼠标事件处理器列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.1.1 中添加。

## 参考资料

<RuleReferences />
