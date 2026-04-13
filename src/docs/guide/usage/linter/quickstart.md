---
title: 快速开始
description: 安装 Oxlint 并学习常见的工作流程。
---

# 快速开始

本页展示了 Oxlint 的推荐设置和最常见的工作流程，并提供可复制粘贴的命令。

## 安装

将 `oxlint` 安装为开发依赖：

::: code-group

```sh [npm]
$ npm add -D oxlint
```

```sh [pnpm]
$ pnpm add -D oxlint
```

```sh [yarn]
$ yarn add -D oxlint
```

```sh [bun]
$ bun add -D oxlint
```

:::

将 lint 命令添加到 `package.json`：

```json [package.json]
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix"
  }
}
```

运行它：

::: code-group

```sh [npm]
npm run lint
```

```sh [pnpm]
pnpm run lint
```

```sh [yarn]
yarn run lint
```

```sh [bun]
bun run lint
```

:::

应用修复：

::: code-group

```sh [npm]
npm run lint:fix
```

```sh [pnpm]
pnpm run lint:fix
```

```sh [yarn]
yarn run lint:fix
```

```sh [bun]
bun run lint:fix
```

:::

## 用法

有关选项的完整列表，请参阅 [CLI 参考](/docs/guide/usage/linter/cli.html)。

```sh
oxlint [OPTIONS] [PATH]...
```

如果省略 `PATH`，Oxlint 将对当前工作目录进行 lint 检查。

## 常见工作流程

### 使用 [lint-staged](https://npmx.dev/package/lint-staged) 进行 Pre-commit

::: code-group

```json [npm]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": "npm run lint"
  }
}
```

```json [pnpm]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": "pnpm run lint"
  }
}
```

```json [yarn]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": "yarn run lint"
  }
}
```

```json [bun]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": "bun run lint"
  }
}
```

:::

### 创建配置文件

使用默认值初始化 `.oxlintrc.json` 配置：

```sh
oxlint --init
```

然后根据需要自定义 `.oxlintrc.json`。请参阅 [配置](/docs/guide/usage/linter/config)。

或者，Oxlint 支持名为 `oxlint.config.ts` 的 TypeScript 配置文件。详见 [配置](/docs/guide/usage/linter/config#typescript-config)。

然后运行 Oxlint：

```sh
oxlint
```

::: tip
如果你是从 ESLint 迁移过来的，请参阅 [“从 ESLint 迁移”页面](/docs/guide/usage/linter/migrate-from-eslint) 获取详细的迁移指南。
:::

### 修复问题

应用安全修复：

```sh
oxlint --fix
```

应用建议（可能会改变程序行为）：

```sh
oxlint --fix-suggestions
```

应用危险修复和建议：

```sh
oxlint --fix-dangerously
```

请参阅 [自动修复](/docs/guide/usage/linter/automatic-fixes) 了解何时使用每种模式的指南。

### 忽略文件

使用显式的忽略文件：

```sh
oxlint --ignore-path .oxlintignore
```

从命令行添加忽略模式：

```sh
oxlint --ignore-pattern "dist/**" --ignore-pattern "*.min.js"
```

禁用忽略处理：

```sh
oxlint --no-ignore
```

请参阅 [忽略文件](/docs/guide/usage/linter/ignore-files)。

### 确保 CI 可靠失败

仅报告错误：

```sh
oxlint --quiet
```

如果发现任何警告则失败：

```sh
oxlint --deny-warnings
```

如果警告超过阈值则失败：

```sh
oxlint --max-warnings 0
```

请参阅 [CI 设置](/docs/guide/usage/linter/ci)。

### 使用机器可读输出

选择输出格式：

```sh
oxlint -f json
```

可用格式包括：`default`、`json`、`unix`、`checkstyle`、`github`、`gitlab`、`junit` 和 `stylish`。详见 [输出格式](/docs/guide/usage/linter/output-formats)。

### 检查有效配置

打印将用于文件的配置：

```sh
oxlint --print-config path/to/file.ts
```

### 列出可用规则

列出已注册的规则，包括当前 Oxlint 配置启用的规则：

```sh
oxlint --rules
```

完整列表位于 [规则参考](/docs/guide/usage/linter/rules)。

## 下一步

- 配置规则、插件和忽略项：[配置](/docs/guide/usage/linter/config)
- [设置编辑器](/docs/guide/usage/linter/editors)
- [设置 CI](/docs/guide/usage/linter/ci)
- 学习高级功能：[多文件分析](/docs/guide/usage/linter/multi-file-analysis)、[类型感知 lint](/docs/guide/usage/linter/type-aware)、[JS 插件](/docs/guide/usage/linter/js-plugins)
- 迁移：[从 ESLint 迁移](/docs/guide/usage/linter/migrate-from-eslint) <!-- , [从 Biome 迁移](/docs/guide/usage/linter/migrate-from-biome) -->
- [兼容性矩阵](/compatibility)
- [CLI 参考](/docs/guide/usage/linter/cli)
