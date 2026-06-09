---
title: "react/no-object-type-as-default-prop | Oxlint"
rule: "react/no-object-type-as-default-prop"
category: "Perf"
version: "1.66.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_object_type_as_default_prop.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将对象、数组、函数、类、正则、JSX，或通过 `new` 构造的值
作为解构后的 React 组件 props 的默认值。

### 为什么这不好？

解构参数的默认值会在每次渲染时求值。当默认值是对象字面量、数组字面量、
函数表达式、类表达式、正则表达式、`new` 表达式或 JSX 元素时，都会在
每次渲染时创建一个新的引用。将这个新引用传递给子组件或 hook 依赖数组，
会破坏记忆化并导致不必要的重新渲染。

注意：如果使用 React Compiler，则不需要启用此规则，因为 React
Compiler 会自动对默认值进行记忆化。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Foo({ items = [] }) {
  return <List items={items} />;
}

const Bar = ({ config = {} }) => <div data-config={config} />;

function Baz({ onClick = () => {} }) {
  return <button onClick={onClick} />;
}
```

以下是此规则的**正确**代码示例：

```jsx
const DEFAULT_ITEMS = [];
function Foo({ items = DEFAULT_ITEMS }) {
  return <List items={items} />;
}

const Bar = ({ name = "world" }) => <div>{name}</div>;

function Baz({ onClick }) {
  return <button onClick={onClick} />;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.66.0 中新增。

## 参考资料

<RuleReferences />
