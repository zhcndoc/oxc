---
title: "react/jsx-no-comment-textnodes | Oxlint"
rule: "react/jsx-no-comment-textnodes"
category: "Suspicious"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_comment_textnodes.rs`;
</script>

<RuleHeader />

### 作用

此规则可防止注释字符串（例如以 `//` 或 `/*` 开头的字符串）被意外注入为 JSX 语句中的文本节点。

### 为什么这不好？

在 JSX 中，任何未用花括号包裹的文本节点都会被视为要渲染的字面字符串。当文本中包含注释时，这可能会导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const Hello = () => {
  return <div>// empty div</div>;
};

const Hello = () => {
  return <div>/* empty div */</div>;
};
```

以下是此规则的**正确**代码示例：

```jsx
const Hello = () => {
  return <div>{/* empty div */}</div>;
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.14 中添加的。

## 参考资料

<RuleReferences />
