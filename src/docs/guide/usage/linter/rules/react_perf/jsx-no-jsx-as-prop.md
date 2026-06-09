---
title: "react-perf/jsx-no-jsx-as-prop | Oxlint"
rule: "react-perf/jsx-no-jsx-as-prop"
category: "Perf"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/cvazac/eslint-plugin-react-perf/blob/master/docs/rules/jsx-no-jsx-as-prop.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react_perf/jsx_no_jsx_as_prop.rs`;
</script>

<RuleHeader />

### 它的作用

防止将当前方法中局部定义的 JSX 元素用作 JSX 属性值。

### 为什么这不好？

将本地定义的 JSX 元素作为属性值会导致意外的重新渲染和性能问题。每当父组件重新渲染时，都会创建一个新的 JSX 元素实例，从而触发子组件不必要的重新渲染。这也会让代码更难维护，因为组件属性不会以一致的方式传递。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<Item jsx={<SubItem />} />
<Item jsx={this.props.jsx || <SubItem />} />
<Item jsx={this.props.jsx ? this.props.jsx : <SubItem />} />
```

以下是此规则的**正确**代码示例：

```jsx
<Item callback={this.props.jsx} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.3 中添加。

## 参考资料

<RuleReferences />
