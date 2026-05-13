---
title: "react/jsx-pascal-case | Oxlint"
rule: "react/jsx-pascal-case"
category: "Style"
version: "1.19.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_pascal_case.rs`;
</script>

<RuleHeader />

### 它的作用

强制用户定义的 JSX 组件使用 PascalCase。

### 为什么这不好？

它强制用户定义的 JSX 组件在定义和引用时都使用 PascalCase 命名。请注意，由于 React 的 JSX 使用大小写约定
来区分本地组件类和 HTML 标签，因此该规则不会对以小写字母开头的组件发出警告。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<Test_component />
<TEST_COMPONENT />
```

以下是此规则的**正确**代码示例：

```jsx
<div />

<TestComponent />

<TestComponent>
    <div />
</TestComponent>

<CSSTransitionGroup />
```

以下是 "allowAllCaps" 选项的**正确**代码示例：

```jsx
<ALLOWED />

<TEST_COMPONENT />
```

以下是 "allowNamespace" 选项的**正确**代码示例：

```jsx
<Allowed.div />

<TestComponent.p />
```

以下是 "allowLeadingUnderscore" 选项的**正确**代码示例：

```jsx
<_AllowedComponent />

<_AllowedComponent>
    <div />
</_AllowedComponent>
```

## 配置

此规则接受一个配置对象，包含以下属性：

### allowAllCaps

type: `boolean`

default: `false`

是否允许全大写的组件名称。

### allowLeadingUnderscore

type: `boolean`

default: `false`

是否允许组件名称以下划线开头。

### allowNamespace

type: `boolean`

default: `false`

是否允许带命名空间的组件名称。

### ignore

type: `string[]`

default: `[]`

要忽略的组件名称列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.19.0 中添加。

## 参考资料

<RuleReferences />
