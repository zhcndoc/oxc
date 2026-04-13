---
title: Oxlint Beta 版
outline: deep
authors:
  - boshen
  - camchenry
---

<AppBlogPostHeader />

<Alert type="info">

**本文宣布 Oxlint 的 Beta 版本发布。** Oxlint 此后已达到 v1.0 稳定版！请参阅 [Oxlint v1.0 稳定版公告](/blog/2025-06-10-oxlint-stable) 以了解最新功能和改进。

</Alert>

我们很高兴地宣布，经过社区一年多的开发，Oxlint 现已进入 Beta 发布阶段！

这个里程碑代表着在功能完整性、性能和稳定性方面迈出了重要的一步。

## 如何使用

在这个阶段，Oxlint 可用于在中小型项目中完全替代 ESLint。

对于大型项目，我们的建议是通过 [eslint-plugin-oxlint](https://npmx.dev/package/eslint-plugin-oxlint) 关闭 ESLint 规则，
并在本地或 CI 设置中在 ESLint 之前运行 Oxlint，以获得更快的反馈循环。

要在代码库中测试 Oxlint，您可以在代码库根目录使用您选择的包管理器：

::: code-group

```sh [npm]
$ npx oxlint@latest
```

```sh [pnpm]
$ pnpm dlx oxlint@latest
```

```sh [yarn]
$ yarn dlx oxlint@latest
```

```sh [bun]
$ bunx oxlint@latest
```

```sh [deno]
$ deno run npm:oxlint@latest
```

:::

有关如何使用 Oxlint 并将其与您的项目或编辑器集成的更详细说明，请查看 [安装指南](/docs/guide/usage/linter)。

## 自正式发布以来的新功能亮点

- 显著的性能改进，与上一个版本相比速度最快提升两倍
- 内置超过 500 条规则，无需额外安装
- 来自 `typescript`、`unicorn`、`react`、`react-perf`、`nextjs`、`import`、`jsdoc`、`jsx-a11y`、`node`、`promise`、`jest`、`vitest` 插件的许多规则现已完成。
- 支持通过 [`.oxlintrc.json` 文件](/docs/guide/usage/linter/nested-config.html#configuration-file-format) 进行配置，包括 [嵌套配置文件](/docs/guide/usage/linter/nested-config.html)，使用 `extends` 在文件间共享配置，对特定文件应用 `overrides` 等。
- 支持对 `.astro`、`.svelte` 和 `.vue` 文件中的 `<script>` 内容进行 lint 检查，无需额外配置。
- 允许对文件应用 [自动修复](/docs/guide/usage/linter/automatic-fixes.html) 和建议。

## 更多规则，更高性能

我们专注于使 Oxlint 功能更完整，支持许多最常用的 ESLint 规则和插件，同时也使 Oxlint 速度更快。

第一个 [Oxlint 正式发布 (GA) 版本](./2023-12-12-announcing-oxlint.md) 总共有 205 条规则，其中 70 条默认启用。此 Beta 版本现在总共包含 502 条规则，其中 99 条默认启用（默认启用的规则数量增加了 41%）。

| 规则类型     | 规则数量 (GA) | 规则数量 (beta) | 增加            |
| ------------ | ------------- | --------------- | --------------- |
| 默认规则     | 70            | 99              | +29 条规则      |
| 正确性       | 88            | 173             | +88 条规则      |
| 性能         | 0             | 9               | +9 条规则       |
| 限制         | 15            | 64              | +49 条规则      |
| 严格         | 43            | 79              | +36 条规则      |
| 风格         | 38            | 137             | +99 条规则      |
| 可疑         | 7             | 28              | +21 条规则      |
| **规则总数** | 205           | **502**         | **+297 条规则** |

尽管添加了许多默认启用的新规则，Oxlint 现在的速度比以往任何时候都快。以下是一些流行仓库的 [基准测试](https://gist.github.com/camchenry/cb09f6fae14ec1e3df1f72938b7350c8)：

| 仓库                | 文件数量 | Lint 时间 (GA) | Lint 时间 (beta) | 加速      |
| ------------------- | -------- | -------------- | ---------------- | --------- |
| `elastic/kibana`    | 68,591   | 6.02s          | **3.11s**        | **1.94x** |
| `microsoft/vscode`  | 5,703    | 1.697s         | **0.792s**       | **2.14x** |
| `vitest-dev/vitest` | 1,732    | 105ms          | **50ms**         | **2.1x**  |
| `vuejs/core`        | 1,063    | 217ms          | **89ms**         | **2.44x** |

## 路线图

Oxlint 最受请求的功能之一是对现有自定义 ESLint 插件的支持。我们一直忙于为此功能准备先决条件，并启用用 JavaScript 编写的快速 linter 插件。我们希望在下一次主要发布时提供此功能，并在不久的将来分享更多关于它的信息。

我们还计划继续改进 IDE/编辑器集成，更好地支持 VSCode、Zed、`coc.nvim` 和 IntelliJ 插件。

## 致谢

如果没有超过 200 名项目贡献者，Oxlint Beta 版本是不可能实现的。

特别感谢：

- [@cam314](https://github.com/camc314)、[@mysteryven](https://github.com/mysteryven) 和 [@shulaoda](https://github.com/shulaoda) 用于实现许多复杂的 lint 规则、测试，并不断改进一切。
- [@Sysix](https://github.com/Sysix) 用于维护 `eslint-plugin-oxlint`。
- [@DonIsaac](https://github.com/DonIsaac) 用于改进配置、文档和网站，并代表 Oxc 参加 [SquiggleConf 2024](https://2024.squiggleconf.com)。
- [@leaysgur](https://github.com/leaysgur) 用于 RegExp 解析器和 JSDoc 插件。
- [@u9g](https://github.com/u9g) 和 [@rzvxa](https://github.com/rzvxa) 用于实现控制流图分析。
- [@branchseer](https://github.com/branchseer) 用于实现多文件分析运行时。
- [@camchenry](https://github.com/camchenry) 用于实现嵌套配置支持。
