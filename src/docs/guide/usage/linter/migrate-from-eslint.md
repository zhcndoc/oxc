---
title: "从 ESLint 迁移 | Oxlint"
---

# 从 ESLint 迁移

本指南适用于当前使用 ESLint 并希望迁移到 Oxlint 的现有 JavaScript 和 TypeScript 项目。

## 何时从 ESLint 迁移

如果您希望使用一款专用的 lint 工具，并获得更快的速度、更简单的接入方式以及对现代 ESLint 工作流的良好兼容性，那么请迁移到 Oxlint。如果您希望将 Oxlint 作为更大的一体化工具链的一部分，请改用 [Vite+](https://npmx.dev/package/vite-plus)。

- 迁移到 Oxlint，以获得专用的 lint 能力。
- 迁移到 [Vite+](https://npmx.dev/package/vite-plus)，以获得集成式工作流。
- 如果某个缺失的具体行为仍阻碍迁移，请继续使用 ESLint。

## 概览

Oxlint 和 ESLint 共享相似的配置概念，但它们在支持的规则和配置格式上有所不同。

Oxlint 已经支持来自 ESLint 核心和各种流行插件的 700 多条规则。我们打算支持几乎所有现有的 ESLint 核心规则，这项工作正在进行中。查看 [兼容性矩阵](/compatibility) 以验证对您框架和文件类型的支持。

迁移时，请预期以下情况：

- 大多数 ESLint 核心规则和流行插件规则都受支持
- 某些规则可能尚未可用
- ESLint 配置文件必须转换为 Oxlint 的配置格式
- Oxlint 专为渐进式采用而设计；不需要一开始就进行全面迁移
- Oxlint 的 JS 插件允许使用 Oxlint 未原生实现的 ESLint 插件

## 使用 Skills 迁移

[`migrate-oxlint`](https://skills.sh/oxc-project/oxc/migrate-oxlint) skill 提供了交互式、由 agent 引导的迁移流程。请将其安装到您的 coding agent 中：

```bash
npx skills add https://github.com/oxc-project/oxc --skill migrate-oxlint
```

安装完成后，运行 `/migrate-oxlint` 即可执行迁移。

## 从 ESLint flat config 迁移

如果您的项目使用 ESLint v9/v10 flat config（例如 `eslint.config.js` 或 `eslint.config.mjs`），您可以使用 [`@oxlint/migrate`](https://npmx.dev/package/@oxlint/migrate) 自动迁移。

### 运行迁移工具

从项目根目录：

```bash
npx @oxlint/migrate <optional-eslint-flat-config-path>
```

此命令：

- 读取您的 ESLint flat config 文件
- 将支持的规则转换为 Oxlint 配置
- 保留规则严重程度和选项
- 保留特定文件和路径的重写，以允许仓库的不同部分使用不同的规则集
- 将 `globals`（例如 `...globals.browser`）转换为等效的 `env` 和 `globals` 值
- 保留根目录 `ignore` 模式以忽略特定路径/文件

生成的 `.oxlintrc.json` 配置可以在迁移后手动编辑。

Oxlint 会尊重 `.eslintignore` 文件，迁移期间可以保留原位，但我们建议在迁移后将内容移动到 `.oxlintrc.json` 中的 `"ignorePatterns"` 字段。通过仓库的 `.gitignore` 文件忽略的文件/路径也将被 Oxlint 自动尊重。

查看 [可用选项列表](https://github.com/oxc-project/oxlint-migrate?tab=readme-ov-file#options) 以获取更多详细信息。

### 类型感知 TypeScript 规则

如果您的 ESLint 设置使用带有类型感知规则的 `typescript-eslint`，您可以传递 `--type-aware` 标志：

```bash
npx @oxlint/migrate --type-aware
```

这确保生成的 Oxlint 配置包含类型感知规则。

请注意，类型感知 linting 需要 [oxlint-tsgolint](https://github.com/oxc-project/tsgolint)，并且基于 TypeScript 原生重写（即 TypeScript 7），但应该可以在大多数 TypeScript 项目中采用，而无需太多升级工作。

有关 Oxlint 类型感知支持的更多信息，请参阅 [类型感知 Linting 页面](/docs/guide/usage/linter/type-aware)。

### JavaScript 插件

如果您的 ESLint 配置使用 Oxlint 未原生支持的插件，您可以使用 JavaScript 插件保留它们。`@oxlint/migrate` 默认会为您迁移这些插件。

这允许您通过 Oxlint 继续使用这些规则，与原生规则/插件并存。JS 插件功能不支持所有 ESLint 插件，但 Oxlint 的 JavaScript 插件系统涵盖了绝大多数 ESLint v9 API，并且正在积极改进中。大多数涵盖 JavaScript/TypeScript 代码的 ESLint 插件应该可以在 Oxlint 中正常工作。

如果您不想迁移 ESLint 插件以用作 JS 插件，您可以传递 `--js-plugins=false`。

有关 JavaScript 插件的更多信息，请参阅 [JS 插件页面](/docs/guide/usage/linter/js-plugins)。

#### 本地自定义 ESLint 插件

如果您在自己的仓库中使用本地自定义 ESLint 插件（例如 `import pluginMyCompany from './eslint-plugin-my-company/lib/index.js'`），这些目前不会由 `@oxlint/migrate` 自动迁移。

但是，在运行迁移脚本后，可以将它们手动添加到 Oxlint 配置文件中：

::: code-group

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "jsPlugins": ["./eslint-plugin-company/lib/index.js"]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: ["./eslint-plugin-company/lib/index.js"],
});
```

:::

## 同时运行 Oxlint 和 ESLint

如果 Oxlint 中并非所有需要的规则都可用，您可以并排运行 Oxlint 和 ESLint。

常见的设置是：

1. 对所有支持的规则启用 Oxlint
2. 对不支持的规则保留 ESLint
3. 在 ESLint 中禁用重叠规则

因为 Oxlint 比 ESLint 快得多，建议先运行 Oxlint 以尽早捕获错误，然后仅在需要时回退到 ESLint。

例如：

```bash
oxlint && eslint
```

### 在 ESLint 中禁用重叠规则

您可以使用 [`eslint-plugin-oxlint`](https://npmx.dev/package/eslint-plugin-oxlint) 禁用已由 Oxlint 处理的 ESLint 规则：

```bash
npm install --save-dev eslint-plugin-oxlint
```

这减少了重复的诊断，可以帮助大幅减少 linting 时间，并允许 ESLint 仅专注于 Oxlint 尚未支持的规则。

长期来看 - 一旦 Oxlint 中添加了剩余的重要规则 - 我们强烈建议完全迁移到 Oxlint，以简化您的设置并减少项目的依赖数量。

## 从旧版 ESLint (v8.x) 配置迁移

如果您的项目使用带有旧版配置文件（例如 `.eslintrc.js` 或 `.eslintrc.json`）的 ESLint v8.x，它们无法由 `@oxlint/migrate` 自动迁移。

在某些情况下，您可以先 [使用 `@eslint/migrate-config` 将它们自动迁移到 ESLint flat config](https://npmx.dev/package/@eslint/migrate-config)，_然后_ 使用 `@oxlint/migrate` 迁移到 Oxlint。

“旧版”ESLint v8.x 配置文件结构与 Oxlint 的配置格式密切映射，因此对于简单的设置，大多数规则和选项可以直接转换。

## 规则/插件支持

您可能有一些在 ESLint 中依赖的特定规则尚未移植到 Oxlint。

我们支持的插件中的几乎所有规则都将被移植 - 并且大多数已经移植完成。对于那些不会移植的规则，有些规则在原始插件中已弃用，或者已经有了替代实现。

您可以查看 [元问题](https://github.com/oxc-project/oxc/issues/481) 了解规则/插件实现状态，以查看您依赖的规则是否计划实现，或者是否已由其他等效规则实现。

对于 Oxlint 中未原生实现的插件，建议使用 [JS 插件](/docs/guide/usage/linter/js-plugins)。
