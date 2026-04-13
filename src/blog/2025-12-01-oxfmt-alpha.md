---
title: "Oxfmt: Oxc 格式化器 Alpha 版"
outline: deep
authors:
  - boshen
  - Dunqing
  - leaysgur
---

<AppBlogPostHeader />

<Alert type="info">

**本文宣布 Oxfmt 的 Alpha 版本发布。** Oxfmt 此后已达到 Beta 版！请参阅 [Oxfmt Beta 版本公告](/blog/2026-02-24-oxfmt-beta) 以了解最新功能和改进。

</Alert>

我们很高兴宣布 **Oxfmt** 的 Alpha 版本发布，这是一个基于 Rust 构建的、兼容 Prettier 的代码格式化器。首个版本专注于 JavaScript 和 TypeScript，对其他语言的支持即将推出。

Oxfmt 的设计旨在实现以下目标：

- **性能：** 初次运行无缓存情况下，比 Prettier 快 30 倍以上，比 Biome 快 3 倍以上（[**基准测试**](https://github.com/oxc-project/bench-formatter)）。
- **兼容性：** 兼容 Prettier，因此您可以轻松在现有项目中采用 Oxfmt。
- **开发者体验：** 即将推出的功能包括导入排序、扩展格式化选项以及对 Prettier 插件的支持。

## **快速开始**

将 `oxfmt` 添加到您的项目：

::: code-group

```sh [npm]
npm add -D oxfmt@latest
```

```sh [pnpm]
pnpm add -D oxfmt@latest
```

```sh [yarn]
yarn add -D oxfmt@latest
```

```sh [bun]
bun add -D oxfmt@latest
```

```sh [deno]
deno add -D npm:oxfmt@latest
```

:::

Oxfmt 遵循 Prettier 的配置格式。如果您使用 JSON 配置文件运行 Prettier，可以将其重命名为 `.oxfmtrc.jsonc`：

```bash
cp .prettierrc.json .oxfmtrc.jsonc
```

您也可以从这个 `.oxfmtrc.jsonc` 配置示例开始：

```jsx
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  // 如果从 Prettier 迁移请使用 80；100 是 Oxfmt 的默认值！
  "printWidth": 80,
  "ignorePatterns": [] // 与 `.prettierignore` 相同
}
```

接下来，将 `oxfmt` 添加到您的 package.json scripts 中：

```jsx
"scripts": {
  "format": "oxfmt"
}
```

或者，参阅 [安装指南](/docs/guide/usage/formatter.html) 获取详细说明。

## 性能

Oxfmt 速度极快。我们在 [Outline](https://github.com/outline/outline) 仓库上的基准测试结果显示：

- 比无缓存的 Prettier 实验性 CLI 快 30 倍以上
- 比通过 `@prettier/plugin-oxc` 使用 Oxc 解析器的 Prettier 快 20 倍以上
- 比另一个基于 Rust 的格式化器 Biome 快 3 倍以上

有关详细的基准测试设置，请参阅以下仓库：

> oxc-project/bench-formatter\
> https://github.com/oxc-project/bench-formatter

## 设计

Oxc 团队优先考虑与现有生态系统的兼容性，使得迁移变得简单直接，即使是大型代码库。

### 代码格式化结果

Oxfmt 与 Prettier 的 JavaScript 格式化结果一致。如果您今天迁移到 Oxfmt，与 Prettier 相比应该不会看到任何格式化差异。

从较旧版本的 Prettier 迁移时，您可能会看到细微差异（[参见迁移示例](https://github.com/SBoudrias/Inquirer.js/pull/1912)），因为我们发现了 Prettier 格式化可以改进的地方。我们一直积极与 Prettier 团队合作，直接向 Prettier 提交错误报告和拉取请求。其中许多改进已纳入最近的 [Prettier 3.7](https://prettier.io/blog/2025/11/27/3.7.0) 版本中。

Oxfmt 目前通过了大约 [95%](https://github.com/oxc-project/oxc/tree/main/tasks/prettier_conformance/snapshots) 的 Prettier JavaScript 和 TypeScript 测试，我们希望随着时间的推移与 Prettier 团队共同努力，使格式化结果趋于一致。

### 默认 `printWidth: 100`

我们选择 `printWidth: 100` 作为默认行长度，而不是 Prettier 的 `80`。我们的原因包括：

- TypeScript 代码由于类型注释往往比 JavaScript 更长。
- 导入语句通常包含许多项。
- 更大的屏幕提供更多的水平空间。
- 产生的 LLM tokens 略少。

虽然 Oxfmt 保持与 Prettier 兼容，但它使用不同的默认打印宽度 100 个字符。如果您想在从 Prettier 迁移时避免大的差异，请显式将打印宽度设置为 80。

### `ignorePatterns`

虽然 Oxfmt 支持 `.prettierignore`，但它也支持 `ignorePatterns` 配置选项，以便将所有配置合并到一个文件中。

### 配置

Prettier JSON 配置文件与 Oxfmt 兼容。在最简单的情况下，迁移配置如下所示：

```bash
cp .prettierrc.json .oxfmtrc.jsonc
```

如果您的编辑器支持 JSON 语言服务器，您可以在将 `oxfmt` 添加到 `devDependencies` 后使用此最小模板：

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "ignorePatterns": []
}
```

虽然在此 Alpha 版本中我们尚未支持 Prettier 的所有配置选项，但我们支持以下主要选项：`printWidth`、`tabWidth`、`useTabs`、`semi`、`singleQuote`、`quoteProps`、`jsxSingleQuote`、`trailingComma`、`bracketSpacing`、`objectWrap`、`bracketSameLine`、`arrowParens`、`endOfLine` 和 `singleAttributePerLine`。

在我们的 [文档](https://oxc.rs/docs/guide/usage/formatter.html#configuration-file) 中查看所有选项。

### 终端输出

Oxfmt 的默认行为等同于 `prettier . --write`，提供与 `cargo fmt` 相同的用户体验且不产生输出。您可以使用 `--check` 来显示格式化差异并在 CI 流程中强制使用 oxfmt。

## Beta 版本发布计划

以下是我们对 Beta 版本的计划：

- [支持更多文件格式](https://github.com/oxc-project/oxc/issues/15899) - 如 `.json` 文件
- [添加对嵌入式语言格式化的支持](https://github.com/oxc-project/oxc/issues/15180) - js 中的 css 或 js 中的 graphql
- [内置排序和美学功能](https://github.com/oxc-project/oxc/issues/13610)，例如 [导入排序](https://github.com/oxc-project/oxc/issues/14253)
- [Prettier 插件](https://github.com/oxc-project/oxc/issues/15665)
- [Oxfmt 的 Node.js API](https://github.com/oxc-project/oxc/issues/15913)
- [禁用文件末尾的换行符](https://github.com/oxc-project/oxc/issues/15066)
- [`--migrate prettier`](https://github.com/oxc-project/oxc/issues/15849)
- _… 以及您的功能请求_

您可以在此处跟踪我们迈向 Beta 版本的进度：

> Formatter Beta · Milestone #15 · oxc-project/oxc\
> https://github.com/oxc-project/oxc/milestone/15

我们还计划在未来版本中放宽一些格式化意见。

## 下一步

请在 [Oxfmt 文档](https://oxc.rs/docs/guide/usage/formatter.html) 中查看完整的安装指南。

### 报告问题

对于格式化差异，请参阅 [https://github.com/oxc-project/oxc/discussions/14669](https://github.com/oxc-project/oxc/discussions/14669)。
此外，已知问题通过 [标签](https://github.com/oxc-project/oxc/issues?q=sort%3Aupdated-desc%20is%3Aissue%20label%3AA-formatter-prettier-diff) 区分。

如果您发现任何其他问题，请在 GitHub 上使用 [专用模板](https://github.com/oxc-project/oxc/issues/new?template=formatter_diff_report.yaml) 创建问题。

### 加入社区

> RFC: Formatter · oxc-project/oxc · Discussion #13608\
> https://github.com/oxc-project/oxc/discussions/13608

我们欢迎您的反馈，帮助使 Oxfmt 变得更好！

## 致谢

Oxfmt 基于 [`biome_formatter`](https://github.com/biomejs/biome/tree/main/crates/biome_formatter) 基础设施的 fork 构建，我们要感谢 Biome 团队，尤其是 [@ematipico](https://github.com/ematipico) 和 [@MichaReiser](https://github.com/MichaReiser)。我们还要感谢 Prettier 团队和 [@fisker](https://github.com/fisker) 在格式化兼容性方面与我们合作。
