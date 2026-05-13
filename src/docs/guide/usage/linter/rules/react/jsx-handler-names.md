---
title: "react/jsx-handler-names | Oxlint"
rule: "react/jsx-handler-names"
category: "样式"
version: "1.13.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_handler_names.rs`;
</script>

<RuleHeader />

### 它的作用

确保用于处理事件的任何组件或属性方法都使用正确的前缀。

### 为什么这不好？

事件处理器和属性命名不一致会降低代码可读性和可维护性。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<MyComponent handleChange={this.handleChange} />
<MyComponent onChange={this.componentChanged} />
```

以下是此规则的**正确**代码示例：

```jsx
<MyComponent onChange={this.handleChange} />
<MyComponent onChange={this.props.onFoo} />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkInlineFunctions

type: `boolean`

default: `false`

是否检查 JSX 属性中的内联函数。

### checkLocalVariables

type: `boolean`

default: `false`

是否检查 JSX 属性中的局部变量。

### eventHandlerPrefixes

type: `string`

default: `"handle"`

要检查的事件处理器前缀。

### eventHandlerPropPrefixes

type: `string`

default: `"on"`

要检查的事件处理器属性前缀。

### eventHandlerPropRegex

type: `string`

事件处理器属性前缀的编译后正则表达式。

### eventHandlerRegex

type: `string`

事件处理器前缀的编译后正则表达式。

### ignoreComponentNames

type: `string[]`

default: `[]`

检查事件处理器前缀时要忽略的组件名称。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.13.0 中添加。

## 参考资料

<RuleReferences />
