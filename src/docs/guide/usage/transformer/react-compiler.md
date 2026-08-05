# React 编译器

Oxc 对 [React 编译器](https://react.dev/learn/react-compiler) 提供实验性支持，它会自动对 React 组件和 hooks 进行记忆化。

::: warning
此功能处于实验阶段，并且仍在积极开发中。选项和行为可能会发生变化。
:::

在底层，Oxc 集成的是 [React Compiler 的 Rust 移植版](https://github.com/facebook/react/pull/36173)，而不是基于 Babel 的 `babel-plugin-react-compiler`。由于该移植版是一个已合并到 React 的 PR，但尚未发布，Oxc 将其以可发布的 crate 形式内置在 [oxc-project/forked-react-compiler](https://github.com/oxc-project/forked-react-compiler) 中。

## 通用用法

```js
import { transform } from "oxc-transform";

// 使用默认选项启用。
const result = await transform("App.jsx", sourceCode, {
  reactCompiler: true,
});

// 或使用选项启用。
const result = await transform("App.jsx", sourceCode, {
  reactCompiler: {
    // React 运行时版本目标。`'17'` 和 `'18'` 需要
    // `react-compiler-runtime` 包；`'19'` 将运行时包含在 `react` 中。
    target: "19", // '17' | '18' | '19'
  },
});
```

传入 `false` 或省略该选项可禁用 React Compiler。

## 当 React Compiler 无法工作时

React Compiler [需要原始源代码](https://react.dev/learn/react-compiler/installation)：它必须在任何其他转换之前看到 JSX。会先重写 JSX 的插件会破坏这一点。示例：

- [`@emotion/babel-plugin`](https://emotion.sh/docs/@emotion/babel-plugin) 以及其他 `css` prop / JSX pragma 转换。
- [`@babel/plugin-transform-react-constant-elements`](https://babeljs.io/docs/babel-plugin-transform-react-constant-elements) 和 `-inline-elements`，它们会提升或内联 JSX。

这就是为什么 Oxc 会在自身的 JSX 转换之前运行 React Compiler。

违反 [React 规则](https://react.dev/reference/rules)的代码也会被跳过，而不是进行优化——例如内部可变性，或基于可观察变更构建的库（如 MobX 的 `observer()`）。

要查找这类代码，Oxlint 提供了一个实验性的 [`react/react-compiler`](../linter/rules/react/react-compiler) 规则，该规则会以仅检查模式运行相同的分析并报告违规情况。
