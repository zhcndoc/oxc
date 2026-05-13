---
title: "react/no-multi-comp | Oxlint"
rule: "react/no-multi-comp"
category: "Restriction"
version: "1.43.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_multi_comp.rs`;
</script>

<RuleHeader />

### 功能

阻止在同一个文件中定义多个 React 组件。

### 为什么这不好？

在单个文件中声明多个组件会使代码库更难导航和维护。为了更好的组织性和可复用性，每个组件理想情况下都应该放在各自的文件中。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Foo({ name }) {
  return <div>Hello {name}</div>;
}

function Bar({ name }) {
  return <div>Hello again {name}</div>;
}
```

以下是此规则的**正确**代码示例：

```jsx
function Foo({ name }) {
  return <div>Hello {name}</div>;
}
```

## 配置

### ignoreStateless

type: `boolean`

default: `false`

当为 `true` 时，此规则将忽略无状态组件，并允许你在同一个文件中包含多个无状态组件。或者在同一个文件中包含一个有状态组件和一个或多个无状态组件。

无状态基本上就是指函数组件，包括通过 `memo` 和 `forwardRef` 创建的组件。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.43.0 中添加的。

## 参考资料

<RuleReferences />
