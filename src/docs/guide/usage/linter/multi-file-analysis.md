---
title: "多文件分析 | Oxlint"
description: 项目范围内用于导入循环和跨文件问题的 lint 检查
---

# 多文件分析

多文件分析允许规则使用项目范围内的信息，例如模块依赖图，而不是孤立地分析每个文件。

## 性能和架构

ESLint 按文件评估规则，不提供内置的项目图。诸如 [`eslint-plugin-import`](https://npmx.dev/package/eslint-plugin-import) 之类的插件必须在 ESLint 核心之外重建模块解析和模块图。有项目报告原始的 `import/no-cycle` 规则耗时数十秒，或者在较大的仓库中耗时超过一分钟。

Oxlint 在核心引擎中实现了多文件分析。它并行 lint 文件并构建模块图，在规则之间共享解析和解析结果，通常可以在几秒钟内完成可比的 `import/no-cycle` 检查。

## 启用 import 插件

要使用多文件分析，你必须启用 `import` 插件并配置至少一个 `import/*` 规则。示例请参阅下一节中的配置文件。

## 使用 import/no-cycle 检测循环

启用 [`import/no-cycle`](/docs/guide/usage/linter/rules/import/no-cycle.html) 以检测循环依赖。

导入循环：

- 模糊依赖方向
- 使重构更加困难
- 由于求值顺序可能导致导入的值为 `undefined`

::: code-group

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["import"],
  "rules": {
    "import/no-cycle": ["error", { "maxDepth": 3 }]
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import"],
  rules: {
    "import/no-cycle": ["error", { maxDepth: 3 }],
  },
});
```

:::

## TypeScript 路径别名

运行 `import/*` 规则时，Oxlint 会自动发现 `tsconfig.json` 以解析 TypeScript 路径别名，例如 `compilerOptions.paths`。
