# 压缩器

一种高性能压缩器，通过移除未使用的代码并将其转换为更短的等价形式来缩减你的代码。

## 特性

- [消除死代码。](./minifier/dead-code-elimination)
- [将语法转换为更短且更重复的输出。](./minifier/syntax-normalization)
- [混淆变量名。](./minifier/mangling)
- [移除空白和注释。](./minifier/whitespace-stripping)

## 假设

为了实现更好的优化，Oxc 压缩器会对你的代码做出一些假设。更多信息请参见 [假设文档](https://github.com/oxc-project/oxc/blob/main/crates/oxc_minifier/docs/ASSUMPTIONS.md)。

## 常见问题

有关常见问题，请参见 [常见问题](./minifier/faq)。

## 安装

### 使用 Rolldown

如果你正在使用 [Rolldown][url-rolldown]，`oxc-minify` 将默认用于压缩。无需额外安装。

### Node.js

- 使用 node 绑定 [oxc-minify][url-oxc-minify-npm]。
- 在 [stackblitz](https://stackblitz.com/fork/github/oxc-project/website/tree/main/stackblitz-templates/oxc-minify) 上试用。

### Rust

使用带有 `minifier` 特性的总仓库 crate [oxc][url-oxc-crate]。

Rust 使用示例可在 [这里](https://github.com/oxc-project/oxc/blob/main/crates/oxc_minifier/examples/minifier.rs) 找到。

## 集成

- [`unplugin-oxc`](https://npmx.dev/package/unplugin-oxc)

<!-- 链接 -->

[url-oxc-crate]: https://docs.rs/oxc
[url-oxc-minify-npm]: https://npmx.dev/package/oxc-minify
[url-rolldown]: https://rolldown.rs
