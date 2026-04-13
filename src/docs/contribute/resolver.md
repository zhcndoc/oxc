---
title: 解析器
outline: deep
---

# 解析器

Oxc 解析器是一个高性能的 Node.js 模块解析实现，兼容 webpack 的 enhanced-resolve。它在 [独立的 GitHub 仓库](https://github.com/oxc-project/oxc_resolver) 中维护。

## 架构

该解析器设计为 [enhanced-resolve](https://github.com/webpack/enhanced-resolve) 的直接移植版本，并具有显著的性能改进：

- 比 enhanced-resolve **快 28 倍**
- 尽可能使用**零拷贝字符串操作**
- **优化的路径遍历**算法
- **高效的缓存**策略
