---
title: 代码检查工具
outline: deep
---

# 代码检查工具

## 贡献新规则

请参阅 [添加规则](./linter/adding-rules.md) 指南，了解如何向 Oxlint 添加新规则。

## 开发

创建一个 `./test.ts` 文件，然后

```bash
just watch "cargo run --bin oxlint -- test.ts"
```

或者针对规则进行测试和过滤：

```bash
just watch "cargo test -p oxc_linter -- rule-name"
```

### 在整个代码库上测试 oxlint

要在整个代码库上测试 oxlint，例如使用大型 JavaScript/TypeScript 项目测试您的更改，您可以构建 `oxlint` CLI 并针对该代码库运行它。

```bash
# 在 oxc 仓库中构建 oxlint cli
just oxlint-node
# 然后在想要测试的代码库目录中，使用 node 运行 oxlint：
node <path-to-oxc-repo>/apps/oxlint/dist/cli.js
# 您也可以向其传递标志，例如 -D 启用特定规则，以及 --disable-x-plugin 关闭默认插件：
node <path-to-oxc-repo>/apps/oxlint/dist/cli.js -D rulename --disable-unicorn-plugin --disable-oxc-plugin --disable-typescript-plugin
```

### 快照测试

[`cargo insta`](https://insta.rs/docs) 用于快照测试。

运行 `cargo test -p oxc_linter` 并调用 `Tester::new(RULE::NAME, pass, fail).test_and_snapshot()` 行后，将生成一个新的 `rule.snap.new` 文件。

使用 `cargo insta accept` 接受所有快照更改。

## 规则类别

- **correctness** - 完全错误或无用的代码
- **suspicious** - 很可能错误或无用的代码
- **pedantic** - 较为严格或偶尔有误报的检查
- **perf** - 可以编写得运行更快的代码
- **style** - 应以更惯用方式编写的代码
- **restriction** - 启用前应个案考虑的检查。
- **nursery** - 仍在开发中的新检查
