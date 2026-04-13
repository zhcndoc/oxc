# 忽略文件

Oxfmt 提供了多种排除文件不进行格式化的方法。

## `ignorePatterns`

推荐的忽略文件方式。添加到 `.oxfmtrc.json`：

```json [.oxfmtrc.json]
{
  "ignorePatterns": ["dist/**", "*.min.js"]
}
```

- 使用 `.gitignore` 语法
- 路径相对于包含 Oxfmt 配置文件的目录解析
- 特定于格式化程序且独立于 Git

匹配 `ignorePatterns` 的文件**无法被格式化**，即使显式指定也是如此。

## `.gitignore`

Oxfmt 会遵循当前目录树中的 `.gitignore` 文件。

- 不会读取全局 gitignore 和父级 `.gitignore` 文件
- 不需要 `.git` 目录

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
