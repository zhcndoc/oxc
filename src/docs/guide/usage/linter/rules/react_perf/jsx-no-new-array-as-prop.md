---
title: "react-perf/jsx-no-new-array-as-prop | Oxlint"
rule: "react-perf/jsx-no-new-array-as-prop"
category: "Perf"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/cvazac/eslint-plugin-react-perf/blob/master/docs/rules/jsx-no-new-array-as-prop.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_new_array_as_prop.rs`;
</script>

<RuleHeader />

### 作用

阻止将当前方法内局部创建的数组用作 JSX props 的值。

### 为什么这不好？

将局部定义的数组用作 props 的值可能会导致非预期的
重新渲染和性能问题。每次父组件渲染时，都会创建一个新的 Array 实例，从而导致
子组件的不必要重新渲染。这也会使代码更难维护，因为
组件的 props 没有以一致的方式传递。

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

## 配置

此规则接受一个包含以下属性的配置对象：

### nativeAllowList

类型：`array | "all"`

#### nativeAllowList[n]

类型：`string`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.3 中添加。

## 参考资料

<RuleReferences />
