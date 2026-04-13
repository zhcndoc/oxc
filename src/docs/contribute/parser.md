---
title: 解析器
outline: deep
---

# 解析器

Oxc 解析器旨在成为可用最快且最符合标准的 JavaScript 和 TypeScript 解析器。贡献解析器需要了解实现细节和广泛的测试基础设施。

## 架构概述

解析器遵循传统的编译器前端架构：

```
Source Text → Lexer → Tokens → Parser → AST
```

### 关键组件

- **词法分析器 (Lexer)**：将源文本标记化为结构化的令牌
- **解析器 (Parser)**：构建 AST 的递归下降解析器
- **抽象语法树 (AST)**：内存高效的抽象语法树
- **错误恢复 (Error Recovery)**：高级错误处理和恢复
- **语义分析 (Semantic Analysis)**：符号解析和作用域管理

### 设计目标

我们的目标是成为最快的基于 Rust 的可供生产使用的解析器，具有：

- **速度**：比 SWC 快 3 倍，比 Biome 快 5 倍
- **符合性**：100% 符合 Test262，99%+ 兼容 Babel/TypeScript
- **内存效率**：基于 Arena 的分配，最小化堆使用
- **错误质量**：带有恢复功能的有帮助的错误消息

## 开发工作流

### 设置环境

```bash
# 运行解析器测试
cargo test -p oxc_parser

# 运行符合性测试
just c  # 或 `just coverage`
```

### 项目结构

```
crates/oxc_parser/
├── src/
│   ├── lib.rs              # 公共 API
│   ├── lexer/              # 词法分析
│   ├── parser/             # 解析逻辑
│   ├── cursor.rs           # 令牌流管理
│   └── diagnostics.rs      # 错误处理
├── tests/                  # 单元测试
└── examples/               # 使用示例
```

### 核心解析器文件

- **`parser/mod.rs`**：主解析器入口点
- **`parser/statement.rs`**：语句解析
- **`parser/expression.rs`**：表达式解析
- **`parser/typescript.rs`**：TypeScript 特定解析
- **`parser/jsx.rs`**：JSX 解析逻辑

## 符合性测试

### 运行符合性测试

```bash
just c
```

这使用 [tasks/coverage](https://github.com/oxc-project/oxc/tree/main/tasks/coverage) 中的运行器运行符合性测试套件：

### Test262 - ECMAScript 符合性

JavaScript 拥有称为 Test262 的 [ECMAScript 测试套件](https://github.com/tc39/test262)。
Test262 的目标是提供涵盖规范中指定的每种可观察行为的测试材料。

解析器符合性使用 [解析阶段测试](https://github.com/tc39/test262/blob/main/INTERPRETING.md#negative)。

**当前状态**: `43765/43765 (100.00%)`

### Babel 解析器测试

当新的语言特性被添加到 JavaScript 时，Babel 会首先实现它们。
Babel 拥有针对前沿特性的全面 [解析器测试](https://github.com/babel/babel/tree/main/packages/babel-parser/test)。

**当前状态**: `2093/2101 (99.62%)`

### TypeScript 符合性

TypeScript 符合性测试可以在 [这里](https://github.com/microsoft/TypeScript/tree/main/tests/cases/conformance) 找到。

**当前状态**: `6470/6479 (99.86%)`

### 查看结果

测试结果存储在快照文件中以跟踪更改：

- [`parser_test262.snap`](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_test262.snap)
- [`parser_babel.snap`](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_babel.snap)
- [`parser_typescript.snap`](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_typescript.snap)
