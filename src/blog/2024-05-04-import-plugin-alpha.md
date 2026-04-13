---
title: Oxlint Import 插件 Alpha 版
outline: deep
authors:
  - boshen
---

<AppBlogPostHeader />

我们很高兴宣布 `oxlint --import-plugin` 的 alpha 版本发布，它是 [`eslint-plugin-import`](https://npmx.dev/package/eslint-plugin-import) 的移植版本。

此移植版本旨在解决与 `eslint-plugin-import` 相关的所有已知问题：

- 性能 - 启用某些规则时执行时间超过一分钟
- 依赖大小 - 188 个依赖项，总计 30M
- 向后兼容性 - 需要 [支持 Node.js v4.0.0](https://github.com/import-js/eslint-plugin-import/pull/2447#issuecomment-1117384140)
- 依赖兼容性 - 需要将其替换为 [`eslint-plugin-import-x`](https://npmx.dev/package/eslint-plugin-import-x)
- [升级到 ESLint v9](https://github.com/import-js/eslint-plugin-import/issues/2948)

## 发布内容是什么？

如果您的项目使用 ESM（ECMAScript 模块），预计此 alpha 版本可以正常工作。

如果需要通过 [tsconfig.compilerOptions.paths](https://www.typescriptlang.org/tsconfig/#paths) 配置路径别名（例如 `@/foo`），可以使用 `--tsconfig` 选项：

```
npx oxlint@latest --tsconfig ./tsconfig.json --import-plugin
```

通过 `npx oxlint@latest --import-plugin` 默认启用的规则有：

- [default](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/default.md)
- [named](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/named.md)
- [namespace](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/namespace.md)

可以通过 `npx oxlint@latest --import-plugin -D rule-name` 选择性启用的规则有：

- [no-named-as-default](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-named-as-default.md)
- [no-named-as-default-member](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-named-as-default-member.md)
- [no-self-import](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-self-import.md)
- [no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-duplicates.md)
- [no-amd](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-amd.md)
- [no-default-export](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-default-export.md)
- [no-cycle](https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/no-cycle.md)

这些规则也有所改进；例如，`no-cycle` 规则的诊断信息得到了改进：

```
 ⚠ eslint-plugin-import(no-cycle): Dependency cycle detected
   ╭─[apps/web/playwright/lib/fixtures.ts:13:42]
12 │ import { createPaymentsFixture } from "../fixtures/payments";
13 │ import { createBookingPageFixture } from "../fixtures/regularBookings";
   ·                                          ─────────────────────────────
14 │ import { createRoutingFormsFixture } from "../fixtures/routingForms";
   ╰────
 help: These paths form a cycle:
       -> ../fixtures/regularBookings - apps/web/playwright/fixtures/regularBookings.ts
       -> ./users - apps/web/playwright/fixtures/users.ts
       -> ../lib/testUtils - apps/web/playwright/lib/testUtils.ts
       -> ./fixtures - apps/web/playwright/lib/fixtures.ts
```

这并不是一个很长的功能列表，但由于当前生态系统状态的复杂性，实现这些规则并确保它们正常工作需要大量的努力。

在过去的六个月里，我们利用业余时间工作，并成功完成了 `--import-plugin` 工作所需的所有先决条件：

- 一个用于模块解析的 [resolver](https://github.com/oxc-project/oxc-resolver)
- 一个小型 ["runtime"](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/src/service.rs) 以最大化并行处理依赖文件
- 一个用于存储导入/导出信息的 [`ModuleRecord`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_syntax/src/module_record.rs) 数据结构，及其相应的 [builder](https://github.com/oxc-project/oxc/blob/main/crates/oxc_semantic/src/module_record/builder.rs)

## 我如何提供帮助？

如果您是项目维护者（即配置工程师），并且没有时间和精力保持 ESLint 及其所有插件更新，您可以跟随 [@brooooooklyn](https://github.com/brooooooklyn) 的脚步，[在他所有的项目中用 oxlint 替换 ESLint](https://github.com/napi-rs/napi-rs/pull/2032)。

如果您是开源爱好者并愿意提供帮助，欢迎在 [discord](https://discord.gg/9uXCAwqQZW) 上与我们交谈，查看 [linter 产品计划和进度问题](https://github.com/oxc-project/oxc/issues/481)，或通过 [提议新的规则](https://github.com/oxc-project/oxc/issues/3161) 来帮助（那些被推迟的规则）。

如果您是工程经理，或者愿意将项目迁移到 oxlint（拥有 330 条规则且还在增长）以降低基础设施成本，您可以考虑 [赞助](https://github.com/sponsors/Boshen)，以便我们可以优先处理您的项目。

请记住 `oxlint` 目前是由社区驱动的，我相信只要有足够的资源，我们就可以在未来几个月内使 `--import-plugin` 普遍可用。

---

要开始使用 `oxlint`，请遵循 [安装指南](/docs/guide/usage/linter) 或了解更多关于 [oxc 项目](/docs/guide/introduction.html) 的信息。
