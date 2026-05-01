---
title: 解析器
outline: deep
badges:
  - src: https://img.shields.io/crates/d/oxc_resolver
    alt: 来自 crates.io 的总下载量
---

# 解析器

<AppBadgeList />

一个高性能的模块解析器，主要支持 Node.js 解析算法，并且可配置。

## 特性

- 所有配置都与 [webpack/enhanced-resolve][url-enhanced-resolve] 保持一致。
- 比 [webpack/enhanced-resolve][url-enhanced-resolve] 快 28 倍（[基准测试](https://github.com/oxc-project/bench-resolver)）。
- 参见 [README](https://github.com/oxc-project/oxc-resolver)

## 安装

### Node.js

- 使用 node 绑定 [oxc-resolver][url-oxc-resolver-npm]。
- 在 [stackblitz](https://stackblitz.com/edit/oxc-resolver) 上试用。

### Rust

参见 [https://crates.io/crates/oxc_resolver][url-oxc-resolver-crate] 及其文档 [https://docs.rs/oxc_resolver][url-oxc-resolver-docs]。

<!-- Links -->

[url-oxc-resolver-crate]: https://crates.io/crates/oxc_resolver
[url-oxc-resolver-docs]: https://docs.rs/oxc_resolver
[url-oxc-resolver-npm]: https://npmx.dev/package/oxc-resolver
[url-enhanced-resolve]: https://github.com/webpack/enhanced-resolve
