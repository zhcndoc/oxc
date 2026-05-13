---
title: "react/no-children-prop | Oxlint"
rule: "react/no-children-prop"
category: "正确性"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_children_prop.rs`;
</script>

<RuleHeader />

### 作用

检查是否通过 prop 传递 children。

### 为什么这不好？

children 应始终是实际的子元素，而不是通过 prop 传入。
使用 JSX 时，children 应嵌套在开始标签和结束标签之间。
不使用 JSX 时，children 应作为额外参数传递给 `React.createElement`。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div children='Children' />

<MyComponent children={<AnotherComponent />} />
<MyComponent children={['Child 1', 'Child 2']} />
React.createElement("div", { children: 'Children' })
```

以下是此规则的**正确**代码示例：

```jsx
<div>Children</div>
<MyComponent>Children</MyComponent>

<MyComponent>
  <span>Child 1</span>
  <span>Child 2</span>
</MyComponent>

React.createElement("div", {}, 'Children')
React.createElement("div", 'Child 1', 'Child 2')
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.14。

## 参考

<RuleReferences />
