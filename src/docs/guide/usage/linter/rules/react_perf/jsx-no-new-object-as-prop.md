---
title: "react-perf/jsx-no-new-object-as-prop | Oxlint"
rule: "react-perf/jsx-no-new-object-as-prop"
category: "性能"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/cvazac/eslint-plugin-react-perf/blob/master/docs/rules/jsx-no-new-object-as-prop.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_new_object_as_prop.rs`;
</script>

<RuleHeader />

### 作用

阻止将当前方法内局部定义的对象用作 JSX 属性的值。

### 为什么这不好？

将局部定义的对象用作属性值可能会导致非预期的重新渲染和性能问题。每当父组件渲染时，都会创建一个新的 Object 实例，从而引发子组件不必要的重新渲染。这也会使代码更难维护，因为组件的属性传递不够一致。

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

## 配置

此规则接受一个配置对象，包含以下属性：

### nativeAllowList

类型：`array | "all"`

#### nativeAllowList[n]

类型：`string`

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.3 中添加的。

## 参考资料

<RuleReferences />
