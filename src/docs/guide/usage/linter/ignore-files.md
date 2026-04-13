---
title: 忽略
description: 控制 Oxlint 检查哪些文件。
---

# 忽略文件

大型仓库包含不应被检查的文件，例如构建输出、vendor 代码、快照或生成的工件。Oxlint 提供了一个可预测的忽略模型，适用于单体仓库和 CI。

> [!TIP]
> 强烈建议在 Oxlint 配置文件（`.oxlintrc.json` 或 `oxlint.config.ts`）中使用 `"ignorePatterns"` 来忽略文件，而不是使用单独的忽略文件。这确保每位开发者在所有运行 Oxlint 的工具和命令中拥有相同的忽略规则，尤其是 IDE/编辑器集成。它还将配置集中到一个文件中。

## 默认忽略

Oxlint 自动忽略：

- `.git` 目录
- 文件名中包含 `.min.`、`-min.` 或 `_min.` 的压缩文件
- 被 `.gitignore` 匹配的文件（全局 gitignore 文件不生效）

隐藏文件不会被自动忽略。

## `ignorePatterns`

推荐的方法是在配置文件中使用 `ignorePatterns` 定义忽略规则。这使得忽略规则靠近它们所属的配置，并且自然地适用于嵌套配置。

模式相对于配置文件进行解析。

::: code-group

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "ignorePatterns": ["dist/**", "coverage/**", "vendor/**", "test/snapshots/**"]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["dist/**", "coverage/**", "vendor/**", "test/snapshots/**"],
});
```

:::

在单体仓库中，嵌套配置可以忽略特定包的输出，而不影响仓库的其余部分。

## `.eslintignore`

Oxlint 还支持 `.eslintignore` 以兼容现有的 ESLint 设置。现有的 `.eslintignore` 文件可以在迁移期间保留原位。语法与 `.gitignore` 兼容，包括注释和否定模式。

新项目应优先在配置文件中使用 `"ignorePatterns"`，我们强烈建议在迁移后不久（如果不是在迁移期间）切换到 `"ignorePatterns"`。

## 从命令行忽略

CLI 标志适用于 CI 中的一次性更改或本地调试。

使用自定义忽略文件：

```bash
oxlint --ignore-path path/to/ignorefile
```

添加额外的忽略模式：

```bash
oxlint --ignore-pattern 'dist/**' --ignore-pattern 'coverage/**'
```

为模式添加引号以避免 shell glob 扩展。

## 取消忽略文件

忽略文件支持否定模式，允许忽略目录同时保留特定文件。

要忽略 `build/` 下的所有内容除了一个文件，忽略内容而不是目录本身：

::: code-group

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "ignorePatterns": ["build/**/*", "!build/keep.js"]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["build/**/*", "!build/keep.js"],
});
```

:::

这使得遍历成为可能，同时仍然忽略几乎所有内容。

## 禁用忽略

要禁用所有忽略行为，包括忽略文件和 CLI 忽略选项，使用 `--no-ignore`：

```bash
oxlint --no-ignore
```
