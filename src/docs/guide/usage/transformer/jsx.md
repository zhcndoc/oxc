# JSX

Oxc 转换器支持转换 JSX。

## 常规用法

```js
import { transform } from "oxc-transform";

const result = await transform("App.jsx", sourceCode, {
  jsx: {
    runtime: "automatic", // 或 "classic"
    development: false, // 或 true
    throwIfNamespace: true, // 或 false
    pure: true, // 或 false
    importSource: "react",
    pragma: "React.createElement",
    pragmaFrag: "React.Fragment",
    refresh: false, // 见下文
  },
  // 转换 TSX 文件时：
  typescript: {
    jsxPragma: "React.createElement", // 与 `jsx.pragma` 使用相同的值
    jsxPragmaFrag: "React.Fragment", // 与 `jsx.pragmaFrag` 使用相同的值
  },
});
```

你也可以将 `jsx` 设置为 `'preserve'` 来禁用 JSX 转换。

Oxc 转换器还支持 JSX pragma 注释，这同样受到 [Babel](https://babeljs.io/docs/babel-preset-react/) 和 [esbuild](https://esbuild.github.io/api/#jsx) 的支持。Pragma 注释可用于针对单个文件配置 JSX 选项。

### Pragma 注释扫描

对于文件中的 JSX pragma，Oxc 只扫描**第一条语句之前**出现的注释。这意味着放置在函数、类内部或任意语句之后的 pragma 注释都会被忽略。

```jsx
// @jsx h  ← ✅ 此 pragma 会被识别（位于第一条语句之前）

import { h } from "preact";

// @jsx React.createElement  ← ❌ 此 pragma 会被忽略（位于第一条语句之后）
function App() {
  return <div />;
}
```

此行为与 TypeScript 和 SWC 一致，它们都将 pragma 扫描范围限制为开头的注释。请注意，Babel 和 esbuild 会扫描文件中的所有注释（最后一个 pragma 会生效）。

## 运行时

默认使用 `"automatic"` 运行时转换。此转换由 [React 17+ 引入](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)。在此模式下，Oxc 会自动注入所需的 `import` 语句，因此在 `.jsx`/`.tsx` 文件中无需使用 `import React from 'react';`。

你也可以通过将 `jsx.runtime` 选项设置为 `"classic"` 来使用经典运行时转换。

文件开头的 `// @jsxRuntime classic` / `// @jsxRuntime automatic` 是可用于配置此项的 pragma 注释。

## 两种运行时的通用选项

### 开发环境转换

默认情况下，开发环境专用的转换处于禁用状态。你可以将 `jsx.development` 选项设置为 `true` 来启用它们。

### XML 命名空间标签名称

默认情况下，如果使用 XML 命名空间标签名称（例如 `<foo:bar baz:qux="foobar" />`），则会抛出错误。尽管 JSX 规范允许这样做，但由于 React 的 JSX 目前不支持它们，因此默认禁止使用。你可以将 `jsx.throwIfNamespace` 选项设置为 `false` 来允许使用它们。

### 纯注解

默认情况下，JSX 元素会添加纯注解。纯注解是用于标记表达式的注释，如果这些表达式的返回值未被使用，则可以安全地移除它们。但如果你希望保留 JSX 元素，这可能并不符合需求。你可以将 `jsx.pure` 选项设置为 `false` 来禁用此功能。

## 自动运行时特定选项

### 导入源

此选项指定 JSX 辅助函数的导入源。默认值为 `"react"`。

例如，如果你想使用 `preact` 包而不是 `react`，可以将 `jsx.importSource` 设置为 `"preact"`，然后可能会注入以下导入语句：

```js
import { createElement } from "preact";
import { Fragment, jsxDEV } from "preact/jsx-dev-runtime";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
```

`// @jsxImportSource preact` 是通过 pragma 注释进行配置的方式。

## 经典运行时特定选项

### Pragma

此选项指定转换 JSX 表达式时要使用的函数名称。它应为限定名称（例如 `React.createElement`）或标识符（例如 `createElement`）。在 esbuild 中，此选项称为 `jsxFactory`。

`// @jsx createElement` 是通过 pragma 注释配置此选项的方式。

### Pragma Fragment

此选项指定转换 JSX 片段时要使用的函数名称。它应为有效的 JSX 标签名称。在 esbuild 中，此选项称为 `jsxFragment`。

`// @jsxFrag Fragment` 是通过 pragma 注释配置此选项的方式。

## React Refresh

React Refresh（也称为 React Fast Refresh）为开发期间的 React 组件提供热重载功能。

### 用法

要启用 React Refresh 转换，请设置 `jsx.refresh` 选项：

```javascript
import { transform } from "oxc-transform";

const result = await transform("App.jsx", sourceCode, {
  jsx: {
    development: true,
    refresh: true,
    // 或...
    // refresh: {
    //   refreshReg: "$RefreshReg$",
    //   refreshSig: "$RefreshSig$",
    //   emitFullSignatures: true,
    // },
  },
});
```

### 配置选项

| 选项                 | 类型      | 默认值            | 描述                               |
| -------------------- | --------- | ----------------- | ---------------------------------- |
| `refreshReg`         | `string`  | `"$RefreshReg$"`  | 用于注册组件以进行刷新的函数名称   |
| `refreshSig`         | `string`  | `"$RefreshSig$"`  | 用于创建刷新签名的函数名称         |
| `emitFullSignatures` | `boolean` | `false`           | 是否输出完整签名以便更好地调试     |
