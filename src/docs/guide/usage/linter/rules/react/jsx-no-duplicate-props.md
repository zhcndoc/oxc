---
title: "react/jsx-no-duplicate-props"
category: "正确性"
version: "0.0.14"
default: false
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_duplicate_props.rs`;
</script>

<RuleHeader />

### 它的作用

此规则可防止 JSX 元素中出现重复的 props。

### 为什么这不好？

在 JSX 元素中存在重复的 props 很可能是一个错误。
使用重复 props 创建 JSX 元素可能会导致应用中的意外行为。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<App a a />;
<App foo={2} bar baz foo={3} />;
```

以下是此规则的**正确**代码示例：

```jsx
<App a />;
<App bar baz foo={3} />;
```

### 与 eslint-plugin-react 的区别

此规则不支持 `ignoreCase` 选项。不同大小写的 props 会被
视为不同项，不会被标记为重复（例如，`<App foo Foo />`
是允许的）。这是有意为之，因为 JSX 中的 props 区分大小写。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.14 中添加。

## 参考资料

<RuleReferences />
