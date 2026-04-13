---
title: 调试
outline: deep
---

# 调试

## OXC_LOG 环境变量

`OXC_LOG` 环境变量启用 `oxlint` 和 `oxfmt` 中的运行时追踪。当未设置时，日志记录完全禁用以实现零成本操作。

### 基本用法

```bash
# 为 oxlint 启用调试日志
OXC_LOG=debug oxlint

# 为 oxfmt 启用调试日志
OXC_LOG=debug oxfmt

# 在使用 import 插件时启用解析器追踪
OXC_LOG=oxc_resolver oxlint --import-plugin

# 启用格式化器追踪
OXC_LOG=oxc_formatter oxfmt
```

### 过滤语法

`OXC_LOG` 使用 [tracing-subscriber](https://docs.rs/tracing-subscriber/latest/tracing_subscriber/filter/struct.EnvFilter.html) 过滤语法：

| 模式                         | 描述                             |
| ---------------------------- | -------------------------------- |
| `debug`                      | 为所有模块启用调试级别           |
| `trace`                      | 为所有模块启用追踪级别           |
| `oxc_resolver`               | 启用 oxc_resolver 模块的所有日志 |
| `oxc_resolver=debug`         | 为 oxc_resolver 启用调试级别     |
| `oxc_resolver=trace`         | 为 oxc_resolver 启用追踪级别     |
| `oxc_formatter,oxc_resolver` | 启用多个模块                     |

### 输出

日志写入 **stderr** 以避免干扰 stdout 上 linter 诊断或格式化代码的正常输出。在 `oxfmt` 中，包含线程名称和 span 计时信息以调试多线程操作。

### 常见用例

**列出所有正在处理的文件：**

```bash
OXC_LOG=debug oxlint
OXC_LOG=debug oxfmt
```

**调试模块解析问题：**

```bash
OXC_LOG=oxc_resolver=debug oxlint --import-plugin
```

## rust-lldb

rust-lldb 可用于从调试构建中获取 panic 信息。

启用调试符号：

```toml Cargo.toml
[profile.release]
debug = true
strip = false
panic = "unwind"
```

构建二进制文件：

```bash
cargo build --release --bin oxlint --features allocator
```

运行二进制文件：

```bash
rust-lldb -- ./target/release/oxlint
```

启动后，按 `r` 运行程序。

## 在 VSCode 中调试 TypeScript

根据他们的 [调试指南](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md#debugging-the-tests)，在 TypeScript 仓库中：

- 将 `.vscode/launch.template.json` 重命名为 `launch.json`
- 添加 `tests/cases/compiler/foo.ts`
- 将 `"${fileBasenameNoExtension}"` 改为 `foo.ts`
- 在 TypeScript 源代码的某处设置断点
- 从菜单 "Run - Debugging" 中，或按 F5
- 调试时，tsc 会在目标测试文件之前评估全局 `.d.ts` 文件
- `src/compiler/debug.ts` 中的 `Debug.formatXXX(value)` 可用于打印枚举值
- 使用 "WATCH" 部分来 "查看" 感兴趣的值

## 在 VSCode 中调试 Linter

使用 [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) 可以轻松调试其他地方的 npm 项目的 Linter。

在 `.vscode/launch.json` 中，根据需要将配置字段更改为：

- `cwd`: npm 项目的绝对路径
- `args`: 传递给 linter 的参数

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Debug Oxlint",
  "cargo": {
    "env": {
      "RUSTFLAGS": "-g"
    },
    "args": ["build", "--bin=oxlint", "--package=oxlint"],
    "filter": {
      "name": "oxlint",
      "kind": "bin"
    }
  },
  "cwd": "PATH-TO-TEST-PROJECT", // [!code focus]
  "args": ["--ARGS-TO-OXLINT"] // [!code focus]
}
```

打开 VS Code 调试面板并选择 `Debug Oxlint`，然后开始调试。

调试进程将以指定的 `cwd` 启动，就像在测试项目中运行 linter 并将调试器附加到其中一样。
