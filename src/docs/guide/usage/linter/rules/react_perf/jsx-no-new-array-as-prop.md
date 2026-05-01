---
title: "react-perf/jsx-no-new-array-as-prop"
category: "Perf"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_new_array_as_prop.rs`;
</script>

<RuleHeader />

### 作用

防止将仅在当前方法中局部创建的数组用作 JSX props 的值。

### 为什么这不好？

将局部定义的数组用作 props 的值可能会导致非预期的重新渲染和性能问题。每次父组件渲染时，都会创建一个新的数组实例，从而导致子组件不必要的重新渲染。这也会使代码更难维护，因为组件的 props 传递不再保持一致。

### 示例

此规则的**错误**代码示例：

```jsx
<Item list={[]} />
<Item list={new Array()} />
<Item list={Array()} />
<Item list={this.props.list || []} />
<Item list={this.props.list ? this.props.list : []} />
```

此规则的**正确**代码示例：

```jsx
<Item list={this.props.list} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.3 中添加。

## 参考资料

<RuleReferences />
