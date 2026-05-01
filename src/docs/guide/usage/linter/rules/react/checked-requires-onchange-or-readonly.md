---
title: "react/checked-requires-onchange-or-readonly"
category: "Pedantic"
version: "0.2.15"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/checked_requires_onchange_or_readonly.rs`;
</script>

<RuleHeader />

### 作用

此规则要求 input 元素的 checked 属性必须同时提供 `onChange` 或 `readOnly`。
当同时使用 `checked` 和 `defaultChecked` 属性时，也会发出警告。

### 为什么这不好？

`checked` 一般应始终与 `onChange` 或 `readOnly` 之一一起使用。

同时使用 `checked` 和 `defaultChecked` 很可能是错误，因为它们是控制 input 元素 checked 状态的互斥方式。

### 示例

以下是此规则的 **错误** 代码示例：

```jsx
<input type="checkbox" checked />
<input type="checkbox" checked defaultChecked />
<input type="radio" checked defaultChecked />

React.createElement('input', { checked: false });
React.createElement('input', { type: 'checkbox', checked: true });
React.createElement('input', { type: 'checkbox', checked: true, defaultChecked: true });
```

以下是此规则的 **正确** 代码示例：

```jsx
<input type="checkbox" checked onChange={() => {}} />
<input type="checkbox" checked readOnly />
<input type="checkbox" checked onChange readOnly />
<input type="checkbox" defaultChecked />

React.createElement('input', { type: 'checkbox', checked: true, onChange() {} });
React.createElement('input', { type: 'checkbox', checked: true, readOnly: true });
React.createElement('input', { type: 'checkbox', checked: true, onChange() {}, readOnly: true });
React.createElement('input', { type: 'checkbox', defaultChecked: true });
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreExclusiveCheckedAttribute

type: `boolean`

default: `false`

忽略 `checked` 和 `defaultChecked` 不应同时使用的限制。

### ignoreMissingProperties

type: `boolean`

default: `false`

当存在 `checked` 属性时，忽略必须提供 `onChange` 或 `readOnly` 之一的要求。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.15 中添加。

## 参考资料

<RuleReferences />
