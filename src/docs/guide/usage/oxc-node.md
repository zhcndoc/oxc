---
title: TypeScript 运行器
description: 使用 Oxc 在 Node.js 中直接运行 TypeScript 和 JSX。
outline: deep
---

# TypeScript 运行器

::: info 实验性功能
TypeScript 运行器处于实验阶段，正在积极开发中。API 和行为可能会在不同版本之间发生变化。
:::

[`oxc-node`](https://github.com/oxc-project/oxc-node) 是 Oxc 的 TypeScript 运行器。它无需单独的构建步骤即可运行 TypeScript 和 JSX，同时保留标准的 Node.js 命令行工作流。

该运行器提供：

- 用于运行脚本和启动 REPL 的 `oxnode` 命令。
- 可与 `node --import` 一起使用的 Node.js 注册钩子。
- 同步和异步转换 API。
- ESM 和 CommonJS 支持。
- 用于堆栈跟踪的源映射。
- `tsconfig.json` 集成。

## CLI

将 [`@oxc-node/cli`](https://npmx.dev/package/@oxc-node/cli) 安装为开发依赖：

::: code-group

```sh [npm]
$ npm add -D @oxc-node/cli
```

```sh [pnpm]
$ pnpm add -D @oxc-node/cli
```

```sh [yarn]
$ yarn add -D @oxc-node/cli
```

```sh [bun]
$ bun add -D @oxc-node/cli
```

:::

::: tip
在项目本地安装可以让团队中的运行器版本保持一致。如果希望在项目或包脚本之外调用 `oxnode`，也可以全局安装 `@oxc-node/cli`。
:::

运行 TypeScript 入口文件：

```sh
oxnode ./src/index.ts
```

参数会直接传递给 Node.js，因此监视模式等 Node.js 功能仍然可用：

```sh
oxnode --watch ./src/index.ts
```

不带脚本运行 `oxnode` 会启动 Node.js REPL。使用 `oxnode --node-help` 可显示 Node.js 命令行帮助。

如需可重复执行的项目命令，可在 `package.json` 中添加脚本：

```json [package.json]
{
  "scripts": {
    "dev": "oxnode ./src/index.ts"
  }
}
```

## Node.js 注册钩子

当你希望继续直接使用 `node` 命令时，请安装 [`@oxc-node/core`](https://npmx.dev/package/@oxc-node/core)：

::: code-group

```sh [npm]
$ npm add -D @oxc-node/core
```

```sh [pnpm]
$ pnpm add -D @oxc-node/core
```

```sh [yarn]
$ yarn add -D @oxc-node/core
```

```sh [bun]
$ bun add -D @oxc-node/core
```

:::

在加载入口点之前注册 Oxc：

```sh
node --import @oxc-node/core/register ./src/index.ts
```

由于这使用了 Node.js 的注册钩子，因此可以与其他 Node.js 命令和标志组合使用。例如，使用内置测试运行器运行 TypeScript 测试：

```sh
node --import @oxc-node/core/register --test ./test.ts
```

## 支持的文件

register hook 会转换以下扩展名：

```
.js .jsx .ts .tsx .mjs .mts .cjs .cts .es6 .es
```

模块格式根据文件扩展名、最近的 `package.json` 和 `tsconfig.json` 推断。默认情况下不会转换 `node_modules` 中的文件。设置 `OXC_TRANSFORM_ALL=1` 后也会转换这些文件。

## TypeScript 配置

运行器会从当前工作目录读取 `tsconfig.json`。设置 `OXC_TSCONFIG_PATH` 或 `TS_NODE_PROJECT` 以使用其他文件：

```sh
OXC_TSCONFIG_PATH=./config/tsconfig.dev.json oxnode ./src/index.ts
```

转换器会使用与模块格式、JSX、装饰器、类字段以及重写相对导入扩展名相关的编译器选项。转换过程中会移除 TypeScript 类型；运行器不会对你的程序进行类型检查。

## 链接

- [`oxc-node` 仓库](https://github.com/oxc-project/oxc-node)
- [`@oxc-node/cli`](https://npmx.dev/package/@oxc-node/cli)
- [`@oxc-node/core`](https://npmx.dev/package/@oxc-node/core)
