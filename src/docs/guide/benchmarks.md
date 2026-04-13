---
title: 所有基准测试
outline: deep
---

# 所有基准测试

## 解析器

Oxc 的解析器比 swc 快至少 3 倍，比 Biome 快 5 倍。

请注意，与 Biome 的比较并非完全对等。Biome 的解析器 [生成的是 CST](https://biomejs.dev/internals/architecture) 而不是 AST，这需要更多的工作。

参见仓库 [bench-javascript-parser-written-in-rust](https://github.com/oxc-project/bench-javascript-parser-written-in-rust)。

## 转换器

- 与 swc 相比，oxc 转换器快 4 倍，内存使用少 20%，包大小小 35 MB（swc 为 37MB）。
- 与 babel 相比，oxc 转换器快 40 倍，内存使用少 70%，大小小 19 MB，且需要安装的 npm 包少 168 个。

参见仓库 [bench-transformer](https://github.com/oxc-project/bench-transformer)。

## 代码检查器

Oxlint 比 ESLint 快 50 到 100 倍，具体取决于 CPU 核心数。

参见仓库 [bench-javascript-linter](https://github.com/oxc-project/bench-javascript-linter)。

## 格式化器

Oxfmt 比 Biome 快 3 倍，比 prettier 快 35 倍。

参见仓库 [bench-formatter](https://github.com/oxc-project/bench-formatter)。

## 模块解析器

`oxc-resolver` 比 webpack 的 `enhanced-resolve` 快 30 倍。

参见仓库 [bench-resolver](https://github.com/oxc-project/bench-resolver)。
