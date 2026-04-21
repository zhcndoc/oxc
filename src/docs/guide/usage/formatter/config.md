---
title: 配置
description: 使用 .oxfmtrc.json 文件配置 Oxfmt。
---

# 配置

Oxfmt 开箱即用，但大多数团队会提交一个配置文件，以保持本地运行、编辑器和 CI 之间的格式一致。

本页重点介绍项目配置：格式化选项、忽略模式和实验性功能。

## 创建配置文件

要在当前目录生成初始配置：

```sh
oxfmt --init
```

Oxfmt 会自动从当前目录开始向上遍历树状结构，查找以下文件：

- `.oxfmtrc.json`
- `.oxfmtrc.jsonc`
- `oxfmt.config.ts`

你也可以使用 `-c` 显式传递配置文件。它支持任何受支持的格式（`.json`、`.jsonc`、`.ts`、`.mts`、`.cts`、`.js`、`.mjs`、`.cjs`）：

```sh
oxfmt -c path/to/yourconfig.json
```

最小的 JSON 配置如下所示：

```json [.oxfmtrc.json]
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 80
}
```

JavaScript / TypeScript 配置文件使用默认导出。`defineConfig` 是可选的，但可以提供类型检查和编辑器自动补全：

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
});
```

## 配置文件格式

配置文件是一个 JSON 对象。最常见的顶层字段包括：

- `printWidth`: 行宽限制（默认值：100）
- `tabWidth`: 每个缩进级别的空格数（默认值：2）
- `useTabs`: 使用制表符代替空格（默认值：false）
- `semi`: 添加分号（默认值：true）
- `singleQuote`: 使用单引号（默认值：false）
- `trailingComma`: 多行结构中的尾随逗号（默认值："all"）
- `ignorePatterns`: 排除在格式化之外的 Glob 模式
- `sortImports`: 配置导入排序（默认禁用）
- `sortTailwindcss`: 配置 Tailwind 类排序（默认禁用）
- `sortPackageJson`: 配置 package.json 排序（默认启用）

有关字段的完整列表，请参阅 [配置文件参考](./config-file-reference)。

## JSON 模式

添加 `$schema` 字段以获得编辑器验证和自动补全：

```json [.oxfmtrc.json]
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json"
}
```

## `.editorconfig`

Oxfmt 读取以下 `.editorconfig` 属性：

- `end_of_line` → `endOfLine`
- `indent_style` → `useTabs`
- `indent_size` → `tabWidth`
- `max_line_length` → `printWidth`
- `insert_final_newline` → `insertFinalNewline`

支持根部分和基于 glob 的覆盖。

```
[*]
indent_size = 4

[*.{js,ts}]
indent_size = 2
```

Oxfmt 仅使用当前目录中最近的 `.editorconfig`：

- `root = true` 不会被遵守
- 嵌套的 `.editorconfig` 文件不会合并

## 覆盖

使用 `overrides` 字段将不同的格式化选项应用于特定文件：

::: code-group

```json [.oxfmtrc.json]
{
  "printWidth": 100,
  "overrides": [
    {
      "files": ["*.test.js", "*.spec.ts"],
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": ["*.md", "*.html"],
      "excludeFiles": ["*.min.js"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  overrides: [
    {
      files: ["*.test.js", "*.spec.ts"],
      options: {
        printWidth: 120,
      },
    },
    {
      files: ["*.md", "*.html"],
      excludeFiles: ["*.min.js"],
      options: {
        tabWidth: 4,
      },
    },
  ],
});
```

:::

每个覆盖项包含：

- `files`（必需）：匹配文件的 Glob 模式
- `excludeFiles`（可选）：从此覆盖中排除的 Glob 模式
- `options`: 要应用的格式化选项

Glob 模式相对于包含 Oxfmt 配置文件的目录进行解析。

## 优先级

选项按顺序应用（优先级从低到高）：

1. 默认值
2. `.oxfmtrc.json(c)` 根选项
3. `.oxfmtrc.json(c)` `overrides` 选项
4. 未设置的字段回退到 `.editorconfig` 支持的选项

## Oxfmt 特定选项

### `insertFinalNewline`

控制是否在格式化文件末尾添加换行符。默认值为 `true`。

这是一个 [频繁请求的 Prettier 功能](https://github.com/prettier/prettier/issues/6360)，因为某些环境（例如 Salesforce）会去除尾随换行符。

### `printWidth`

Oxfmt 默认值为 `printWidth: 100`（Prettier 使用 80）。原因：

- TypeScript 代码由于类型注释而更长
- 导入语句通常有许多说明符
- 现代屏幕更宽
- 更少的换行意味着更少的 LLM 令牌

要匹配 Prettier 的默认值：

::: code-group

```json [.oxfmtrc.json]
{
  "printWidth": 80
}
```

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
});
```

:::

## 后续步骤

- [忽略文件](./ignore-files): 忽略文件和模式，`.gitignore` 和 `.prettierignore` 工作流。
- [内联忽略注释](./ignore-comments): 特定代码的内联抑制。
- [配置文件参考](./config-file-reference): 完整的模式和字段文档。
- [CLI 参考](./cli): 完整的标志列表。
