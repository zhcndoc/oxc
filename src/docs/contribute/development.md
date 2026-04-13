---
title: 入门指南
outline: deep
---

# 入门指南

## 克隆仓库

```bash
git clone -c core.longpaths=true git@github.com:oxc-project/oxc.git
```

## 设置项目

### 安装 Rust

如果您尚未安装 Rust，请遵循 [官方说明](https://www.rust-lang.org/tools/install) 并安装 Rust。

安装 Rust 后，在项目根目录运行以下命令：

```bash
rustup show
```

`rustup show` 读取 `./rust-toolchain.toml` 文件并为该项目安装正确的 Rust 工具链和组件。

### `cargo binstall`

开发 OXC 需要一些 Cargo 工具，推荐使用 [cargo binstall](https://github.com/cargo-bins/cargo-binstall)，它提供了一种低复杂度的机制来安装 Rust 二进制文件，并且比通过运行 `cargo install` 从源代码构建它们更快。

```bash
cargo install cargo-binstall
```

您也可以下载 [预编译二进制文件](https://github.com/cargo-bins/cargo-binstall#installation) 并将其保存在 `~/.cargo/bin` 中。

### `just`

OXC 使用 [`just`](https://github.com/casey/just)，这是一种保存和运行项目特定命令的便捷方式：

```bash
cargo binstall just -y
```

### 安装 CMake

通过官方 [网站](https://cmake.org/download/) 下载安装 CMake。

[Homebrew](https://brew.sh/) 用户也可以使用以下命令安装：

```bash
brew install cmake
```

### 安装 pnpm

按照官方 [网站](https://pnpm.io/installation) 的说明安装 `pnpm`（一个用于 node.js 的包管理器，类似于 `npm`）。

#### 依赖

在项目根目录的 `justfile` 中运行以下命令以安装依赖：

```bash
just init
```

运行 `just` 可以查看可用命令列表。

您可以运行 `just ready`（或简写为 `just r`）以确保整个项目构建和运行正确。

## macOS：更快的编译速度

macOS 有一个名为 XProtect 的防病毒功能，会在首次运行时扫描可执行文件是否包含恶意软件。这可能会显著减慢 Rust 构建速度，尤其是构建脚本和测试可执行文件。您可以通过在系统设置中将终端添加为“开发工具”来加快编译速度：

1. 打开系统设置 > 隐私与安全性 > 开发工具
2. 添加您的终端应用（Terminal、iTerm 等）
3. 重启终端应用

**注意：** 这会禁用一项操作系统安全功能。仅在您接受这种权衡的情况下执行此操作。

更多详情：https://nnethercote.github.io/2025/09/04/faster-rust-builds-on-mac.html
