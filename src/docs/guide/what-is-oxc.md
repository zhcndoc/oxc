---
title: 什么是 Oxc？
description: 最快的 JavaScript 和 TypeScript 工具链。
---

# 什么是 Oxc？

/oʊ ɛks siː/

Oxidation Compiler 是一套用 Rust 编写的高性能 JavaScript 和 TypeScript 工具集合。

Oxc 是 [VoidZero](https://voidzero.dev) 为 JavaScript 构建统一、高性能工具链愿景的一部分。它为 [Rolldown](https://rolldown.rs)（[Vite](https://vitejs.dev) 未来的打包器）提供动力，并赋能下一代无缝协作的超快开发工具。

<sub>\* Oxidation 是产生锈的化学过程</sub>

## 全栈最快的工具

Oxc 专注于整个工具链的性能。这包括解析、模块解析、lint 检查、格式化、转换和压缩。

## 理念

Oxc 围绕几个核心理念构建。

### 性能是一项特性

Oxc 将速度视为产品需求。更快的工具可以改善本地反馈循环并降低 CI 成本。性能回归被视为缺陷。

### 一个工具链，共享构建块

Oxc 是一套套件。像 lint 工具、格式化工具、解析器、转换器、压缩器和解析器这样的工具都是基于共享组件构建的。这减少了重复工作，并使整个栈的行为更加一致。

### 正确性与清晰的边界

Oxc 旨在做到正确且可预测。当行为与其他工具不同时，应记录这些差异。兼容性是一项特性，而非偶然。

### 实用的开发者体验

Oxc 专注于适用于真实项目的工作流。默认值应当合理，配置应当易懂，输出应当稳定。

## 你能获得什么

Oxc 包括终端用户工具和可复用的编译器构建块：

- [Oxlint](/docs/guide/usage/linter) 是最快的 JavaScript 和 TypeScript lint 工具。它旨在兼容 ESLint 生态系统。
- [Oxfmt](/docs/guide/usage/formatter) 是最快的格式化工具。它旨在兼容 Prettier 格式化。
- [Parser](/docs/guide/usage/parser) 是最快的 JS 和 TS 解析器，带有用于工具开发的 AST。
- [Transformer](/docs/guide/usage/transformer) 提供最快的 TS、JSX 和现代 JavaScript 转换。
- [Minifier](/docs/guide/usage/minifier) 是最快的生产输出压缩器。
- [Resolver](/docs/guide/usage/resolver) 是最快的 JS 和 TS 项目模块解析器。

你可以单独使用每个工具，也可以将它们作为一个工具链一起使用。

## Oxc 适合谁

- **应用和库开发者** 希望在本地和 CI 中拥有最快的 lint 和 format 循环。
- **工具链和平台团队** 希望拥有大规模的快速编译器级基础架构。
- **工具作者** 希望为 JS 工具获取快速可复用的 crates 或 npm 包。
