---
outline: deep
---

# JS 插件

Oxlint 支持用 JS 编写的插件——无论是自定义编写的，还是来自 npm 的。

Oxlint 的插件 API 与 ESLint v9+ 兼容，因此大多数现有的 ESLint 插件应该可以在 Oxlint 中开箱即用。

几乎整个 ESLint 插件 API 现已实现（见 [下方](#api-support)），因此大多数现有的 ESLint 插件应该可以开箱即用。

:::info
JS 插件目前处于 alpha 阶段，仍在积极开发中。

所有 API 的行为应与 ESLint 完全一致。如果您发现任何行为差异，
那就是一个 bug - 请 [报告它](https://github.com/oxc-project/oxc/issues/new?template=linter_bug_report.yaml)。
:::

## 使用 JS 插件

1. 在 `.oxlintrc.json` 配置文件的 `jsPlugins` 下添加插件路径。
2. 在 `rules` 下添加来自插件的规则。

路径可以是任何有效的导入说明符，例如 `./plugin.js`、`eslint-plugin-foo` 或 `@foo/eslint-plugin`。
路径是相对于配置文件本身解析的。

::: code-group

```jsonc [.oxlintrc.json]
{
  "jsPlugins": ["./path/to/my-plugin.js", "eslint-plugin-whatever", "@foobar/eslint-plugin"],
  "rules": {
    "my-plugin/rule1": "error",
    "my-plugin/rule2": "warn",
    "whatever/rule1": "error",
    "whatever/rule2": "warn",
    "@foobar/rule1": "error",
  },
  // ... 其他配置 ...
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: ["./path/to/my-plugin.js", "eslint-plugin-whatever", "@foobar/eslint-plugin"],
  rules: {
    "my-plugin/rule1": "error",
    "my-plugin/rule2": "warn",
    "whatever/rule1": "error",
    "whatever/rule2": "warn",
    "@foobar/rule1": "error",
  },
  // ... 其他配置 ...
});
```

:::

### 插件别名

您还可以为插件定义不同的名称（别名）。这在以下情况下很有用：

- 默认插件名称与原生 Oxlint 插件的名称冲突（例如 jsdoc、react 等）。
- 默认插件名称非常长。
- 您想使用 Oxlint 原生支持的插件，但您需要的特定规则尚未在 Oxlint 的原生版本中实现。

::: code-group

```jsonc [.oxlintrc.json]
{
  "jsPlugins": [
    // `jsdoc` 是保留名称，因为 Oxlint 原生支持它
    {
      "name": "jsdoc-js",
      "specifier": "eslint-plugin-jsdoc",
    },
    // 缩短名称
    {
      "name": "short",
      "specifier": "eslint-plugin-with-name-so-very-very-long",
    },
    // 将不想别名的插件仅列为说明符
    "eslint-plugin-whatever",
  ],
  "rules": {
    "jsdoc-js/check-alignment": "error",
    "short/rule1": "error",
    "whatever/rule2": "error",
  },
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: [
    // `jsdoc` 是保留名称，因为 Oxlint 原生支持它
    {
      name: "jsdoc-js",
      specifier: "eslint-plugin-jsdoc",
    },
    // 缩短名称
    {
      name: "short",
      specifier: "eslint-plugin-with-name-so-very-very-long",
    },
    // 将不想别名的插件仅列为说明符
    "eslint-plugin-whatever",
  ],
  rules: {
    "jsdoc-js/check-alignment": "error",
    "short/rule1": "error",
    "whatever/rule2": "error",
  },
});
```

:::

请参阅 [编写 JS 插件](./writing-js-plugins) 页面，了解如何为 Oxlint 编写自己的 JS 插件和自定义规则。

## 已知支持的 ESLint 插件

我们对许多流行的 ESLint 插件运行一致性测试，以确保它们能与 Oxlint 一起工作。这些包括：

- `eslint-plugin-cypress` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/cypress.md))
- `@e18e/eslint-plugin` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/e18e.md))
- `eslint-plugin-mocha` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/mocha.md))
- `eslint-plugin-playwright` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/playwright.md))
- `eslint-plugin-react-hooks` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/react-hooks.md)): 请注意，其中一些规则已在 Oxlint 中原生支持，因此通常应使用这些原生规则
- `eslint-plugin-regexp` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/regexp.md))
- `eslint-plugin-sonarjs` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/sonarjs.md))
- `eslint-plugin-storybook` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/storybook.md))
- `@stylistic/eslint-plugin` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/stylistic.md))
- `eslint-plugin-testing-library` ([一致性测试结果](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/conformance/snapshots/testing_library.md))

请注意，上述列表并非详尽无遗，_许多_ 其他 ESLint 插件也能与 Oxlint 一起工作。这些只是我们明确测试过的一些流行插件。

您可以在 [GitHub 讨论](https://github.com/oxc-project/oxc/discussions/20245) 中查看更多关于已知能与 Oxlint 一起工作的插件的信息。

## API 支持

Oxlint 支持几乎所有的 ESLint API 表面：

- AST 遍历。
- AST 探索（`node.parent`、`context.sourceCode.getAncestors`）。
- 修复。
- 规则选项。
- 选择器（[ESLint 文档](https://eslint.org/docs/latest/extend/selectors)）。
- `SourceCode` API（例如 `context.sourceCode.getText(node)`）。
- `SourceCode` tokens API（例如 `context.sourceCode.getTokens(node)`）。
- 作用域分析。
- 控制流分析（代码路径）。
- 内联禁用指令。（`// oxlint-disable`）
- 语言服务器（IDE）支持 + 建议（编辑器内诊断和快速修复）

尚未支持：

- 自定义文件格式和解析器（例如 Svelte、Vue、Angular）。
- 依赖 TypeScript 类型感知的 lint 规则。

在 ESLint v9 或更早版本中被移除的 ESLint API 在大多数情况下将不会被实现。如果某个 ESLint 插件无人维护且从未更新以升级其 API 用法以适应 ESLint v9，您可能需要自己修改该插件或寻找替代方案。

我们将在未来几个月内实现剩余功能，旨在支持 100% 的 ESLint 插件 API 表面。
