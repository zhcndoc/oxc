---
title: "react/jsx-no-literals | Oxlint"
rule: "react/jsx-no-literals"
category: "限制"
version: "1.70.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_literals.rs`;
</script>

<RuleHeader />

### 作用

禁止在 JSX 中使用未包裹的字符串字面量，例如 JSX 元素的文本子节点或字符串值的属性。

### 为什么这很糟糕？

JSX 中硬编码的字符串字面量会使支持国际化（i18n）变得困难。通过要求将字面量包裹在 JSX 表达式容器中（例如调用翻译函数），此规则有助于确保所有面向用户的文本都通过单一、可审计的机制流转，而不是作为内联字符串散落在标记中。

### 示例

此规则的**错误**代码示例：

```jsx
<div>Hello world</div>
```

此规则的**正确**代码示例：

```jsx
<div>{"Hello world"}</div>
```

## 配置

顶层配置和每个 `elementOverrides` 条目之间共享的选项。

该规则接受一个包含以下属性的配置对象：

### allowedStrings

type: `string[]`

default: `[]`

一个唯一字符串值数组，这些值原本会触发警告，但将被忽略。

### elementOverrides

type: `Record<string, object>`

一个对象，其中键为元素名称，值为与上方相同选项的对象。这允许你为不同元素指定不同的选项。

### ignoreProps

type: `boolean`

default: `false`

（默认值：false）- 当为 true 时，该规则会忽略在 props 中使用的字面量，无论是否被包裹。

### noAttributeStrings

type: `boolean`

default: `false`

（默认值：false）- 当设置为 true 时，强制属性中不使用字符串字面量。

### noStrings

type: `boolean`

default: `false`

（默认值：false）- 强制不将字符串字面量用作子元素，无论是否被包裹。

### restrictedAttributes

type: `string[]`

default: `[]`

一个唯一属性名数组，用于限制字符串字面量的使用。使用此选项时，只会检查指定的属性中是否存在字符串字面量。注意：当 noAttributeStrings 为 true 时，在根级别会忽略此选项。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.70.0 中添加。

## 参考文献

<RuleReferences />
