---
title: "react/react-in-jsx-scope"
category: "Suspicious"
version: "0.0.20"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/react_in_jsx_scope.rs`;
</script>

<RuleHeader />

### 作用

在使用 JSX 语法时，强制确保已导入 React 且其处于作用域内。

请注意，如果你使用的是新的 JSX Transform，那么在 React 17+ 中这个规则**并非必需**，你可以禁用此规则，并在包含 JSX 语法的文件中跳过导入 `React`。

如果你的 `tsconfig.json` 中将 `jsx` 设置为 `react-jsx` 或 `react-jsxdev`，则说明你正在使用新的 JSX Transform。
对于使用 Babel 的 JavaScript 项目，如果你的 React preset 配置
（在 `.babelrc` 或 `babel.config.js` 中）包含 `runtime: "automatic"`，则说明你正在使用新的 JSX Transform。

更多信息请参见
[React 博客中关于 JSX Transform 的文章](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint)。

### 为什么这不好？

使用 JSX 时，`<a />` 会展开为 `React.createElement("a")`。因此
`React` 变量必须在作用域内。

### 示例

此规则的**错误**代码示例：

```jsx
const a = <a />;
```

此规则的**正确**代码示例：

```jsx
import React from "react";
const a = <a />;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.20 中添加。

## 参考资料

<RuleReferences />
