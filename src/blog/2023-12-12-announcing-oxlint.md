---
title: Oxlint 正式发布
outline: deep
authors:
  - boshen
---

<AppBlogPostHeader />

<Alert type="info">

**本文宣布 Oxlint 的初始正式发布版本。** 对于具有更多显著功能和改进的最新稳定版本，请参阅 [Oxlint v1.0 稳定版公告](/blog/2025-06-10-oxlint-stable)。

</Alert>

我们很高兴地宣布 oxlint 现在正式发布了！
这一里程碑标志着我们团队能够及时处理和甄别问题。

Oxlint 是一个 JavaScript linter，旨在捕获错误或无用的代码，默认情况下无需任何配置。

## 如何使用

在这个阶段，oxlint **并非旨在完全取代 ESLint**；当 ESLint 的速度成为工作流中的瓶颈时，它可作为一种增强手段。

为了更快的反馈循环，我们建议在 lint-staged 或 CI 设置中先运行 oxlint 再运行 ESLint，因为它在大型代码库上运行只需几秒钟。

要在您的 JavaScript / TypeScript 代码库中测试 oxlint，只需在仓库的根目录执行以下命令：

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

或者，参考 [安装指南](/docs/guide/usage/linter) 获取详细说明。

## 设计

### 比 ESLint 快 50-100 倍

在实际场景中，Shopify 报告称他们原本需要 75 分钟的 CI ESLint 运行现在只需 10 秒。

来自 Shopify DX 兼 Preact 创作者 Jason Miller：

> oxlint 对我们在 Shopify 来说是一个巨大的胜利。我们之前的 lint 设置运行需要 75 分钟，所以我们在 CI 中将其分散到 40+ 个 worker 上。
>
> 相比之下，oxlint 在单个 worker 上 lint 相同的代码库只需大约 10 秒，且输出更易于理解。
>
> 我们在迁移时甚至发现了一些被旧设置隐藏或跳过的问题！

大部分性能提升源于 Oxlint 专为性能而设计，利用 Rust 和并行处理作为关键因素。

### 专注于正确性的 Lint

Oxlint 默认旨在识别错误、冗余或令人困惑的代码——优先保证正确性，而不是不必要的吹毛求疵的规则（分类为 `perf`、`suspicious`、`pedantic` 或 `style`），这些规则默认是禁用的。

### 易于使用

设置新的 JavaScript / TypeScript 代码库正变得日益复杂。
很有可能遇到工具之间的兼容性问题，从而导致浪费数小时的时间。

这就是为什么我们将 oxlint 设计为开箱即用的零配置；甚至不需要 Node.js。
大多数调整可以通过命令行完成，读取 ESLint 配置文件的功能目前正在进行中。

### 增强的诊断信息

理解 linter 消息可能具有挑战性。
Oxlint 旨在通过定位根本原因并提供有帮助的消息来简化这一点——消除了阅读冗长规则文档的需要，节省宝贵时间。

在 [vscode 仓库](https://github.com/microsoft/vscode) 中运行 `oxlint -D perf`：

<img width="100%" src="https://github.com/oxc-project/oxc/assets/1430279/094a3b24-0433-42ae-aad2-48a7dec2b985" >

### 整合的规则

Oxlint 尚未提供插件系统，但我们正在积极整合来自流行插件的规则，如 TypeScript、React、Jest、Unicorn、JSX-a11y 和 Import。

我们认识到插件在 JavaScript 生态系统中的重要性，并且也在调查基于 DSL 的插件系统。

不过，您可能会欣赏独立的 linter——无需管理插件依赖列表，
浏览 [兼容性问题](https://github.com/antfu/eslint-ts-patch)，
或 [因版本限制而使用分支插件](https://github.com/import-js/eslint-plugin-import/pull/2504#issuecomment-1191057877)。

---

祝您 lint 愉快，节日快乐！

要开始使用，请遵循 [安装指南](/docs/guide/usage/linter)，
了解更多关于 [oxc 项目](/docs/guide/introduction.html)，
或在 [Hacker News](https://news.ycombinator.com/item?id=38652887) 上讨论。
