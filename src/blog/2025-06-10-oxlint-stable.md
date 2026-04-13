---
title: Oxlint v1.0 稳定版
outline: deep
authors:
  - boshen
  - cameron
canonical: https://voidzero.dev/posts/announcing-oxlint-1-stable
---

<AppBlogPostHeader />

<br>

:::info

这篇博客文章 [最初发布在 VoidZero 网站上](https://voidzero.dev/posts/announcing-oxlint-1-stable)。

:::

<br>

TL;DR: Oxlint 的第一个稳定版本已发布！与 ESLint 相比，性能提升了 [50~100 倍](#benchmark)，支持超过 500 条 ESLint 规则，并在 [主要公司的使用情况](#real-world-impact) 中得到验证，如 Shopify、Airbnb 和 Mercedes-Benz，你应该试一试。[立即开始](#quick-start)。

---

Oxlint 是一个基于 Rust 的 JavaScript 和 TypeScript 代码检查工具，旨在快速且易于采用。自 2023 年 12 月首次宣布以来，Oxlint 经历了显著的改进，现在发布了其第一个稳定版本 1.0。
除了稳定版本发布外，我们还想宣布 Oxlint 拥有一位专职维护者 [Cameron](https://github.com/camc314)，以及一个不断壮大的核心团队致力于维护和改进该代码检查工具。

## 实际影响

我们对 Oxlint 的性能及其对真实大规模代码库的影响感到非常自豪，这降低了 CI 成本。

我们感谢 [5,200 名早期采用者](https://github.com/oxc-project/oxc/network/dependents) 以及以下公司和项目：

- **Shopify**，其前端平台团队在 Shopify 管理控制台中使用 Oxlint。
- **Airbnb**，他们在 126,000+ 个文件上使用多文件分析 [oxc/no-barrel-file](https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file.html) 和 [import/no-cycle](https://oxc.rs/docs/guide/usage/linter/rules/import/no-cycle.html)，在 CI 上仅需 7 秒即可完成。ESLint 对这些规则的实现会超时。
- [**Mercedes-Benz**](https://www.mercedes-benz.io/blog/2025-05-16-how-can-modern-tooling-save-mercedes-benz-io-engineering-time)，他们观察到从 ESLint 切换到 Oxlint 后，lint 时间减少了 71%，某些项目甚至看到了高达 97% 的加速。
- 大型开源项目，从 [Bun](https://github.com/oven-sh/bun/blob/main/oxlint.json) 等运行时到 [Preact](https://github.com/preactjs/preact/blob/main/oxlint.json) 等框架。

在我们发现的最大的仓库上，Oxlint 报告：

```
Finished in 22.5s on 264925 files with 101 rules using 10 threads.
```

基于发布在 [X](https://x.com/boshen_c/status/1928264877115597053) 和 [Bluesky](https://bsky.app/profile/boshen.github.io/post/3lqe47xi47c2e) 上的真实案例，
Oxlint 的运行速度约为每秒 10,000 个文件，具体取决于使用的线程总数。

## 快速开始

Oxlint 非常适合那些希望开始检查代码而不想花费数小时配置工具的开发者。无需任何设置，你可以立即开始发现问题：

**运行它，无需配置。**

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

虽然不需要任何设置或配置，但 Oxlint 可以通过 `.oxlintrc.json` 文件进行配置，这对于大型项目或需要更多定制的项目非常有用。
此配置格式基于 ESLint v8 的平面配置（flat config），使得迁移变得简单且熟悉。
每个源文件都使用最近的适用配置进行 lint，你可以使用覆盖（overrides）来 targeting 特定的 glob 模式。
你还可以扩展共享配置以保持团队一致性。

对于已经使用 ESLint 的项目，可以使用 [oxlint-migrate](https://github.com/oxc-project/oxlint-migrate) 将现有的 ESLint flat-config 文件迁移到 Oxlint。
此外，[eslint-plugin-oxlint](https://npmx.dev/package/eslint-plugin-oxlint) 可以在同时使用两个代码检查工具时禁用重叠的 ESLint 规则。
建议运行 `oxlint && eslint` 以受益于 Oxlint 更快的反馈周期。

有关如何使用 Oxlint 并将其与你的项目或编辑器集成的更详细说明，请查看 [安装指南](https://oxc.rs/docs/guide/usage/linter)。

## 版本管理

与发布运行时代码的库不同，代码检查工具只更改其返回的诊断信息。Oxlint 遵循语义化版本：

- 补丁版本：仅修复错误。
- 次要版本：扩展规则覆盖范围和诊断信息，无需更改配置。
- 主要版本：CLI 或配置更改，可能需要迁移。
  请注意，如果新添加的规则发现了以前隐藏的问题，次要版本仍然可能会破坏你的 CI。在我们的 [版本管理指南](https://oxc.rs/docs/guide/usage/linter/versioning) 中了解更多。

## 亮点

### 全面的规则覆盖

Oxlint 包含来自各种来源的超过 500 条规则：

- 完整的 ESLint 规则集，包括来自 `typescript-eslint` 的 TypeScript 特定规则（不包括类型检查规则）。
- 来自 `eslint-plugin-unicorn`、`eslint-plugin-jsdoc`、`eslint-plugin-react`、`eslint-plugin-react-hooks`、`eslint-plugin-jest` 和 `eslint-plugin-import` 的流行插件规则
- 独特的 Oxlint 规则，如 [错误比较序列](https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-comparison-sequence)、[常量比较](https://oxc.rs/docs/guide/usage/linter/rules/oxc/const-comparisons) 和 [仅在递归中使用](https://oxc.rs/docs/guide/usage/linter/rules/oxc/only-used-in-recursion)

### 灵活的配置

通过 `.oxlintrc.json` 文件配置 Oxlint，支持：

- 适用于特定目录的嵌套配置
- 针对特定文件类型或位置的覆盖模式
- 共享配置扩展以保持团队一致性

### 编辑器集成

一流的编辑器支持，扩展包括：

- [VS Code](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
- [IntelliJ IDEA 和 WebStorm](https://plugins.jetbrains.com/plugin/27061-oxc)
- [Zed Editor](https://zed.dev/extensions?query=oxc)
- 其他编辑器的语言服务器协议支持

### 有用的诊断信息

Oxlint 旨在提供清晰、可操作的错误消息——不仅描述问题，还将其可视化并建议如何修复。

![CLI 演示](https://github.com/oxc-project/oxc/assets/1430279/094a3b24-0433-42ae-aad2-48a7dec2b985)
_Oxlint 在终端中运行，带有详细的错误报告_

## 基准测试

我们的 [基准测试](https://github.com/oxc-project/bench-javascript-linter) 显示，在相同设置下，Oxlint 比 ESLint 快约 50~100 倍。

| 工具          | 时间     |
| ------------- | -------- |
| oxlint (多线) | 615.3 ms |
| oxlint (单线) | 1.840 s  |
| eslint        | 33.481 s |

## 路线图

Oxlint 1.0 只是一个开始！虽然它已稳定，但我们仍计划在未来版本中提供重要的功能和改进：

**自定义规则** – JavaScript 插件支持即将推出，使团队能够编写与 Oxlint 架构无缝集成的自定义规则。

**性能优化** – 持续改进解析和分析速度。

**细粒度（每个 glob）配置** - ESLint v9 配置

## 致谢

Oxlint 1.0 代表了 [超过 200 位贡献者](https://github.com/oxc-project/oxc/graphs/contributors) 的共同努力，他们塑造了这个项目。我们感谢每一个错误报告、功能请求和代码贡献。

特别感谢：

- [@branchseer](https://github.com/branchseer) 实现了多文件分析运行时。
- [@camc314](https://github.com/camc314)、[@mysteryven](https://github.com/mysteryven) 和 [@shulaoda](https://github.com/shulaoda) 实现了许多复杂的 lint 规则、测试，并不断改进一切。
- [@camchenry](https://github.com/camchenry) 实现了嵌套配置支持。
- [@DonIsaac](https://github.com/DonIsaac) 改进了配置、文档和网站，并在 [SquiggleConf 2024](https://2024.squiggleconf.com) 上代表 Oxc。
- [@leaysgur](https://github.com/leaysgur) 开发了 RegExp 解析器和 JSDoc 插件。
- [@Sysix](https://github.com/Sysix) 维护 `eslint-plugin-oxlint` 并对语言服务器和 VSCode 扩展做出了重大贡献。
- [@u9g](https://github.com/u9g) 和 [@rzvxa](https://github.com/rzvxa) 实现了控制流图分析。

## 加入社区

我们很乐意听取你对 Oxlint 的反馈，并很高兴看到它如何帮助改善你的开发工作流。与我们联系：

- **Discord**：加入我们的 [社区服务器](https://discord.gg/9uXCAwqQZW) 进行实时讨论
- **GitHub**：在 [GitHub 讨论区](https://github.com/oxc-project/oxc/discussions) 分享反馈
- **Issues**：在我们的 [问题追踪器](https://github.com/oxc-project/oxc/issues) 上报告错误或请求功能

你的反馈推动着 Oxlint 的演进。

## 试一试

要开始使用，请遵循 [安装指南](https://oxc.rs/docs/guide/usage/linter)，或了解更多关于 [Oxc 项目](https://oxc.rs/docs/guide/introduction) 的信息。
