---
title: 设置编辑器
description: 在 VS Code、Zed、JetBrains 和其他编辑器中配置 Oxfmt。
outline: 2
---

# 设置编辑器

编辑器扩展使用项目中的 `oxfmt --lsp`，因此必须在本地安装 `oxfmt`。

参见 [快速开始](./quickstart) 安装 Oxfmt。

## 支持的编辑器

- [VS Code](#vs-code)（以及 Cursor 等）
- [Zed](#zed)
- [JetBrains](#jetbrains)
- [Neovim](#neovim)
- [其他编辑器](#other-editors)

## VS Code

### 安装

从以下地址下载官方 Oxc VS Code 扩展：

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
- [Open VSX Registry](https://open-vsx.org/extension/oxc/oxc-vscode)

**该扩展兼容其他基于 VS Code 的编辑器**，包括 Cursor。

### 团队设置

1. 向贡献者推荐该扩展：

`.vscode/extensions.json`：

```json [.vscode/extensions.json]
{
  "recommendations": ["oxc.oxc-vscode"]
}
```

2. 在 `.vscode/settings.json` 中启用保存时格式化：

```json [.vscode/settings.json]
{
  "oxc.fmt.configPath": ".oxfmtrc.json",
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

按语言设置：

```json [.vscode/settings.json]
{
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
    "editor.formatOnSave": true
  }
}
```

### 参考

- [oxc-project/oxc-vscode](https://github.com/oxc-project/oxc-vscode)

## Zed

### 安装

- [Oxc Zed Extension](https://zed.dev/extensions/oxc)

### 参考

- [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed)

## JetBrains

IntelliJ IDEA 和 WebStorm。

### 安装

- [Oxc in JetBrains Marketplace](https://plugins.jetbrains.com/plugin/27061-oxc)

### 参考

- [oxc-project/oxc-intellij-plugin](https://github.com/oxc-project/oxc-intellij-plugin)

## Neovim

### nvim-lspconfig

```sh
npm i -g oxfmt
```

```lua
vim.lsp.enable('oxfmt')
```

- [nvim-lspconfig: oxfmt](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#oxfmt)

### conform.nvim

```lua
require("conform").setup({
  formatters_by_ft = {
    javascript = { "oxfmt" },
    javascriptreact = { "oxfmt" },
    typescript = { "oxfmt" },
    typescriptreact = { "oxfmt" },
    json = { "oxfmt" },
    vue = { "oxfmt" },
  },
})
```

- [conform.nvim](https://github.com/stevearc/conform.nvim)

### coc.nvim

```vim
:CocInstall coc-oxc
```

- [oxc-project/coc-oxc](https://github.com/oxc-project/coc-oxc)

## 其他编辑器

对于支持 LSP 的编辑器（Emacs、Helix、Sublime），配置：

```sh
oxfmt --lsp
```

或者，对于不支持 LSP 的编辑器：

```sh
cat foo/bar.js | oxfmt --stdin-filepath dummy.js --config ./path/to/config.json
```

## 参考

- [oxc_language_server](https://github.com/oxc-project/oxc/tree/main/crates/oxc_language_server)
