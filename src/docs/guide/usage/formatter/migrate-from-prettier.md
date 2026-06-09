---
title: "从 Prettier 迁移 | Oxfmt"
---

# 从 Prettier 迁移

本指南涵盖从 Prettier 迁移到 Oxfmt 的内容。

## 何时从 Prettier 迁移

如果你想保留类似 Prettier 的工作流，同时获得更快的格式化速度和内置格式化功能，就迁移到 Oxfmt。若你希望 Oxfmt 成为更大的一体化工具链的一部分，则改用 [Vite+](https://npmx.dev/package/vite-plus)。

- 使用 Oxfmt 进行专用格式化。
- 使用 [Vite+](https://npmx.dev/package/vite-plus) 获得集成化工作流。
- 如果仍然需要精确的插件行为，则继续使用 Prettier。

## 快速开始

对于简单的设置，只需一条命令即可迁移：

::: code-group

```bash [npm]
$ npm add -D oxfmt@latest && npx oxfmt --migrate=prettier && npx oxfmt
```

```bash [pnpm]
$ pnpm add -D oxfmt@latest && pnpm oxfmt --migrate=prettier && pnpm oxfmt
```

```bash [yarn]
$ yarn add -D oxfmt@latest && yarn oxfmt --migrate=prettier && yarn oxfmt
```

```bash [bun]
$ bun add -D oxfmt@latest && bunx oxfmt --migrate=prettier && bunx oxfmt
```

:::

## 使用 Skills 迁移

[`migrate-oxfmt`](https://skills.sh/oxc-project/oxc/migrate-oxfmt) 技能提供交互式、由 agent 引导的迁移。将其安装到你的编码 agent 中：

```bash
npx skills add https://github.com/oxc-project/oxc --skill migrate-oxfmt
```

安装完成后，运行 `/migrate-oxfmt` 来执行迁移。

## 迁移之前

对于许多配置，Oxfmt 与 Prettier v3.8 兼容。

主要区别：

- 默认 `printWidth` 为 100（Prettier 使用 80）
- 不支持 Prettier 插件（尽管一些流行的插件已原生实现）
- 不支持某些选项（参见 [配置参考](/docs/guide/usage/formatter/config-file-reference.html)）

详见 [不支持的功能](/docs/guide/usage/formatter/unsupported-features)，文件类型支持参见 [兼容性矩阵](/compatibility)。

## 步骤 1：升级 Prettier 到 v3.8（可选）

Oxfmt 的输出与 Prettier v3.8 最为接近。先升级可以将格式化差异降到最低。

## 步骤 2：安装 Oxfmt

::: code-group

```bash [npm]
$ npm add -D oxfmt@latest
```

```bash [pnpm]
$ pnpm add -D oxfmt@latest
```

```bash [yarn]
$ yarn add -D oxfmt@latest
```

```bash [bun]
$ bun add -D oxfmt@latest
```

```bash [deno]
$ deno add -D npm:oxfmt@latest
```

:::

## 步骤 3：迁移配置

Oxfmt 使用 `.oxfmtrc.json`、`.oxfmtrc.jsonc` 或 `oxfmt.config.ts`。基本示例：

```jsonc [.oxfmtrc.jsonc]
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 80,
}
```

运行 `oxfmt --migrate prettier` 自动转换你的 Prettier 配置。

### `prettierrc.js` 示例

之前：

```js [prettierrc.js]
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
};
```

之后（`oxfmt.config.ts`）：

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
});
```

### `prettierrc.yaml` 示例

之前：

```yaml [prettierrc.yaml]
trailingComma: "es5"
tabWidth: 4
semi: false
singleQuote: true
```

之后（`.oxfmtrc.jsonc`）：

```jsonc [.oxfmtrc.jsonc]
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  "printWidth": 80,
}
```

## 步骤 4：更新脚本

### `package.json` 脚本

```diff
{
  "scripts": {
-   "format": "prettier --write .",
+   "format": "oxfmt",
-   "format:check": "prettier --check ."
+   "format:check": "oxfmt --check"
  }
}
```

### CI 工作流

```diff
  - name: Check formatting
-   run: yarn prettier --check .
+   run: yarn oxfmt --check
```

### Git hooks (husky, lint-staged)

在 `package.json` 中：

```diff
"lint-staged": {
- "*": "prettier --write --no-error-on-unmatched-pattern"
+ "*": "oxfmt --no-error-on-unmatched-pattern"
}
```

## 步骤 5：运行格式化程序

```sh
npm run format
```

如果不再需要，请卸载 Prettier。

## 可选步骤

### 更新编辑器集成

参见 [设置编辑器](./editors)。

### 更新文档

如果适用，更新 `CONTRIBUTING.md`、`AGENTS.md` 和 `CLAUDE.md` 中对 Prettier 的引用。

### 更新 lint 规则

如果存在，请移除 `eslint-plugin-prettier`。如果需要，可以在 CI 流水线中用 `oxfmt --check` 任务替换它。

请注意，如果你打算继续使用 ESLint，你 _应该_ 保留或添加 [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) 以禁用可能与 Oxfmt 冲突的样式相关 ESLint 规则。`eslint-config-prettier` 不同于 `eslint-plugin-prettier`，因为它没有新的 lint 规则。它只是一个配置。

此外，考虑迁移到 [Oxlint](../linter.md)。

### 更新 `.git-blame-ignore-revs`

将重新格式化的提交 SHA 添加到 `.git-blame-ignore-revs` 以在 `git blame` 中隐藏它。

### 将 `.prettierignore` 替换为 `"ignorePatterns"`

如果你不再使用 Prettier，可以选择将其内容从 `.prettierignore` 移动到 Oxfmt 配置中的 `"ignorePatterns"`。请注意，`.prettierignore` 全局生效，而 `ignorePatterns` 仅作用于其所属的配置文件。在 [嵌套配置](./config#create-a-config-file) 设置中，这可能会改变哪些文件会被忽略。更多信息请参见 [忽略文件](/docs/guide/usage/formatter/ignore-files)。

### 更新 `// prettier-ignore` 注释

Oxfmt 支持 `// prettier-ignore` 注释，同时也支持 `// oxfmt-ignore` 注释。

不过，`// oxfmt-ignore` 仅适用于 JS 和 TS 文件。更多信息请参见 [行内忽略注释](/docs/guide/usage/formatter/ignore-comments)。
