---
title: "react/jsx-fragments"
category: "Style"
version: "1.12.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_fragments.rs`;
</script>

<RuleHeader />

### 功能

强制 React Fragments 使用简写形式或标准形式。

### 为什么这不好？

使使用片段的代码在某种形式上更加一致。

## 配置

此规则接受以下字符串值之一：

### `"syntax"`

这是默认模式。它会强制 React fragments 使用简写语法，但有一个例外。
简写语法不支持 key 或属性，因此对于使用这些内容的标准形式片段，规则不会发出警告。

此规则的**错误**示例代码：

```jsx
<React.Fragment>
  <Foo />
</React.Fragment>
```

此规则的**正确**示例代码：

```jsx
<>
  <Foo />
</>
```

```jsx
<React.Fragment key="key">
  <Foo />
</React.Fragment>
```

### `"element"`

此模式强制 React fragments 使用标准形式。

此规则的**错误**示例代码：

```jsx
<>
  <Foo />
</>
```

此规则的**正确**示例代码：

```jsx
<React.Fragment>
  <Foo />
</React.Fragment>
```

```jsx
<React.Fragment key="key">
  <Foo />
</React.Fragment>
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
