---
title: "react-perf/jsx-no-new-object-as-prop | Oxlint"
rule: "react-perf/jsx-no-new-object-as-prop"
category: "性能"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_new_object_as_prop.rs`;
</script>

<RuleHeader />

### 作用

防止将当前方法局部定义的对象用作 JSX props 的值。

### 为什么这不好？

将本地定义的对象用作 props 的值可能会导致非预期的重新渲染和性能问题。每当父组件渲染时，都会创建一个新的对象实例，从而导致子组件不必要地重新渲染。这也会使代码更难维护，因为组件的 props 传递不够一致。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<Item config={{}} />
<Item config={new Object()} />
<Item config={Object()} />
<Item config={this.props.config || {}} />
<Item config={this.props.config ? this.props.config : {}} />
<div style={{display: 'none'}} />
```

以下是此规则的**正确**代码示例：

```jsx
<Item config={staticConfig} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.3 中添加的。

## 参考资料

<RuleReferences />
