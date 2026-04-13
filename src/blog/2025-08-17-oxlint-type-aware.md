---
title: Oxlint 类型感知预览
outline: deep
authors:
  - boshen
  - auvred
  - camchenry
  - cameron
---

<AppBlogPostHeader />

<Alert type="info">

**本文宣布类型感知 linting 的技术预览版。** 对于具有改进稳定性、可配置性和规则覆盖面的最新 alpha 版本，请参阅 [类型感知 Linting Alpha 公告](/blog/2025-12-08-type-aware-alpha)。

</Alert>

<br>

我们很高兴宣布 `oxlint` 中的类型感知 linting！

期待已久的 `no-floating-promises` 及相关规则现已到来。

此预览版旨在通过记录我们的决策过程和技术细节，与社区进行协作和讨论。

## 快速开始

如果已配置 `oxlint`，请安装 `oxlint-tsgolint` 并使用 `--type-aware` 标志运行 `oxlint`：

```bash
pnpm add -D oxlint-tsgolint@latest
pnpm dlx oxlint --type-aware
```

如果未配置 `oxlint` 但想查看 `no-floating-promises` 的实际效果：

```bash
pnpm add -D oxlint-tsgolint@latest
pnpm dlx oxlint@latest --type-aware -A all -D typescript/no-floating-promises
```

例如，我们将看到：

```js
 × typescript-eslint(no-floating-promises): Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the `void` operator.
   ╭─[packages/rolldown/src/api/watch/watcher.ts:30:7]
29 │       await this.close();
30 │       originClose();
   ·       ──────────────
31 │     };
   ╰────
```

