---
title: "jsx-a11y/control-has-associated-label | Oxlint"
rule: "jsx-a11y/control-has-associated-label"
category: "正确性"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/control_has_associated_label.rs`;
</script>

<RuleHeader />

### 它的作用

强制要求一个控件（交互元素）具有文本标签。

### 为什么这不好？

没有可访问文本标签的交互元素（例如 `<button>`）会使辅助技术的用户难以或无法理解该控件的用途。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<button />
<a href="/path" />
<th />
<div role="button" />
<div role="checkbox" />
```

以下是此规则的**正确**代码示例：

```jsx
<button>保存</button>
<button aria-label="保存" />
<label>姓名 <input type="text" /></label>
<a href="/path">了解更多</a>
<th>列标题</th>
<div role="button">提交</div>
<div role="checkbox" aria-labelledby="label_id" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### controlComponents

type: `string[]`

default: `[]`

要视为交互控件的自定义 JSX 组件。

### depth

type: `integer`

default: `2`

在元素内搜索可访问标签的最大深度。
默认为 `2`。

### ignoreElements

type: `string[]`

default: `["audio", "canvas", "embed", "input", "textarea", "tr", "video"]`

要忽略的元素。
默认值为 `["audio", "canvas", "embed", "input", "textarea", "tr", "video"]`。

### ignoreRoles

type: `string[]`

default: `["grid", "listbox", "menu", "menubar", "radiogroup", "row", "tablist", "toolbar", "tree", "treegrid"]`

要忽略的交互角色。
默认值为 `["grid", "listbox", "menu", "menubar", "radiogroup", "row", "tablist", "toolbar", "tree", "treegrid"]`。

### labelAttributes

type: `string[]`

default: `[]`

用于检查可访问标签文本的附加属性。

## How to use

<RuleHowToUse />

## 版本

此规则于 v1.65.0 中添加。

## 参考资料

<RuleReferences />
