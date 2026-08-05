---
title: "react/function-component-definition | Oxlint"
rule: "react/function-component-definition"
category: "样式"
version: "1.75.0"
default: false
type_aware: false
fix: "conditional_suggestion"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/function_component_definition.rs`;
</script>

<RuleHeader />

### 作用

强制 React 函数组件使用一致的函数形式。

### 为什么这是不好的？

混用声明、函数表达式和箭头函数会使组件定义难以预测，也更难快速浏览。

### 示例

此规则下的**错误**代码示例：

```jsx
const Component = () => <div />;
```

此规则下的**正确**代码示例：

```jsx
function Component() {
  return <div />;
}
```

## 配置

### namedComponents

类型：`array | "function-declaration" | "arrow-function" | "function-expression"`

#### namedComponents[n]

类型：`"function-declaration" | "arrow-function" | "function-expression"`

### unnamedComponents

类型：`array | "arrow-function" | "function-expression"`

#### unnamedComponents[n]

类型：`"arrow-function" | "function-expression"`

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.75.0 中添加。

## 参考资料

<RuleReferences />
