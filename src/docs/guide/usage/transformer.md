# Transformer

一个高性能的 transformer，可将不受支持的语法重写为目标运行时支持的形式。

## 特性

- [将 ESNext 降级为 ES2015。](./transformer/lowering)
- [将 TypeScript 转换为 JavaScript。](./transformer/typescript)
- [将 JSX 转换为 JavaScript，并内置 React Refresh。](./transformer/jsx)
- [内置支持 styled-components 等流行插件。](./transformer/plugins)
- [替换全局变量。](./transformer/global-variable-replacement)
- [TypeScript Isolated Declarations Emit，无需使用 TypeScript 编译器。](./transformer/isolated-declarations)

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

- 使用 node binding [oxc-transform][url-oxc-transform-npm]。
- 在 [stackblitz](https://stackblitz.com/edit/oxc-transform) 上试用。

### Rust

使用带有 `transformer` 特性的总包 crate [oxc][url-oxc-crate]。

Rust 使用示例可[在此处](https://github.com/oxc-project/oxc/blob/main/crates/oxc_transformer/examples/transformer.rs)查看。

## 集成

- [`unplugin-oxc`](https://npmx.dev/package/unplugin-oxc)
- [`unplugin-isolated-decl`](https://npmx.dev/package/unplugin-isolated-decl)
- [`oxc-webpack-loader`](https://npmx.dev/package/oxc-webpack-loader)

<!-- Links -->

[url-oxc-crate]: https://docs.rs/oxc
[url-oxc-transform-npm]: https://npmx.dev/package/oxc-transform
