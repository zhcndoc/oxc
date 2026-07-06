---
title: "react-perf/jsx-no-new-function-as-prop | Oxlint"
rule: "react-perf/jsx-no-new-function-as-prop"
category: "Perf"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/cvazac/eslint-plugin-react-perf/blob/master/docs/rules/jsx-no-new-function-as-prop.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_new_function_as_prop.rs`;
</script>

<RuleHeader />

### 作用

阻止将当前方法中本地定义的函数用作 JSX props 的值。

### 为什么这不好？

将本地定义的函数用作 props 的值可能会导致无意的重新渲染和性能问题。每次父组件渲染时，都会创建该函数的新实例，从而导致子组件发生不必要的重新渲染。这也会让代码更难维护，因为组件的 props 传递不够一致。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<Item callback={new Function(...)} />
<Item callback={this.props.callback || function() {}} />
```

以下是此规则的**正确**代码示例：

```jsx
<Item callback={this.props.callback} />
```

## 配置

此规则接受一个配置对象，包含以下属性：

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
