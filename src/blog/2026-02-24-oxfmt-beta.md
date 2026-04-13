---
title: "Oxfmt Beta 版"
outline: deep
authors:
  - boshen
  - Dunqing
  - leaysgur
---

<AppBlogPostHeader />

我们很高兴地宣布 Oxfmt 已进入 Beta 阶段。

Oxfmt 是一个基于 Rust 驱动、与 Prettier 兼容的代码格式化程序，专为 JavaScript 生态系统构建。它旨在与现代工具链完全兼容，同时显著提升性能。

在基准测试中，在无缓存的首次运行中，Oxfmt 的速度比 Prettier 快 30 倍以上，比 Biome 快 3 倍。查看完整的 [基准测试](https://github.com/oxc-project/bench-formatter) 结果。

自 12 月的 Alpha 版本发布以来，我们扩展了对更多文件格式的支持，添加了嵌入式语言格式化，引入了导入排序，集成了 Tailwind CSS 支持，并带来了许多稳定性和兼容性改进。

Oxfmt 已经在生态系统中得到了广泛采用。使用 Oxfmt 的项目包括：[openclaw/openclaw](https://github.com/openclaw/openclaw)、[vuejs/core](https://github.com/vuejs/core)、[vercel/turborepo](https://github.com/vercel/turborepo)、[huggingface/huggingface.js](https://github.com/huggingface/huggingface.js)、[getsentry/sentry-javascript](https://github.com/getsentry/sentry-javascript)、[npmx-dev/npmx.dev](https://github.com/npmx-dev/npmx.dev) 以及更多。

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

### 从 Prettier 迁移

安装、迁移配置并重新格式化，只需一条命令：

```sh
pnpm add -D oxfmt && pnpm oxfmt --migrate prettier && pnpm oxfmt
```

完整迁移指南，请参阅 [从 Prettier 迁移](/docs/guide/usage/formatter/migrate-from-prettier.html)。

### AI 迁移提示词

或者，你可以将此提示词复制到你的 AI 编程助手以迁移你的项目：

```
按照 https://oxc.rs/docs/guide/usage/formatter.html 将此项目从 Prettier 迁移到 Oxfmt：
1. 安装 oxfmt 并运行 `oxfmt --migrate prettier`
2. 更新 package.json 脚本以使用 oxfmt
3. 更新 CI 工作流以使用 `oxfmt --check`
4. 更新 lint-staged 以使用 `oxfmt --no-error-on-unmatched-pattern`
5. 运行 oxfmt 重新格式化所有文件
6. 卸载 prettier 及相关包
7. 更新编辑器设置以支持 oxfmt
8. 如果 CONTRIBUTING.md、AGENTS.md 或 CLAUDE.md 中提到了 prettier，请更新它们
```

更多详细说明，请查看 [Oxfmt 文档](https://oxc.rs/docs/guide/usage/formatter.html)。

## 自 Alpha 版本以来的新功能亮点

### 100% Prettier 兼容性

Oxfmt 现在通过了 Prettier 100% 的 JavaScript 和 TypeScript 一致性测试。对于少数剩余的格式化不一致之处，我们已 [向 Prettier 团队报告](https://github.com/oxc-project/oxc/issues/18717) 并正在协作以达成预期行为的一致。

这意味着你可以放心地从 Prettier 迁移到 Oxfmt，确信你的代码将被相同地格式化。如果你遇到任何未覆盖的情况，请 [报告它们](https://github.com/oxc-project/oxc/issues/new?template=formatter_diff_report.yaml)。

### 更多文件格式支持

Oxfmt 现在支持格式化 JavaScript、JSX、TypeScript、TSX、JSON、JSONC、JSON5、YAML、TOML、HTML、Angular、Vue、CSS、SCSS、Less、Markdown、MDX、GraphQL、Ember 和 Handlebars。这意味着你可以为整个项目使用单一格式化程序。

### Tailwind CSS 集成

支持对 JS/TS 和非 JS/TS 文件进行自动 [Tailwind CSS 类排序](/docs/guide/usage/formatter/sorting.html#sort-tailwind-css-classes)。`prettier-plugin-tailwindcss` 的功能已内置，因此不再需要该插件。

### 导入排序

内置的 [导入排序](/docs/guide/usage/formatter/sorting.html#sort-imports) 现已可用，带有可配置选项：

- `ignoreCase` - 不区分大小写排序
- `sortSideEffects` - 排序副作用导入
- `newlinesBetween` - 控制导入组之间的空行
- `groups` - 自定义排序顺序组
- `customGroups` - 定义自定义分组规则

更多选项，请参阅 [完整参考](/docs/guide/usage/formatter/config-file-reference.html#sortimports)。

### `package.json` 排序

默认启用自动 [package.json 字段排序](/docs/guide/usage/formatter/sorting.html#sort-package-json-fields)，保持你的 package.json 文件一致的组织结构。

### 嵌入式语言格式化

格式化 [嵌入在模板字面量中的代码](/docs/guide/usage/formatter/embedded-formatting.html)：

- 具有 styled-components 类似语法的 CSS-in-JS，`styled-jsx` 和 CSS prop 支持
- Angular `@Component` 模板和样式

### Node.js API

现在可以使用编程式 API：

```ts
import { format, type FormatOptions } from "oxfmt";

const input = `let a=42;`;
const options: FormatOptions = {
  semi: false,
};

const { code } = await format("a.js", input, options);
console.log(code); // "let a = 42"
```

### [CLI 变更](/docs/guide/usage/formatter/cli.html)

- `--init` - 引导生成新的配置文件
- `--migrate prettier` - 从 Prettier 配置迁移
- `--migrate biome` - 从 Biome 配置迁移
- `--stdin-filepath` - 指定 stdin 输入的文件路径
- 支持 Glob 模式展开 - `oxfmt './packages/**/*.{js,jsx}'`

### [配置变更](/docs/guide/usage/formatter/config.html)

- [`overrides`](/docs/guide/usage/formatter/config.html#overrides) - 将不同选项应用于特定文件模式
- [`insertFinalNewline`](/docs/guide/usage/formatter/config.html#insertfinalnewline) - 控制尾部换行
- 支持 [`.editorconfig`](/docs/guide/usage/formatter/config.html#editorconfig) 中的 `insert_final_newline`

### [编辑器支持](/docs/guide/usage/formatter/editors.html)

Oxfmt 适用于所有支持的编辑器：VS Code、Cursor、Zed、IntelliJ IDEA、WebStorm、Neovim 以及任何支持 LSP 的编辑器。

## 路线图

我们正在持续改进 Oxfmt 以迈向稳定版发布：

- 支持 Prettier 插件
- 改进 xxx-in-js 格式化
- 稳定性
- 性能优化

## 下一步

请参阅 [Oxfmt 文档](/docs/guide/usage/formatter.html) 中的完整安装指南。

### 报告问题

对于格式化差异，请参阅 [格式化差异讨论](https://github.com/oxc-project/oxc/discussions/14669)。

### 加入社区

我们很乐意听取你对 Oxfmt 的反馈。联系我们：

- Discord：加入我们的 [社区服务器](https://discord.gg/9uXCAwqQZW) 进行实时讨论
- GitHub：在 [Formatter RFC](https://github.com/oxc-project/oxc/discussions/13608) 上分享反馈
- Issues：在 [问题追踪器](https://github.com/oxc-project/oxc/issues) 上报告错误或请求功能
