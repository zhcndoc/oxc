---
title: "jsx-a11y/interactive-supports-focus | Oxlint"
rule: "jsx-a11y/interactive-supports-focus"
category: "Correctness"
version: "1.63.0"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/interactive_supports_focus.rs`;
</script>

<RuleHeader />

### 它的作用

强制具有交互角色和交互处理器
（鼠标或按键）的元素必须可聚焦。

### 为什么这很糟糕？

处理用户交互（例如 `onClick`）但不是
原生可聚焦的元素（如 `<div>` 或 `<span>`）必须设置为可聚焦，
这样仅使用键盘的用户和辅助技术用户才能访问并
激活它们。

如果没有 `tabIndex`，这些元素就无法通过键盘导航到达，
从而为无法使用鼠标的用户造成障碍。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<span onClick={submitForm} role="button">提交</span>
<a onClick={showNextPage} role="button">下一页</a>
```

以下是此规则的**正确**代码示例：

```jsx
<div aria-hidden onClick={() => void 0} />
<span onClick={doSomething} tabIndex={0} role="button">点击我！</span>
<span onClick={doSomething} tabIndex={-1} role="menuitem">也点击我！</span>
<a href="javascript:void(0);" onClick={doSomething}>点击所有内容！</a>
<button onClick={doSomething}>点击按钮 :)</button>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### tabbable

type: `string[]`

default: `["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"]`

一个应被视为可通过 Tab 键聚焦的交互式 ARIA 角色数组（需要 `tabIndex={0}`）。
不在此列表中的交互角色只需要可聚焦即可（`tabIndex={-1}` 就足够了）。
默认为 `["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"]`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.63.0 中添加。

## 参考资料

<RuleReferences />
