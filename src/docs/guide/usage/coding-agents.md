---
title: "编码代理｜Oxlint 和 Oxfmt"
description: 配置编码代理以使用 Oxlint 和 Oxfmt。
---

# 编码代理

配置编码代理，使其在编辑工作流中运行 Oxlint 和 Oxfmt。

这些示例使用 `npx` 运行本地安装的软件包。如有需要，将其替换为 `pnpm exec`、`yarn exec` 或 `bunx`。

## Codex

[Codex 会在开始工作前读取 `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。将以下说明添加到项目根目录中的 `AGENTS.md`：

```md [AGENTS.md]
## Linting and formatting

- After making code changes, run `npx oxlint --fix`, then run `npx oxfmt`.
- Before finishing, run `npx oxlint --deny-warnings --format=agent`.
```

Codex 会在会话开始时加载项目说明。添加或更改 `AGENTS.md` 后，启动新会话。

## Claude Code

[Claude Code 钩子](https://code.claude.com/docs/en/hooks-guide#auto-format-code-after-edits)可以在 Claude 编辑文件后运行 Oxlint 和 Oxfmt。

安装 [Oxlint](./linter/quickstart)、[Oxfmt](./formatter/quickstart) 和 [`jq`](https://jqlang.org/download/)，然后将此项目钩子合并到 `.claude/settings.json`：

```json [.claude/settings.json]
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(jq -r '.tool_input.file_path'); npx oxlint --fix --no-error-on-unmatched-pattern \"$file\"; npx oxfmt --no-error-on-unmatched-pattern \"$file\""
          }
        ]
      }
    ]
  }
}
```

该钩子会应用安全的 lint 修复，并格式化已编辑的文件。不支持的文件会被跳过。在 Claude Code 中运行 `/hooks`，以确认钩子已注册。
