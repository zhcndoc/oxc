---
title: 使用 Oxc 的项目
outline: deep
---

# 使用 Oxc 的项目

## Oxlint / Oxfmt / Both

- [Microsoft VS Code](https://github.com/microsoft/vscode) (Oxlint) - Microsoft 的 VS Code 编辑器
- [Google Neuroglancer](https://github.com/google/neuroglancer) (Oxlint) - WebGL 体数据可视化工具
- [Shopify](https://www.shopify.com/news/performance%F0%9F%91%86-complexity%F0%9F%91%87-killer-updates-from-shopify-engineering) (Oxlint) - 将一小时的工作量缩短到几秒
- [Cloudflare Agents](https://github.com/cloudflare/agents) (Both) - Cloudflare Agents SDK
- [BBC Simorgh](https://github.com/bbc/simorgh) (Oxlint) - BBC 在线渲染平台
- [Turborepo](https://github.com/vercel/turborepo) (Both) - 面向 JavaScript 和 TypeScript 代码库的高性能构建系统
- [Sentry JavaScript](https://github.com/getsentry/sentry-javascript) (Oxfmt) - JavaScript 的官方 Sentry SDK
- [Vue.js](https://github.com/vuejs/core) (Oxfmt) - 渐进式 JavaScript 框架
- [Hugging Face JS](https://github.com/huggingface/huggingface.js) (Oxfmt) - Hugging Face JS 库
- [Bun](https://github.com/oven-sh/bun) (Oxlint) - JavaScript 运行时和工具包
- [Mastodon](https://github.com/mastodon/mastodon) (Oxfmt) - 去中心化社交网络服务器
- [Preact](https://github.com/preactjs/preact) (Oxlint) - 体积仅 3kB 的快速 React 替代方案，拥有相同的现代 API
- [PostHog](https://github.com/PostHog/posthog) (Oxlint) - 开源产品分析平台
- [Lichess](https://github.com/lichess-org/lila) (Oxfmt) - Lichess 棋类服务器/前端
- [Rolldown](https://github.com/rolldown/rolldown) (Both) - VoidZero/Vite 生态中的 Rust 打包器
- [Renovate](https://github.com/renovatebot/renovate) (Oxlint) - 依赖更新自动化机器人
- [Vue Pinia](https://github.com/vuejs/pinia) (Oxfmt) - Vue 官方状态管理库
- [AFFiNE](https://github.com/toeverything/affine) (Oxlint) - 下一代知识库
- [FormatJS](https://github.com/formatjs/formatjs) (Both) - JavaScript 国际化库
- [napi-rs](https://github.com/napi-rs/napi-rs) (Oxlint) - 一个使用 Node-API 通过 Rust 构建编译型 Node.js 插件的框架
- [ComfyUI Frontend](https://github.com/Comfy-Org/ComfyUI_frontend) (Oxfmt) - ComfyUI 的前端
- [Actual](https://github.com/actualbudget/actual) (Both) - 开源预算应用
- [Hey API](https://heyapi.dev/) (Oxlint) - OpenAPI 到 TypeScript 代码生成生态
- [nuxt-auth](https://github.com/sidebase/nuxt-auth) (Oxlint) - 为 Nuxt 3 构建的身份验证
- [OpenClaw](https://github.com/openclaw/openclaw) (Both) - 开源个人 AI 助手
- [npmx.dev](https://github.com/npmx-dev/npmx.dev) (Oxfmt) - npm 包浏览器

## 模块解析器

- [swc-node](https://github.com/swc-project/swc-node) - 无需类型检查的更快 ts-node
- [Biome](https://biomejs.dev) - 用于加载配置
- [turborepo](https://github.com/vercel/turborepo/pull/9134) - 用于 `turbo-trace`
- [dts-resolver](https://npmx.dev/package/dts-resolver) - 解析依赖项的 TypeScript 声明文件
- [codemod](https://github.com/codemod/codemod) - 用于 jssg codemods 中的模块解析

## 解析器

- [todoctor](https://github.com/azat-io/todoctor) - 用于跟踪和可视化 Git 仓库中的 TODO 注释并生成报告的 CLI 工具
- [nuxt](https://nuxt.com) - 使用 `oxc-parser` [解析插件中的代码](https://github.com/nuxt/nuxt/pull/30066)
- [Elide](https://elide.dev) - 使用 `oxc` 在执行前剥离 TypeScript 类型

## 转换器

- [unplugin-isolated-decl](https://npmx.dev/package/unplugin-isolated-decl) - 用于生成隔离声明的极速工具
- [stc](https://github.com/long-woo/stc) - 一个将 OpenApi/Swagger/Apifox 转换为代码的工具

## Crates

- [Andromeda](https://github.com/tryandromeda/andromeda) - 一个现代且安全的 JavaScript & TypeScript 运行时，使用 The Nova Engine 和 oxc crates 构建
- [Rolldown](https://rolldown.rs) - 使用所有编译器组件
- [sovra](https://github.com/oblador/sovra) - 面向大型 JavaScript 项目的测试决策器
- [Tauri](https://github.com/tauri-apps/tauri/blob/8c6d1e8e6c852667bb223b5f4823948868c26d98/crates/tauri-cli/src/migrate/migrations/v1/frontend.rs) - 将解析器用于其 codemod
- [tree-shaker](https://github.com/KermanX/tree-shaker) - 一个用于 JavaScript 的实验性 tree shaker
- [Tyvm](https://github.com/zackradisic/tyvm) - 一个用于类型级 TypeScript 的实验性字节码解释器
