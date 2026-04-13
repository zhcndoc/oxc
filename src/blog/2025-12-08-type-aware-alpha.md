---
title: 类型感知 Linting Alpha
outline: deep
authors:
  - cameron
  - camchenry
---

<AppBlogPostHeader />

<br>

我们很高兴地宣布 Oxlint 中类型感知 linting 的 Alpha 版本发布！

## 概述

继我们 [8 月的技术预览](/blog/2025-08-17-oxlint-type-aware) 之后，我们很高兴地宣布类型感知 linting 已达到 Alpha 状态。这一里程碑带来了稳定性、可配置性和规则覆盖范围的显著改进。

类型感知 linting 支持强大的规则，如 `no-floating-promises`、`no-misused-promises` 和 `await-thenable`，它们利用 TypeScript 的类型系统来捕捉 bug。现在已有 43 条类型感知规则可用，您可以在运行时错误发生之前捕捉到整个类别的错误。

**本文内容：**

- [快速开始](#quick-start) - 几分钟内开始使用类型感知 linting
- [性能](#performance) - 查看类型感知 linting 比 ESLint 快多少
- [技术预览以来有哪些新功能](#what-s-new-since-the-technical-preview) - 新功能和改进
- [技术细节](#technical-details) - 类型感知 linting 如何在底层工作
- [下一步计划](#what-s-next) - Beta 版本的即将改进

## 快速开始

安装 `oxlint` 和 `oxlint-tsgolint`，然后使用 `--type-aware` 标志运行：

::: code-group

```sh [npm]
npm add -D oxlint oxlint-tsgolint@latest
npx oxlint --type-aware
```

```sh [pnpm]
pnpm add -D oxlint oxlint-tsgolint@latest
pnpm oxlint --type-aware
```

```sh [yarn]
yarn add -D oxlint oxlint-tsgolint@latest
yarn oxlint --type-aware
```

```sh [bun]
bun add -D oxlint oxlint-tsgolint@latest
bunx oxlint --type-aware
```

:::

要尝试特定的类型感知规则而不使用其他配置（`oxlint-tsgolint` 必须已经全局或本地安装）：

::: code-group

```sh [npm]
npx oxlint --type-aware -A all -D typescript/no-floating-promises
```

```sh [pnpm]
pnpx oxlint --type-aware -A all -D typescript/no-floating-promises
```

```sh [yarn]
yarn oxlint --type-aware -A all -D typescript/no-floating-promises
```

```sh [bun]
bunx oxlint --type-aware -A all -D typescript/no-floating-promises
```

:::

有关更多配置选项，请参阅我们的 [使用指南](/docs/guide/usage/linter/type-aware)。

## 性能

| 项目            | Oxlint + 类型感知 | ESLint + typescript-eslint | 提升   |
| --------------- | ----------------- | -------------------------- | ------ |
| vuejs/core      | 2.531 s           | 20.800 s                   | 8.22x  |
| outline/outline | 4.448 s           | 55.070 s                   | 12.38x |

基准测试是在 MacBook Pro M2 Max 12 核心（8 个性能核心和 4 个能效核心）上进行的。

我们的性能测试显示，带有类型感知 linting 的 `oxlint` 比带有 `typescript-eslint` 的 `eslint` 快大约 10 倍。查看我们的 [性能基准测试](https://github.com/oxc-project/bench-linter) 了解更多详情。

Oxlint 还可以在 lint 的同时用于类型检查您的代码库。这避免了重复工作，因为许多类型信息已经在类型感知 linting 期间计算好了。

:::warning 已知问题
虽然 `tsgolint` 已准备好在生产代码库中进行测试，但在处理非常大的代码库时，您可能会遇到内存不足的问题。我们正在努力优化下一个里程碑的内存使用。如果您尝试 `tsgolint` 并在 [`tsgolint` 仓库](https://github.com/oxc-project/tsgolint) 中向我们报告任何内存不足问题，并提供一些关于您项目的详细信息以帮助我们改进内存使用，我们将不胜感激。
:::

## 技术预览以来有哪些新功能？

### 支持在 lint 过程中进行类型检查

`tsgolint` 现在支持在 lint 时发出 TypeScript 的类型检查错误。由于类型感知规则已经需要检查文件中的所有类型，我们能够使用这些现有的类型信息而不是丢弃它们。这意味着在某些情况下，可以完全跳过单独的类型检查命令（例如 `tsc --noEmit`），减少在 CI 中花费在 linting 和类型检查上的总时间。

这是一个实验性功能，但您可以通过向 `oxlint` 命令添加 `--type-check` 和 `--type-aware` 标志来启用它：

```
$ oxlint --type-aware --type-check

  × typescript(TS2322): Type 'number' is not assignable to type 'string'.
   ╭─[index.ts:1:7]
 1 │ const message: string = 1
   ·       ───────
   ╰────
```

### 支持在 `oxlint` 中配置规则

在 `tsgolint` 中运行的类型感知规则可以像任何其他 lint 规则一样在 `oxlint` 中配置。例如，您可以配置 `no-floating-promises` 规则以允许某些安全调用或忽略 `void`：

```json
{
  "rules": {
    "typescript/no-floating-promises": [
      "error",
      {
        "ignoreVoid": true,
        "allowForKnownSafePromises": [
          { "from": "file", "name": "SafePromise" },
          { "from": "lib", "name": "PromiseLike" }
        ]
      }
    ]
  }
}
```

配置选项与 `typescript-eslint` 支持的选项保持一致，文档可以在每个规则的配置部分找到（例如 [`no-floating-promises`](https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises.html#configuration)）。

### 支持行内禁用注释

在 `tsgolint` 中运行的规则现在可以通过在文件中或行上放置注释来禁用，类似于任何其他 `oxlint` 规则：

```ts
/* oxlint-disable typescript/no-floating-promises */

// oxlint-disable-next-line typescript/no-floating-promises
[1, 2, 3].map(async (x) => x + 1);
```

### 支持更多规则

我们继续致力于从 `typescript-eslint` 移植流行规则，您现在可以通过 `oxlint` 使用它们。`tsgolint` 与 `oxlint` 结合，目前支持 43 条类型感知规则。

自初始预览以来，还添加了对以下规则的支持：

- [`no-deprecated`](/docs/guide/usage/linter/rules/typescript/no-deprecated)（最常请求的规则之一）
- [`prefer-includes`](/docs/guide/usage/linter/rules/typescript/prefer-includes)
- [`strict-boolean-expressions`](/docs/guide/usage/linter/rules/typescript/strict-boolean-expressions)

### 现在会报告 TypeScript 程序诊断信息

以前，如果 TypeScript 无法创建和解析程序，这些错误不会被报告，导致人们对为什么 linting 不起作用感到困惑。现在，我们将报告创建程序时的任何问题作为诊断信息，包括 `tsconfig.json` 文件中的配置问题。

例如，如果 `tsconfig.json` 文件包含 `baseUrl`，这将报告为错误，因为 `baseUrl` 已在 TypeScript v7.0 中移除：

```
$ oxlint --type-aware

  × typescript(tsconfig-error): Invalid tsconfig
   ╭─[tsconfig.json:4:3]
 3 │     "compilerOptions": {
 4 │         "baseUrl": ".",
   ·         ─────────
 5 │         "experimentalDecorators": true,
   ╰────
  help: Option 'baseUrl' has been removed. Please remove it from your configuration.
        See https://github.com/oxc-project/tsgolint/issues/351 for more information.
```

### 类型感知规则的自动修复

类型感知规则现在支持通过 `--fix` 标志进行自动修复。当您运行 `oxlint --type-aware --fix` 时，来自 `tsgolint` 的可修复诊断信息将像常规 `oxlint` 修复一样应用。这使修复工作流程与非类型感知规则完全一致。

## 技术细节

### 架构

Oxlint 中的类型感知 linting 使用独特的双二进制架构：

```
oxlint CLI (Rust)
  ├─ Handles file traversal, ignore logic, and diagnostics
  ├─ Runs non-type-aware rules and custom JS plugins
  ├─ Passes paths and configuration to tsgolint
  └─ Formats and displays results

tsgolint (Go)
  ├─ Uses typescript-go directly for type checking
  ├─ Executes type-aware rules
  └─ Returns structured diagnostics
```

这种设计在通过 typescript-go 利用 TypeScript 类型系统的同时，保持了 Oxlint 核心的快速。前端 - 后端分离意味着 `oxlint` 控制用户体验，而 `tsgolint` 处理类型分析的繁重工作。

### TypeScript 兼容性

`tsgolint` 基于 [typescript-go](https://github.com/microsoft/typescript-go)，这是微软基于 Go 的重写版本，将成为 TypeScript v7.0。有关 TypeScript 7 进度的更多详情，请参阅 [官方 TypeScript 博客文章](https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/)。这意味着您可能会遇到一些不再支持的功能。

**重要的兼容性说明：**

- 仅支持 TypeScript 7.0+ 功能
- 不支持 7.0 之前的语法和已弃用的功能
- 遗留的 `tsconfig.json` 选项（如 `baseUrl`）已在 TypeScript 7.0 中移除

如果您正在使用 TypeScript 6.0 或更早版本的已弃用功能，您需要先迁移代码库。请参阅 [TypeScript 迁移指南](https://github.com/microsoft/TypeScript/issues/62508#issuecomment-3348649259) 以帮助更新已弃用的 tsconfig 选项。

### 实现细节

`tsgolint` 不使用 typescript-go 的公共 API。相反，它通过 [shimming](https://github.com/oxc-project/tsgolint/tree/main/shim) 内部 API 来编译 typescript-go，使它们可访问。我们积极跟踪 typescript-go 更新并根据需要修复破坏性变更。

我们的 typescript-go 分支使用 renovatebot 定期同步，确保我们保持最新的改进和修复。一旦 TypeScript 7.0 正式发布，我们将跟踪稳定版本而不是主分支的顶端。

## 下一步计划

我们正在积极致力于以下改进以发布 Beta 版本：

- **支持更多规则** - 目前我们支持 `typescript-eslint` 中 59 条类型感知规则中的 43 条。随着我们走向 Beta 发布，我们计划继续扩大规则覆盖范围。
- **性能和内存使用改进** - 我们将继续优化性能，特别是对于非常大的 monorepos。

## 致谢

我们想向以下各方表示感谢：

- TypeScript 团队创建了 `typescript-go`。
- `typescript-eslint` 团队给予的暖心支持。
- [@auvred](https://github.com/auvred) 创建了 `tsgolint`。
- [@camchenry](https://github.com/camchenry) 持续进行的性能优化工作，以及实现了规则选项支持。

## 试一试

准备好开始了吗？前往上方的 [快速开始](#quick-start) 部分安装并运行类型感知 linting。

我们很希望听到您对类型感知 linting 的反馈，也很兴奋看到它如何帮助改善您的开发工作流。

联系我们：

- **Discord**：加入我们的 [社区服务器](https://discord.gg/9uXCAwqQZW) 进行实时讨论
- **GitHub**：在 [GitHub 讨论区](https://github.com/oxc-project/oxc/discussions) 分享反馈
- **问题**：将 `oxlint` 的 bug 报告给 [oxc](https://github.com/oxc-project/oxc/issues)，将类型感知 linting 的 bug 报告给 [tsgolint](https://github.com/oxc-project/tsgolint/issues)。
