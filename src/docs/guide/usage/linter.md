---
title: Oxlint
outline: deep
badges:
  - src: https://img.shields.io/npm/dw/oxlint
    alt: npm 每周下载量
---

<script setup>
import { data } from './rule-count.data.js';
const ruleCount = data;
// 减 1 然后向下舍入到最近的 5，这样当数字是 655 时我们可以说“超过 650 条规则”，而不是在不准确时说“超过 655 条规则”。
// 输入和输出：
// 655 -> 650
// 654 -> 650
// 651 -> 650
// 656 -> 655
const ruleCountRounded = Math.floor((data - 1) / 5) * 5;
</script>

# Oxlint

<AppBadgeList />

Oxlint (`/oʊ-ɛks-lɪnt/`) 是一个基于 Oxc 编译器栈构建的高性能 JavaScript 和 TypeScript linter。

## 为规模化而建

Oxlint 专为大型仓库和 CI 环境构建。其架构消除了限制 ESLint 性能的结构瓶颈。

我们的 [基准测试](https://github.com/oxc-project/bench-linter) 显示 Oxlint 比 ESLint 快 50 到 100 倍。

## 专注于正确性的默认配置

Oxlint 开箱即用。默认情况下，它优先考虑高信号的正确性检查。这些检查会暴露不正确、不安全或无用的代码，因此团队可以采用 Oxlint 而不会产生过多的噪音。

随着需求的发展，可以逐步启用额外的规则。

## 大型规则集，注重兼容性

为了使迁移简单，Oxlint 包含了 [超过 {{ ruleCountRounded }} 条规则](/docs/guide/usage/linter/rules.md)，覆盖了大多数团队已经使用的 linter 插件，包括：

- ESLint 核心规则
- TypeScript 规则（包括类型感知规则）
- 流行插件，如 React、Jest、Vitest、Import、Unicorn 和 jsx-a11y
- 与 ESLint 插件生态系统兼容的自定义 [JS 插件](/docs/guide/usage/linter/js-plugins)

这种广度使得迁移变得直接，同时不会牺牲规则覆盖率。并且已经构建了工具 [为您迁移整个 linter 配置](/docs/guide/usage/linter/migrate-from-eslint)。

## 类型感知 linting

Oxlint 利用 TypeScript 编译器的原生 Go 端口 ([tsgo](https://github.com/microsoft/typescript-go) aka TypeScript 7)，提供完整的 TypeScript 兼容性和您期望从 TypeScript 本身获得的相同类型系统行为。

这使得需要类型的任务关键型检查成为可能，例如检测浮动的 promises。

相比之下，[Biome 的方法](https://biomejs.dev/blog/biome-v2) 是实现自己的类型推断，而不是依赖 TypeScript 编译器，他们指出覆盖率仍在改进中。

参见：[类型感知 linting](/docs/guide/usage/linter/type-aware)

## 多文件分析

Oxlint 将多文件分析支持作为一流功能。

启用后，Oxlint 会构建项目范围的模块图，并在规则之间共享解析和解析结果。这改进了依赖于跨文件导入的检查，并有助于避免在 ESLint 中使用像 [`import/no-cycle`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md) 这样的规则时经常看到的性能骤降。

参见：[多文件分析](/docs/guide/usage/linter/multi-file-analysis.md)

## 对人类 _和_ AI 友好的诊断

Oxlint 诊断旨在既可读又可机器操作。

除了清晰的消息外，诊断还包括结构化信息，如精确的范围、上下文数据和相关文档链接。这有助于 AI 理解问题并可靠地应用修复。

## 将可靠性作为优先事项

Oxlint 专为不能接受失败的工作流程而建。

崩溃被视为最高优先级的 bug。
性能回归被视为 bug。

稳定性和吞吐量始终被优先考虑，尤其是对于 CI 和大型 monorepos。

## 快速开始

推荐的设置是将 Oxlint 安装为开发依赖项并添加脚本。

```sh
pnpm add -D oxlint
```

将脚本添加到 `package.json`：

```json [package.json]
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix"
  }
}
```

下一步：

- [快速开始](/docs/guide/usage/linter/quickstart)
- [配置](/docs/guide/usage/linter/config)
- [设置编辑器](/docs/guide/usage/linter/editors)
- [设置 CI](/docs/guide/usage/linter/ci)

## 采用路径

::: tip
如果您正在从 ESLint 迁移，请参阅 [“从 ESLint 迁移”页面](/docs/guide/usage/linter/migrate-from-eslint) 获取详细指导。
:::

选择适合您仓库的方法：

- **替换 ESLint（推荐用于大多数项目）。** 将 Oxlint 用作您的主要 linter。
  - 使用诸如 [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate) 之类的工具来迁移您现有的 ESLint 配置。
- **逐步迁移（推荐用于特别大型和复杂的仓库）。** 先运行 Oxlint，然后运行 ESLint 并禁用重叠的规则。这在迁移期间保持 CI 快速。
  - 使用 [`eslint-plugin-oxlint`](https://npmx.dev/package/eslint-plugin-oxlint) 在同时运行时禁用重叠的 ESLint 规则。
  - 对于这种方法，您也可以 - 并且应该 - 使用 [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate)。

## Oxlint 支持的内容

Oxlint 支持：

- JavaScript 和 TypeScript (`.js`, `.mjs`, `.cjs`, `.ts`, `.mts`, `.cts`)
- JSX 和 TSX (`.jsx`, `.tsx`)
- 框架文件 (`.vue`, `.svelte`, `.astro`)，仅 lint 它们的 `<script>` 块

请参阅 [兼容性矩阵](/compatibility) 了解详细的框架支持。

## 功能

- [原生插件](/docs/guide/usage/linter/plugins) 提供广泛的规则覆盖，包含 {{ ruleCount }} 条内置规则，无需庞大的 JavaScript 依赖树。
- [自动修复](/docs/guide/usage/linter/automatic-fixes) 快速应用安全的更改。
- [忽略文件](/docs/guide/usage/linter/ignore-files) 控制哪些路径被 lint。
- [内联忽略注释](/docs/guide/usage/linter/ignore-comments) 用于忽略文件内的规则。
- [多文件分析](/docs/guide/usage/linter/multi-file-analysis) 用于需要项目范围上下文的规则，例如像 [no-cycle](/docs/guide/usage/linter/rules/import/no-cycle.html) 这样的导入分析。
- [类型感知 linting](/docs/guide/usage/linter/type-aware) 用于需要 TypeScript 类型信息的规则。
- [JS 插件](/docs/guide/usage/linter/js-plugins) (**alpha**) 用于与现有 ESLint 插件兼容。

## 使用 Oxlint 的项目

Oxlint 被以下流行项目在生产环境中使用：

- [elastic/kibana](https://github.com/elastic/kibana)
- [getsentry/sentry-javascript](https://github.com/getsentry/sentry-javascript)
- [renovatebot/renovate](https://github.com/renovatebot/renovate)
- [preactjs/preact](https://github.com/preactjs/preact)
- [date-fns/date-fns](https://github.com/date-fns/date-fns)
- [outline/outline](https://github.com/outline/outline)
- [PostHog/posthog](https://github.com/PostHog/posthog)
- [actualbudget/actual](https://github.com/actualbudget/actual)
- [cloudflare/agents](https://github.com/cloudflare/agents)

## 迁移

- [从 ESLint 迁移](/docs/guide/usage/linter/migrate-from-eslint)
<!-- - [从 Biome 迁移](/docs/guide/usage/linter/migrate-from-biome) -->

## 参考

- [规则参考](/docs/guide/usage/linter/rules)
- [CLI 参考](/docs/guide/usage/linter/cli)
- [配置文件参考](/docs/guide/usage/linter/config-file-reference)
- [版本控制策略](/docs/guide/usage/linter/versioning)
