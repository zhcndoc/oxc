---
title: "Ignore files | Oxfmt"
---

# 忽略文件

Oxfmt 提供了多种排除文件不进行格式化的方法。

Some ignore mechanisms apply globally, while others are scoped to the config file they belong to:

| 机制                              | 作用范围              |
| --------------------------------- | --------------------- |
| 带有 `!` 前缀的 CLI 路径         | 全局                  |
| `.prettierignore` / `--ignore-path` | 全局                |
| 配置中的 `ignorePatterns`         | 仅限该配置           |

When using [nested config](./config#create-a-config-file), `ignorePatterns` only applies to files that are resolved by that particular config file. Global mechanisms always apply regardless of which config file is in effect.

## `ignorePatterns`

推荐使用此方式来忽略文件。将其添加到你的 Oxfmt 配置中：

::: code-group

```json [.oxfmtrc.json]
{
  "ignorePatterns": ["dist/**", "*.min.js"]
}
```

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["dist/**", "*.min.js"],
});
```

:::

- 使用 `.gitignore` 语法
- 路径将相对于包含 Oxfmt 配置文件的目录进行解析
- 仅针对格式化器，且不依赖 Git

匹配 `ignorePatterns` 的文件**无法被格式化**，即使显式指定也是如此。

## `.gitignore`

Oxfmt 遵循与 Git 本身相同的 Git 忽略规则：

- 当前目录树中的 `.gitignore` 文件
- 父目录中的 `.gitignore` 文件（直到仓库边界）
- `.git/info/exclude`

However, global gitignore (`core.excludesFile`) is not read.

被 `.gitignore` 忽略的文件如果显式指定**仍然可以被格式化**。

## VCS 目录和 `node_modules`

默认忽略：`.git`, `.svn`, `.jj`, `node_modules`

使用 `--with-node-modules` 来包含 `node_modules`。

## 锁文件

`package-lock.json`, `pnpm-lock.yaml` 等始终被忽略。

## `.prettierignore`

为兼容 Prettier 而支持。使用 `.gitignore` 语法。

`.prettierignore` 中的文件无法被格式化，即使显式指定也是如此。

对于新项目，优先使用 `ignorePatterns`。