请访问我们的 [使用指南](https://oxc.rs/docs/guide/usage/linter.html) 了解更多配置选项。

## 性能

我们的测试显示，以前使用 `typescript-eslint` 需要一分钟才能运行的仓库，现在不到 10 秒即可完成。

这是通过利用 [`typescript-go`](https://github.com/microsoft/typescript-go) 实现的，
它是用 Go 编写的 [速度提升 10 倍的 TypeScript](https://devblogs.microsoft.com/typescript/typescript-native-port)。

使用来自 [oxc-ecosystem-ci](https://github.com/oxc-project/oxc-ecosystem-ci) 的项目：

| 项目     | 文件 | 时间 |
| -------- | ---- | ---- |
| napi-rs  | 144  | 1.0s |
| preact   | 245  | 2.7s |
| rolldown | 314  | 1.5s |
| bluesky  | 1152 | 7.0s |

## 类型感知 Linting

请参考
[基于 Rust 的 JavaScript Linter：速度快，但目前没有类型化 Linting](https://www.joshuakgoldberg.com/blog/rust-based-javascript-linters-fast-but-no-typed-linting-right-now)
以了解生态系统中类型感知 linting 的当前状态。

## 技术细节

此新功能的核心是 [oxc-project/tsgolint](https://github.com/oxc-project/tsgolint)。

`tsgolint` 项目最初作为 [typescript-eslint/tsgolint](https://github.com/typescript-eslint/tsgolint) 进行原型设计。
然而，`typescript-eslint` 团队决定不为该原型分配开发资源，因为他们计划继续致力于使用 ESLint 进行类型化 linting 的 `typescript-eslint` 工作。

[@boshen](https://github.com/Boshen) 联系了 [@auvred](https://github.com/auvred)，希望获得一个针对 oxlint 适配的、范围缩小的分支版本。
此版本将仅包含类型感知规则，而不需要完整 linter 所需的复杂配置解析。

[@auvred](https://github.com/auvred) 慷慨地提出在 Oxc 组织下继续其开发工作。

### 架构

`oxlint`（用 Rust 编写）和 `tsgolint`（用 Go 编写）被编译为各自的二进制文件。

`oxlint` 作为 `tsgolint` 的“前端”，处理 CLI、路径遍历、忽略逻辑和诊断信息打印。

`tsgolint` 作为 `oxlint` 的后端，接受路径和配置作为输入，并输出结构化的诊断信息。

这创建了一个简单的管道：

```
oxlint CLI (returns paths + rules + configuration)
  -> tsgolint (returns diagnostics)
  -> oxlint CLI (prints diagnostics)
```

### `tsgolint`

`tsgolint` 不通过公共 API 与 typescript-go 通信。

相反，它通过 [shim](https://github.com/oxc-project/tsgolint/tree/main/shim) 其内部 API 使其公开，从而编译 `typescript-go`。

所有类型感知规则都是直接针对这些 shim 化的 API 编写的。

虽然这不是访问内部结构的推荐方法，但它有效！

## 决策过程

### 编写我们自己的类型检查器

之前放弃的实现类型检查器的尝试包括：

- 我自己尝试 [编写类型推断](https://gist.github.com/Boshen/d189de0fe0720a30c5182cb666e3e9a5)
- [集成](https://github.com/oxc-project/oxc/pull/413) [ezno 类型检查器](https://github.com/kaleidawave/ezno) by [@kaleidawave](https://github.com/kaleidawave)
- [stc](https://github.com/dudykr/stc) by [@kdy1](https://github.com/kdy1)
- 社区中还有许多没有走得太远的尝试。

此外，还有正在进行的 [Biome 2.0](https://biomejs.dev/blog/biome-v2/) 及其自己的类型推断实现。

我们确定编写自己的类型推断器或类型检查器不可行，因为
难以跟上像 TypeScript 这样快速变化的目标。

### 与 TypeScript 编译器通信

在 `typescript-go` 之前，项目通过将 AST 映射到 `estree` 或直接遍历 TypeScript AST，将插件接口添加到 TypeScript 的公共 API 中。例如：

- [typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting)
- [tsslint](https://github.com/johnsoncodehk/tsslint)
- [tsl](https://github.com/ArnaudBarre/tsl)

我们还探讨了 [与 oxlint 的进程间通信](https://github.com/oxc-project/oxc/discussions/2855)，但放弃了这个想法。

随着 `typescript-go` 的出现，TypeScript 团队 [倾向于](https://github.com/microsoft/typescript-go/discussions/455)
编码 TypeScript AST 并通过进程间通信在 JavaScript 端解码。

虽然这些方法可行，但它们仍然会产生：

- 不同程度的性能问题，不适合 oxlint 的性能特征。
- 维护从 TypeScript AST 映射的 AST 的成本。

## 注意事项

虽然 `tsgolint` 解决了性能问题，但还有其他技术挑战需要解决。

### 需要不同版本的 TypeScript

我们计划发布 `typescript-go` 版本的快照，并将其版本号与 TypeScript 对齐。
届时您将能够安装具有正确 TypeScript 版本的 `oxlint-typescript`。

这种方法的缺点是，如果 `oxlint-tsgolint` 需要更改，您可能需要升级 TypeScript。

### `tsgolint` 的维护成本

Shim TypeScript 的内部 API 带有一些风险。然而，TypeScript AST 及其访问者实际上相当稳定。
我们接受此风险，并将在升级 `typescript-go` 时修复破坏性变更。

我们的 `typescript-go` 版本每天同步。

## 性能问题

`tsgolint` 目前在具有数百个项目或大量项目引用的大型单体仓库上表现不佳。

如果遇到 bug，它可能会因死锁而挂起或导致 OOM（内存不足）。

我们正在积极解决这些问题，对 `typescript-go` 进行性能分析并提交改进，使所有 `typescript-go` 用户受益。

我们的核心团队成员 [@camc314](https://github.com/camc314) 已经提交了 [许多 PR](https://github.com/microsoft/typescript-go/pulls?q=is%3Apr+author%3Acamc314+)，使 several code paths 显著更快。

## v1.0 发布

对于 `tsgolint` v1.0，我们将解决：

- 大型单体仓库的性能问题
- 能够配置单个规则
- 每个单独规则的正确性
- IDE 支持
- 整体稳定性

## 致谢

我们要向以下各方表示感谢：

- TypeScript 团队创建了 `typescript-go`。
- `typescript-eslint` 团队给予的暖心支持。
- [@auvred](https://github.com/auvred) 创建了 `tsgolint`。
- [@camchenry](https://github.com/camchenry) 完成了 `oxlint` + `tsgolint` 集成。
- [@camc314](https://github.com/camc314) 致力于性能问题的工作。

## 加入社区

我们很希望听到您对 `oxlint` 和类型感知 linting 的反馈，并很高兴看到它如何帮助改善您的开发工作流程。

联系我们：

- **Discord**: 加入我们的 [社区服务器](https://discord.gg/9uXCAwqQZW) 进行实时讨论
- **GitHub**: 在 [GitHub Discussions](https://github.com/oxc-project/oxc/discussions) 分享反馈
- **Issues**: 向 [oxc](https://github.com/oxc-project/oxc/issues) 报告 `oxlint` bug，向 [tsgolint](https://github.com/oxc-project/tsgolint/issues) 报告类型感知 linting bug。

## 下一步

安装 `oxlint`：

```bash
pnpm add -D oxlint@latest oxlint-tsgolint@latest
pnpm dlx oxlint --init # generate .oxlintrc.json
```

或遵循 [安装指南](https://oxc.rs/docs/guide/usage/linter)。

使用 `--type-aware` CLI 标志。

```bash
pnpm dlx oxlint --type-aware
```

并在 `.oxlintrc.json` 中尝试任何类型感知规则：

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "rules": {
    "typescript/await-thenable": "error",
    "typescript/no-array-delete": "error",
    "typescript/no-base-to-string": "error",
    "typescript/no-confusing-void-expression": "error",
    "typescript/no-duplicate-type-constituents": "error",
    "typescript/no-floating-promises": "error",
    "typescript/no-for-in-array": "error",
    "typescript/no-implied-eval": "error",
    "typescript/no-meaningless-void-operator": "error",
    "typescript/no-misused-promises": "error",
    "typescript/no-misused-spread": "error",
    "typescript/no-mixed-enums": "error",
    "typescript/no-redundant-type-constituents": "error",
    "typescript/no-unnecessary-boolean-literal-compare": "error",
    "typescript/no-unnecessary-template-expression": "error",
    "typescript/no-unnecessary-type-arguments": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/no-unsafe-argument": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-enum-comparison": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/no-unsafe-type-assertion": "error",
    "typescript/no-unsafe-unary-minus": "error",
    "typescript/non-nullable-type-assertion-style": "error",
    "typescript/only-throw-error": "error",
    "typescript/prefer-promise-reject-errors": "error",
    "typescript/prefer-reduce-type-parameter": "error",
    "typescript/prefer-return-this-type": "error",
    "typescript/promise-function-async": "error",
    "typescript/related-getter-setter-pairs": "error",
    "typescript/require-array-sort-compare": "error",
    "typescript/require-await": "error",
    "typescript/restrict-plus-operands": "error",
    "typescript/restrict-template-expressions": "error",
    "typescript/return-await": "error",
    "typescript/switch-exhaustiveness-check": "error",
    "typescript/unbound-method": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error"
  }
}
```
