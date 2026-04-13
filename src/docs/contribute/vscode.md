---
title: VS Code 扩展
outline: deep
---

# VS Code 扩展

::: tip
本页面用于贡献 Oxc VS Code 扩展。
要下载扩展，请参阅 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) 或 [Open VSX Registry](https://open-vsx.org/extension/oxc/oxc-vscode)。
:::

## 开发

克隆 [oxc-vscode](https://github.com/oxc-project/oxc-vscode) 仓库并运行 `pnpm install`。

## 本地构建和运行扩展

有两种选项可以运行和测试你对 Oxc VS Code 扩展的更改。

**通过命令行：**

- 运行 `pnpm build` 来编译 VS Code 扩展并构建语言服务器的发布版本。
- 运行 `pnpm install-extension` 将其安装到 VS Code 中。
- 按下 `Ctrl` + `Shift` + `P` 并搜索 "Developer: Reload Window"。
- 你现在可以在 VS Code 内部手动测试你的更改。

**通过 VS Code 本身：**

- 在 VS Code 中打开 `oxc-vscode` 仓库。
- 进入编辑器左侧边栏中的 "Run and Debug" 选项卡。
- 选择 `Launch VS Code Extension` 配置。
- 点击顶部的绿色播放按钮。
- 这将构建 VS Code 扩展并启动一个新的 VS Code 窗口，其中已安装新构建的 VS Code 扩展。

### 测试 `oxlint`/`oxfmt` 的未发布版本

使用以下命令在 [oxc 项目](https://github.com/oxc-project/oxc) 中构建项目：

```bash
cd apps/oxlint && pnpm build-test
cd ../oxfmt && pnpm build-test
```

然后通过 `settings.json` 中的扩展设置配置 VS Code 扩展以使用本地构建：

```json
{
  "oxc.path.oxlint": "/path/to/oxc/apps/oxlint/dist/cli.js",
  "oxc.path.oxfmt": "/path/to/oxc/apps/oxfmt/dist/cli.js"
}
```

### 使用输出通道

要查看扩展和语言服务器正在做什么，请使用 VS Code 中的 `Oxc` 输出通道。
要获取更多信息，请在 `settings.json` 中启用以下扩展设置：

```json
{
  "oxc.trace.server": "verbose"
}
```

在 `oxlint`/`oxfmt` 的语言服务器集成中（例如，`oxc_language_server` crate），你可以使用 `info!` 或 `error!` 宏将消息发送到 VS Code 中的 `Oxc` 输出通道。

### 编写测试

根据你的更改，你应该创建一个测试。
仅当测试特定于 VS Code 时，才在 VS Code 扩展中编写测试。
与工具进行 LSP 通信的测试应添加在 `oxlint/oxfmt` 或 Rust crate `oxc_language_server` 中。

示例：

- VS Code：状态栏更改
- oxlint：返回的诊断信息 / 代码操作
- oxc_language_server：工作区问题
