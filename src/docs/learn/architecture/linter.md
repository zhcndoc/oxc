---
title: Linter 架构
outline: deep
---

# Linter 架构

本文最初发布于 [leaysgur.github.io/posts](https://leaysgur.github.io/posts/2024/01/15/160838)，作者为 [@leaysgur](https://github.com/leaysgur)。

## apps/oxlint

`oxlint` 二进制文件是构建 `apps/oxlint` crate 中的 `main.rs` 的结果。

> [Cargo.toml 配置](https://github.com/oxc-project/oxc/blob/main/apps/oxlint/Cargo.toml)

在这里，它解析参数然后运行 `LintRunner`。

> [Lint 执行流程](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_cli/src/lint/main.rs#L17-L19)

## crates/oxc_diagnostics

`LintService` 将 `mpsc::channel` Sender 传递给 `oxc_diagnostics` 以接收 lint 结果。

> [接收 Lint 结果](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_diagnostics/src/service.rs#L96)

它格式化并显示接收到的消息。格式化由 `miette` crate 完成。

> [miette Crate 参考](https://github.com/zkat/miette)

## crates/oxc_linter

从 `LintService` 开始：

- 持有 `self.runtime` 作为 `Arc<Runtime>`
- `Runtime` 持有用于 lint 的路径
- 运行时，它使用 `rayon` 并行遍历 `Runtime` 路径
- 它发送一个 `None` 来完成

> [LintService 实现](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/service.rs#L51)

### `Runtime`: `process_path()`

- 从路径推断扩展名和内容
- 支持 `.[m|c]?[j|t]s` 或 `.[j|t]sx` 扩展名
- `.vue`、`.astro` 和 `.svelte` 例外，部分支持 `script` 块
- 处理 JavaScript 和 TypeScript 源文件
- 执行 linting 并将结果发送到 `DiagnosticService`

> [Runtime 路径处理](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/service.rs#L162)

### `Runtime`: `process_source()`

- 使用解析器将源代码处理为 AST
- 从 `SemanticBuilder` 创建 `LintContext` 并通过 `Linter` 运行

> [Runtime 源代码处理](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/service.rs#L206)

## crates/oxc_semantic: `SemanticBuilder`

`SemanticBuilder` 构建从源代码中提取的语义信息。

> [SemanticBuilder 源码](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_semantic/src/builder.rs#L156)

- `source_text`: 源代码
- `nodes`: AST 节点
- `classes`: 类
- `scopes`: 作用域
- `trivias`: 注释
- `jsdoc`: JSDoc
- 等等。

当 `SemanticBuilder` 构建时，它生成 `SemanticBuilderReturn`，但只有 `Semantic` 被传递给 `LintContext`。

> [SemanticBuilder 返回值](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_semantic/src/lib.rs#L34)

## crates/oxc_linter: `LintContext`

> [LintContext 源码](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/context.rs#L14)

表示上下文，以 `Semantic` 为主体。它包含每条信息的 getter 以及像 `diagnostic()` 这样用于通知 lint 问题的方法。

## crates/oxc_linter: `Linter`

> [Linter 源码](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/lib.rs#L140)

此 `Linter` 的 `run()` 函数是 lint 过程的核心。

- `Linter` 在 `self.rules` 中持有要在目标源上执行的规则
- 每个规则可以根据 trait 实现三种类型的处理
- 它按顺序执行这三种模式

对于当前已实现的规则，请参考此列表。

> [已实现的规则](https://github.com/oxc-project/oxc/blob/oxlint_v0.2.0/crates/oxc_linter/src/rules.rs)

对于添加新规则，记得更新此列表。

## Linter 示例

仓库提供了创建 linter 的最小代码配置。

> [最小化 Linter 代码](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/examples/linter.rs)
