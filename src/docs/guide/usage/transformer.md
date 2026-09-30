# Transformer

一个高性能的 transformer，可将不受支持的语法重写为目标运行时支持的形式。

## 特性

无论选项的顺序如何，Oxc 的转换流水线都会按固定顺序运行受支持的功能：

1. **[React 编译器](./transformer/react-compiler)** — 最先运行，基于原始源代码。
2. **[TypeScript](./transformer/typescript)** — 类型剥离。
3. **[装饰器](./transformer/typescript#decorators)**。
4. **[插件](./transformer/plugins)** — 例如 styled-components。
5. **[React Refresh](./transformer/jsx#react-refresh)** — 组件插桩，在 JSX 转换之前运行。
6. **[JSX](./transformer/jsx)** — 将 JSX 转换为 JavaScript。
7. **[降级](./transformer/lowering)** — 从 ES2026 降级到 ES2015。
8. **[注入](./transformer/global-variable-replacement#inject)** — 全局变量注入。
9. **[定义](./transformer/global-variable-replacement#define)** — 全局变量替换。

`oxc-transform` 暴露第 2 至第 9 步。专用的 `oxc-transform-react` 软件包会先运行 React Compiler，然后移除 TypeScript 语法、运行 React Refresh 并转换 JSX。

Oxc 还支持在不使用 TypeScript 编译器的情况下进行 [TypeScript Isolated Declarations emit](./transformer/isolated-declarations)。

## 通用选项

`transform` 函数接受文件名、源代码以及一个选项对象：

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  // 强制指定源语言。默认根据文件名推断。
  lang: "tsx", // "js" | "jsx" | "ts" | "tsx" | "dts"

  // 将源文件视为脚本、模块或 CommonJS。默认自动推断。
  sourceType: "module", // "script" | "module" | "commonjs" | "unambiguous"

  // 当前工作目录。用于解析相对路径。
  cwd: "/path/to/project",

  // 启用 source map 生成。
  sourcemap: true,

  // 配置运行时 helper 策略。
  helpers: {
    mode: "Runtime", // "Runtime"（从 @oxc-project/runtime 导入）或 "External"（使用全局 babelHelpers）
  },

  // 更多选项请参见子页面：
  // typescript, jsx, target, assumptions, define, inject, decorator, plugins
});
```

`transform` 函数是异步的。也提供具有相同签名的同步版本 `transformSync`。

## 安装

### Node.js

- 使用 node 绑定包 [oxc-transform][url-oxc-transform-npm]。
- 在 [stackblitz](https://stackblitz.com/fork/github/oxc-project/website/tree/main/stackblitz-templates/oxc-transform) 上试用。

### Rust

使用带有 `transformer` 特性的总包 crate [oxc][url-oxc-crate]。

Rust 使用示例可[在此处](https://github.com/oxc-project/oxc/blob/main/crates/oxc_transformer/examples/transformer.rs)查看。

## 专用转换软件包

### [`oxc-transform-react`](https://npmx.dev/package/oxc-transform-react)

面向 React 的转换流水线，结合了实验性的 React Compiler、TypeScript 语法移除、JSX 转换和 React Fast Refresh。

### [`oxc-transform-relay`](https://npmx.dev/oxc-transform-relay)

Relay 转换器会将 `graphql` 标记模板替换为对 `relay-compiler` 生成的构件的引用，同时保留其他语法供下游工具使用。

## 集成

- [`unplugin-oxc`](https://npmx.dev/package/unplugin-oxc)
- [`unplugin-isolated-decl`](https://npmx.dev/package/unplugin-isolated-decl)
- [`oxc-webpack-loader`](https://npmx.dev/package/oxc-webpack-loader)

<!-- 链接 -->

[url-oxc-crate]: https://docs.rs/oxc
[url-oxc-transform-npm]: https://npmx.dev/package/oxc-transform
