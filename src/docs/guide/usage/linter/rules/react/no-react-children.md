---
title: "react/no-react-children"
category: "Restriction"
version: "1.53.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_react_children.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `React.Children`，因为这被视为一种不良实践。

### 为什么这不好？

使用 `React.Children`  
[不被 React 文档推荐](https://react.dev/reference/react/Children)。  
这是一种不常见的模式，可能导致代码脆弱。

建议使用其他方式来处理 children。更多信息请参见  
[React 文档](https://react.dev/reference/react/Children#alternatives)。

::: tip
不要将 `React.Children` 与使用 `children` prop（小写 `c`）混淆，后者是  
良好做法并且受到鼓励。
:::

请注意，这条规则基于 `@eslint-react/eslint-plugin` 中多条规则的组合，  
包括 [`@eslint-react/no-children-count`](https://www.eslint-react.xyz/docs/rules/no-children-count)  
和 [`@eslint-react/no-children-for-each`](https://www.eslint-react.xyz/docs/rules/no-children-for-each)。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import { Children } from "react";

Children.toArray(children);
Children.map(children, (child) => <div>{child}</div>);
Children.only(children);
Children.count(children);
Children.forEach(children, (child, index) => {});
```

```jsx
import React from "react";

function Table({ children }) {
  const mappedChildren = React.Children.map(children, (child) => <tr>{child}</tr>);

  return <table>{mappedChildren}</table>;
}
```

```jsx
import { Children } from "react";

function RowList({ children }) {
  return (
    <>
      <h1>总行数：{Children.count(children)}</h1>
    </>
  );
}
```

以下是此规则的**正确**代码示例：

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.53.0 中添加。

## 参考资料

<RuleReferences />
