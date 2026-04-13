# 忽略

## 忽略文件

Oxfmt 提供了几种忽略文件的方法。

### `.gitignore`

遵循当前工作目录及其子目录中的 `.gitignore`。

不遵循全局、排除项或父目录中的 `.gitignore`。
不需要 `.git` 目录存在。

此处列出的文件如果被明确指定，仍然可以被格式化。
这对于像 `husky` 这样的用例是安全的，因为被忽略的文件永远不会被暂存。

### `.prettierignore` / `oxfmtrc.ignorePatterns`

这些是特定于格式化程序的忽略设置，独立于 Git，且各自在其作用域内运行。

`.prettierignore` 仅从当前工作目录读取。对于 `.oxfmtrc.json(c)`，请参阅 [配置](./config)。

语法与 `.gitignore` 相同，路径相对于包含忽略文件的目录进行解析。

此处忽略的文件即使被明确指定也无法格式化。此行为旨在用于像 `husky` 这样的用例。

您也可以使用 `--ignore-path` 指定自定义忽略路径，或使用 `!` 前缀的位置路径来排除文件。

### VCS 目录和 `node_modules`

像 `.git`、`.svn` 和 `.jj` 这样的目录默认会被忽略。

除非指定了 `--with-node_modules` 标志，否则 `node_modules` 目录也会被忽略。

如果当前工作目录位于这些目录内部，仍然可以进行格式化。

### 锁文件

像 `package-lock.json` 和 `pnpm-lock.yaml` 这样的文件默认会被忽略。

即使被明确指定，这些文件也无法格式化。

## 忽略注释

对于 JS/TS 文件，您可以使用 `prettier-ignore` 注释。

这对下一条语句/表达式生效。

```js
// prettier-ignore
const a=42;

/* prettier-ignore */
const x=()=>{return      2;}

<>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</>;
```

::: warning
（虽未记录，但）Prettier 也支持尾部忽略注释。
然而，为了避免性能损失，我们不支持它。
在这种情况下，请更新您的代码。
:::

对于非 JS 文件，适用与 Prettier 相同的约定。
请参阅 Prettier 的 [文档](https://prettier.io/docs/ignore#html)。

对于 TOML 文件，不支持忽略注释。
