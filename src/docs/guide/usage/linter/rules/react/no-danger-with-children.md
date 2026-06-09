---
title: "react/no-danger-with-children | Oxlint"
rule: "react/no-danger-with-children"
category: "Correctness"
version: "0.9.6"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_danger_with_children.rs`;
</script>

<RuleHeader />

### 它的作用

当 DOM 元素同时使用 `children` 和 `dangerouslySetInnerHTML` 属性时，禁止这种写法。

### 为什么这不好？

如果忽略此规则并同时使用 `children` 和 `dangerouslySetInnerHTML`，React 会抛出警告。

### 示例

此规则的**错误**代码示例：

```jsx
<div dangerouslySetInnerHTML={{ __html: "HTML" }}>子元素</div>;
React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "子元素");
```

此规则的**正确**代码示例：

```jsx
<div>子元素</div>
<div dangerouslySetInnerHTML={{ __html: "HTML" }} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.9.6 中添加。

## 参考资料

<RuleReferences />
