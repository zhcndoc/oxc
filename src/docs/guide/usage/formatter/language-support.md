---
title: "语言支持 | Oxfmt"
---

# 语言支持

Oxfmt 可格式化多种文件类型。大多数文件类型由 Oxfmt 自有的 **原生** 引擎处理，该引擎使用 Rust 编写。其余文件类型则交由 **内置的 Prettier** 处理，用于支持 Oxfmt 尚未原生重写的语言。我们正在积极将所有语言移植到 Rust，以实现最高性能，因此随着原生支持不断加入，由 Prettier 支持的语言列表也在持续缩短。

:::info
原生格式化完全在 Rust 中运行，无需经过 Node.js 往返，因此速度最快。由 Prettier 支持的格式化功能包含在 `oxfmt` 包中，无需额外设置。`.svelte` 除外，它还需要安装 `svelte` 包，并启用 [`svelte`](./config-file-reference) 选项。
:::

## 原生支持

由 Oxfmt 直接格式化，无需依赖 Prettier：

| 语言                 | 扩展名                                         |
| -------------------- | ---------------------------------------------- |
| JavaScript / JSX      | `.js`、`.jsx`、`.mjs`、`.cjs` 以及更多扩展名    |
| TypeScript / TSX      | `.ts`、`.tsx`、`.mts`、`.cts`、`.d.ts`         |
| JSON / JSONC / JSON5  | `.json`、`.jsonc`、`.json5`                   |
| CSS / SCSS / Less     | `.css`、`.scss`、`.less`、`.pcss`、`.postcss` |
| GraphQL               | `.graphql`、`.gql`、`.graphqls`               |
| TOML                  | `.toml`                                       |

检测还涵盖许多按名称识别的常见配置文件。例如，`.babelrc` 和 `.swcrc` 会被视为 JSON 文件。

## 基于 Prettier

委托给捆绑的 Prettier。无需单独安装 `prettier`。

:::tip
这些功能正在积极移植到 Rust。当每个原生格式化器上线后，其对应的语言会移至上方的[原生格式化器](#native)列表中，以获得最高性能。你无需进行任何更改。
:::

| 语言       | 扩展名                    |
| ---------- | ------------------------- |
| HTML       | `.html`、`.htm`、`.xhtml` |
| Angular    | `*.component.html`        |
| Vue        | `.vue`                    |
| Svelte     | `.svelte`                 |
| Markdown   | `.md`、`.markdown`        |
| MDX        | `.mdx`                    |
| YAML       | `.yml`、`.yaml`           |
| Handlebars | `.hbs`、`.handlebars`     |
| MJML       | `.mjml`                   |

## 嵌入式语言

Oxfmt 还会格式化嵌入 JS/TS 模板字面量中的代码。CSS 和 GraphQL 使用原生方式进行格式化；HTML 和 Markdown 则通过 Prettier 进行格式化。详情及示例请参阅[嵌入式格式化](./embedded-formatting)。

对于 Vue 和 Svelte 文件，嵌入的 JavaScript 和 TypeScript（例如 `<script>` 块）由 Oxfmt 的原生引擎进行格式化，而不是由 Prettier 处理。其他由 Prettier 支持的格式中嵌入的 JS/TS（例如 HTML 中的 `<script>` 标签）仍由 Prettier 进行格式化。

## 另请参阅

- [兼容性矩阵](/compatibility) — 一目了然地查看框架和文件类型级别的支持情况
- [不支持的功能](./unsupported-features)
