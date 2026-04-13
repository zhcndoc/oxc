---
title: AST 工具
outline: deep
---

# AST 工具

[AST 工具](https://github.com/oxc-project/oxc/tree/main/tasks/ast_tools) 任务是我们管理所有生成文件的秘密武器。
这些工具包括 AST 构建器、访问器、诸如 `ContentEq` 和 `ContentHash` 之类的 Trait，以及 TypeScript 类型——所有这些都是机器生成的。

例如，以下文件是自动生成的：

- `crates/oxc_ast/src/generated/ast_builder.rs`
- `crates/oxc_ast/src/generated/visit.rs`
- `crates/oxc_ast/src/generated/visit_mut.rs`
- `crates/oxc_ast/src/generated/derive_content_eq.rs`
- `crates/oxc_ast/src/generated/derive_content_hash.rs`
- `npm/oxc-types/src/generated/types.d.ts`

## 背景

Rust 的编译时间出了名的慢，而使用过程宏生成这么多代码会加剧这个问题。

要求用户在构建时等待代码生成完成会显著阻碍下游项目的开发体验。

冷构建和增量构建时间 [可能会急剧恶化](https://github.com/swc-project/swc/issues/7071)。

## RFC

团队在 [RFC: 生成与 AST 相关的代码](https://github.com/oxc-project/oxc/issues/4134) 中讨论了这个主题，并就以下需求和用户故事达成一致：

### 需求

- 不向用户发布 build.rs。
- 所有生成的代码都提交到 git。
- 不使用 nightly。
- Rust 代码是事实来源，需要解析标记为 `#[ast]` 的类型。
- 尽可能避免编译时过程宏。

### 工作流

- 用户更改仓库中的代码。
- 监视变更会捕获它。
- 解析所有标记为 `#[ast]` 的类型。
- 在模式中记录所有 AST 类型的详细信息。
- 从模式生成代码并保存到文件。

## 基础设施

更多细节随后跟进。
