---
title: "快速开始 | Oxfmt"
description: 安装 Oxfmt 并了解常见工作流。
---

# 快速开始

推荐的设置和常见工作流。

## 安装

将 `oxfmt` 安装为开发依赖：

::: code-group

```sh [npm]
$ npm add -D oxfmt
```

```sh [pnpm]
$ pnpm add -D oxfmt
```

```sh [yarn]
$ yarn add -D oxfmt
```

```sh [bun]
$ bun add -D oxfmt
```

:::

将脚本添加到 `package.json`：

```json [package.json]
{
  "scripts": {
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

格式化文件：

::: code-group

```sh [npm]
npm run fmt
```

```sh [pnpm]
pnpm run fmt
```

```sh [yarn]
yarn run fmt
```

```sh [bun]
bun run fmt
```

:::

检查格式化而不写入文件：

::: code-group

```sh [npm]
npm run fmt:check
```

```sh [pnpm]
pnpm run fmt:check
```

```sh [yarn]
yarn run fmt:check
```

```sh [bun]
bun run fmt:check
```

:::

## 用法

```sh
oxfmt [OPTIONS] [PATH]...
```

不带参数运行 `oxfmt` 会格式化当前目录（相当于 `prettier --write .`）。

不支持像 `--no-semi` 这样的 CLI 选项。请使用配置文件来确保 CLI 和编辑器集成之间的设置一致。

要在位置路径中使用 glob 模式，请务必将它们用引号括起来。否则，它们可能会也可能不会根据您的环境进行展开。

有关选项的完整列表，请参阅 [CLI 参考](/docs/guide/usage/formatter/cli.html)。

## 常见工作流

### 与 lint-staged 一起进行预提交

```json [package.json]
{
  "lint-staged": {
    "*": "oxfmt --no-error-on-unmatched-pattern"
  }
}
```

`--no-error-on-unmatched-pattern` 在没有文件匹配模式时防止报错。

### 创建配置文件

使用默认值初始化 `.oxfmtrc.json`：

```sh
oxfmt --init
```

### 从 Prettier 迁移

```sh
oxfmt --migrate prettier
```

详见 [从 prettier 迁移](./migrate-from-prettier)。

### 列出不同的文件

```sh
oxfmt --list-different
```

这对于配置 [要忽略的文件](./ignore-files) 很有用。

### 管道传输文件内容

```sh
echo 'const   x   =   1' | oxfmt --stdin-filepath test.ts
```

输出 `const x = 1;`

### Node.js API

```ts
import { format, type FormatOptions } from "oxfmt";

const input = `let a=42;`;
const options: FormatOptions = {
  semi: false,
};

const { code } = await format("a.js", input, options);
console.log(code); // "let a = 42"
```

## 下一步

- [更改配置](./config)
- [设置编辑器](./editors)
- [设置 CI](./ci)
- 学习高级功能：[排序](./sorting)、[嵌入格式化](./embedded-formatting)
- [兼容性矩阵](/compatibility)
- 查看 [CLI 参考](./cli)
