---
title: "react/display-name"
category: "Pedantic"
version: "1.42.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/display_name.rs`;
</script>

<RuleHeader />

### 它的作用

强制 React 组件拥有 `displayName` 属性。

### 为什么这很糟糕？

React DevTools 使用 `displayName` 在组件树中显示组件名称。
如果没有 `displayName`，组件在 DevTools 中会显示为“Unknown”。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const MyComponent = () => <div>Hello</div>;
```

以下是此规则的**正确**代码示例：

```jsx
const MyComponent = () => <div>Hello</div>;
MyComponent.displayName = "MyComponent";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkContextObjects

type: `boolean`

default: `false`

当为 `true` 时，此规则会对没有 `displayName` 的上下文对象发出警告。

`displayName` 允许你为 [你的上下文命名](https://reactjs.org/docs/context.html#contextdisplayname) 对象。
此名称会在 React DevTools 中用于上下文的 `Provider` 和 `Consumer`。

### ignoreTranspilerName

type: `boolean`

default: `false`

当为 `true` 时，该规则会忽略由转译器设置的名称，
并在这种情况下要求提供 `displayName` 属性。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.42.0 中新增。

## 参考

<RuleReferences />
