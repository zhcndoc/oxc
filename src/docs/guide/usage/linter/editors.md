---
title: 设置编辑器
description: 在 VS Code、Zed、JetBrains 和其他编辑器中配置 Oxlint。
outline: 2
---

# 设置编辑器

编辑器扩展使用项目中的 `oxlint --lsp`，因此必须在本地安装 `oxlint`。

请参阅 [快速开始](./quickstart) 以安装 Oxlint。

## 支持的编辑器

- [VS Code](#vs-code)（以及 Cursor 等）
- [Zed](#zed)
- [JetBrains](#jetbrains)
- [Neovim](#neovim)
- [其他编辑器](#other-editors)

## VS Code

### 安装

从以下地址下载官方 Oxc VS Code 扩展：

- [Visual Studio 市场](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
- [Open VSX 注册表](https://open-vsx.org/extension/oxc/oxc-vscode)

**该扩展兼容其他基于 VS Code 的编辑器**，包括 Cursor。

### 团队设置

1. 向贡献者推荐该扩展：

`.vscode/extensions.json`：

```json [.vscode/extensions.json]
{
  "recommendations": ["oxc.oxc-vscode"]
}
```

2. 在 `.vscode/settings.json` 中启用保存时修复：

```json [.vscode/settings.json]
{
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "always"
  }
}
```

3. 启用类型感知 linting（可选）：

要为整个项目启用它，请在根目录 Oxlint 配置中设置：

::: code-group

```json [.oxlintrc.json]
{
  "options": {
    "typeAware": true
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
  },
});
```

:::

或在 `.vscode/settings.json` 中设置：

```json [.vscode/settings.json]
{
  "oxc.typeAware": true
}
```

当未设置 `oxc.typeAware` 时，编辑器使用根配置中的 `options.typeAware` 值。当显式设置时，它会覆盖配置值。

您还需要确保项目中安装了 `oxlint-tsgolint`。请参阅 [类型感知 linting 文档](/docs/guide/usage/linter/type-aware) 了解更多详情。

### 参考

- [oxc-project/oxc-vscode](https://github.com/oxc-project/oxc-vscode)

## Zed

### 安装

- [Oxc Zed 扩展](https://zed.dev/extensions/oxc)

### 参考

- [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed)

## JetBrains

IntelliJ IDEA 和 WebStorm。

### 安装

- [JetBrains 市场中的 Oxc](https://plugins.jetbrains.com/plugin/27061-oxc)

### 参考

- [oxc-project/oxc-intellij-plugin](https://github.com/oxc-project/oxc-intellij-plugin)

## Neovim

### nvim-lspconfig

```sh
npm i -g oxlint
```

```lua
vim.lsp.enable('oxlint')
```

- [nvim-lspconfig: oxlint](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#oxlint)

### coc.nvim

```vim
:CocInstall coc-oxc
```

- [oxc-project/coc-oxc](https://github.com/oxc-project/coc-oxc)

## 其他编辑器

对于支持 LSP 的编辑器（Emacs、Helix、Sublime），配置：

```bash
oxlint --lsp
```

## 参考

- [oxc_language_server](https://github.com/oxc-project/oxc/tree/main/crates/oxc_language_server)
