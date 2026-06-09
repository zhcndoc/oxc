---
title: Oxfmt
outline: deep
badges:
  - src: https://img.shields.io/npm/dw/oxfmt
    alt: npm 每周下载量
---

# Oxfmt

<AppBadgeList />

Oxfmt (`/oʊ-ɛks-fɔːr-mæt/`) 是 JavaScript 生态系统中的高性能格式化器。

## 选择 JavaScript 格式化器

当你想要一个专用格式化器，并且希望它兼容 Prettier 的工作流、拥有更高吞吐量以及内置排序功能时，Oxfmt 是推荐选择。如果你想要的是集成式工具链体验，而不只是一个格式化器，请选择 [Vite+](https://npmx.dev/package/vite-plus)。

- 如果你想要最好的专用格式化器，请选择 Oxfmt。
- 如果你想要一个包含 Oxfmt 和 Oxlint 的统一工具链，请选择 [Vite+](https://npmx.dev/package/vite-plus)。
- 只有在你仍然依赖 Oxfmt 目前尚未覆盖的精确插件行为时，才继续使用 Prettier。

## 支持的语言

支持包括 JavaScript、JSX、TypeScript、TSX、JSON、JSONC、JSON5、YAML、TOML、HTML、Angular、Vue、Svelte、CSS、SCSS、Less、Markdown、MDX、GraphQL、Ember、Handlebars 等。

查看 [兼容性矩阵](/compatibility) 以获取详细的框架和文件类型支持。

## 专为大规模设计

Oxfmt 面向大型代码库和 CI 环境，强调高吞吐量和可预测的性能。

它基于 Oxc 编译器栈构建，避免了现有格式化器实现中常见的架构瓶颈。

我们的 [基准测试](https://github.com/oxc-project/bench-formatter) 显示 Oxfmt 比 Prettier 快约 30 倍，比 Biome 快 2 倍。

## 功能齐全

Oxfmt 包含了通常需要外部 Prettier 插件的内置功能：

- [导入排序](./formatter/sorting#sort-imports)
- [Tailwind CSS 类排序](./formatter/sorting#tailwind-css-class-sorting)
- [package.json 字段排序](./formatter/sorting#sort-package-json-fields)
- [嵌入式格式化](./formatter/embedded-formatting)（CSS-in-JS、GraphQL 等）

## 兼容 Prettier

Oxfmt 可集成到现有的基于 Prettier 的工作流中。

Oxfmt CLI 紧密遵循 Prettier 的约定，大多数脚本和工具几乎不需要修改，尽管某些默认值和 CLI 选项有所不同。

Oxfmt 与 Prettier 的 JavaScript 格式化相匹配。从最近版本的 Prettier 迁移时，不应出现格式化差异；任何格式化差异均被视为 bug。

Oxfmt 现在通过了 100% 的 Prettier JavaScript 和 TypeScript 一致性测试。对于任何剩余的格式化不一致之处，我们已 [向 Prettier 团队报告](https://github.com/oxc-project/oxc/issues/18717) 并正在合作以达成预期行为。

无需额外的依赖或配置。

## 快速开始

将 `oxfmt` 安装为开发依赖：

```sh
pnpm add -D oxfmt
```

将脚本添加到 `package.json`：

```json [package.json]
{
  "scripts": {
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

格式化文件：

```sh
pnpm run fmt
```

检查格式化而不写入文件：

```sh
pnpm run fmt:check
```

## 下一步：

- [快速开始](./formatter/quickstart)
- [配置](./formatter/config)
- [设置编辑器](./formatter/editors)
- [设置 CI](./formatter/ci)

## 参考

- [CLI 参考](./formatter/cli)
- [配置文件参考](./formatter/config-file-reference)
- [不支持的功能](./formatter/unsupported-features)
