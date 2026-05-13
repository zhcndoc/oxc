---
title: "内置插件 | Oxlint"
description: 启用内置插件规则集，并使用与 ESLint 兼容的 JavaScript 插件扩展 Oxlint。
---

# 内置插件

Oxlint 包含了许多流行 ESLint 插件规则集的内置实现。`recommended` 配置中的大多数规则已经实现，因此无需额外设置即可获得有用的结果。

Oxlint 还支持使用与 ESLint 兼容的 API 编写的 JavaScript 插件。请参阅 [JS 插件](./js-plugins.md)。

## Oxlint 中插件的含义

插件是一组命名的规则。启用插件使其规则可用，类别标志控制启用哪些规则及其严重程度。

如果您是从 ESLint 迁移过来的，插件映射到您已经熟悉的生态系统，例如 import、react、jsx-a11y、jest、unicorn 等。

## 启用插件

**强烈建议**使用配置文件来启用插件，因为这使得在项目中与其他开发人员管理和共享变得相当容易。

### 在配置文件中启用

您也可以使用 `plugins` 字段在配置文件中启用插件：

::: code-group

```json [.oxlintrc.json]
{
  "plugins": ["import"]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import"],
});
```

:::

设置 `plugins` **会覆盖默认插件集**。列表应包含您想要启用的每个插件。

### 使用 CLI 启用

您也可以使用 `--<plugin-name>-plugin` CLI 标志启用插件。

例如，启用 import 插件：

```bash
oxlint --import-plugin
```

启用后，类别标志决定开启什么。

例如，将 correctness 类别中的 import 插件规则启用为错误，将 suspicious 启用为警告：

```bash
oxlint --import-plugin -D correctness -W suspicious
```

Correctness 规则默认启用。

提示：运行 `oxlint --help` 查看插件标志的完整列表。

## 禁用默认插件

### 在配置文件中禁用默认插件

要在配置文件中禁用所有默认插件，请将 `plugins` 设置为空数组：

::: code-group

```json [.oxlintrc.json]
{
  "plugins": []
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [],
});
```

:::

这将禁用所有默认插件并仅使用基本规则集。

### 使用 CLI 禁用默认插件

默认启用了几个插件。您可以使用 `--disable-<plugin-name>-plugin` 禁用默认插件。

例如，禁用 unicorn：

```bash
oxlint --disable-unicorn-plugin
```

只有默认插件支持被禁用。非默认插件可以直接省略。

## 支持的插件

此表列出了内置插件及其来源。

| 插件名称      | 默认 | 来源                                                                                                                                                                                                                                                         |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eslint`     | 是     | [ESLint](https://eslint.org/) 核心规则                                                                                                                                                                                                                       |
| `typescript` | 是     | 来自 [typescript-eslint](https://typescript-eslint.io/) 的 TypeScript 规则（即 `@typescript-eslint/plugin`）。可使用 [类型感知模式](./type-aware.md) 获取支持类型感知的规则。                                                                       |
| `unicorn`    | 是     | [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)                                                                                                                                                                                 |
| `react`      | 否      | [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)、[eslint-plugin-react-hooks](https://www.npmx.dev/package/eslint-plugin-react-hooks)\* 和 [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) |
| `react-perf` | 否      | [eslint-plugin-react-perf](https://github.com/cvazac/eslint-plugin-react-perf)                                                                                                                                                                                 |
| `nextjs`     | 否      | [@next/eslint-plugin-next](https://www.npmx.dev/package/@next/eslint-plugin-next)                                                                                                                                                                              |
| `oxc`        | 是     | Oxc 特有规则以及从 deepscan 移植的部分规则                                                                                                                                                                                                     |
| `import`     | 否      | [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)（也等同于 [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)）                                                                                       |
| `jsdoc`      | 否      | [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)                                                                                                                                                                                            |
| `jsx-a11y`   | 否      | [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)                                                                                                                                                                                 |
| `node`       | 否      | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                                                                                                                                                                                         |
| `promise`    | 否      | [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise)                                                                                                                                                                             |
| `jest`       | 否      | [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)                                                                                                                                                                                     |
| `vitest`     | 否      | [@vitest/eslint-plugin](https://github.com/vitest-dev/eslint-plugin-vitest)，即 eslint-plugin-vitest                                                                                                                                                           |
| `vue`        | 否      | 可与 script 标签配合使用的 [eslint-plugin-vue](https://eslint.vuejs.org/) 规则                                                                                                                                                                                |

有关规则覆盖率的当前状态，请参阅 linter [产品计划 issue](https://github.com/oxc-project/oxc/issues/481)。有关框架和文件类型支持，请参阅 [兼容性矩阵](/compatibility)。

\* eslint-plugin-react-hooks 默认不实现编译器规则。有关如何执行此操作的示例，请查看 [这里](https://github.com/TheAlexLichter/oxlint-react-compiler-rules)。

## 添加新插件

Oxlint 专注于通过内置插件和与 ESLint 兼容的 JavaScript 插件来支持生态系统。鼓励 [贡献添加规则](/docs/contribute/linter/adding-rules) 到现有的内置插件。

如果您认为某个规则集应该作为内置插件实现，请先 [开启 GitHub 讨论](https://github.com/oxc-project/oxc/discussions/new?category=feature-request)。
