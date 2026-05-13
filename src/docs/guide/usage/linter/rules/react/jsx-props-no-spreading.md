---
title: "react/jsx-props-no-spreading | Oxlint"
rule: "react/jsx-props-no-spreading"
category: "Style"
version: "1.33.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_props_no_spreading.rs`;
</script>

<RuleHeader />

### 作用

禁止 JSX 属性展开。

### 为什么这不好？

强制不对任何 JSX 属性进行展开。这通过更明确地说明组件接收了哪些 props 来提高代码可读性。
这也有助于提高可维护性，避免传递无意中多余的 props，并允许 react 在向 HTML 元素传递无效 HTML 属性时发出警告。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<App {...props} />
<MyCustomComponent {...props} some_other_prop={some_other_prop} />
<img {...props} />
```

以下是此规则的**正确**代码示例：

```jsx
const {src, alt} = props;
const {one_prop, two_prop} = otherProps;
<MyCustomComponent one_prop={one_prop} two_prop={two_prop} />
<img src={src} alt={alt} />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### custom

type: `"ignore" | "enforce"`

default: `"enforce"`

将 `custom` 设置为 `ignore` 将忽略所有自定义 jsx 标签，例如 `App`、`MyCustomComponent` 等。默认设置为 `enforce`。

### exceptions

type: `string[]`

default: `[]`

例外会针对特定组件翻转强制执行行为。
例如：

- 如果 `html` 设置为 `ignore`，那么 `div` 的例外会强制对 `<div>` 元素应用该规则。
- 如果 `custom` 设置为 `enforce`，那么 `Foo` 的例外会忽略对 `<Foo>` 组件的该规则。

这使你可以覆盖单个组件的全局设置。

### explicitSpread

type: `"ignore" | "enforce"`

default: `"enforce"`

将 `explicitSpread` 设置为 `ignore` 将忽略那些在该展开中显式列出所有对象属性的展开操作符。默认设置为 `enforce`。

### html

type: `"ignore" | "enforce"`

default: `"enforce"`

将 `html` 设置为 `ignore` 将忽略所有 html jsx 标签，例如 `div`、`img` 等。默认设置为 `enforce`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.33.0 中新增。

## 参考

<RuleReferences />
