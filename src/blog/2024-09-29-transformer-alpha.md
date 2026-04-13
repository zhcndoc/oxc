---
title: Oxc Transformer Alpha 版本
outline: deep
authors:
  - boshen
  - Dunqing
  - overlookmotel
---

<AppBlogPostHeader />

<br />

我们很高兴宣布 Oxc transform（又名 transpile）的 alpha 版本发布。

此版本包含三个主要功能：

1. 将 TypeScript 转换为 ESNext。
2. 将 React JSX 转换为 ESNext，内置 React Refresh。
3. [TypeScript Isolated Declarations DTS 生成](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations) 无需使用 TypeScript 编译器。

在这个 alpha 阶段，我们建议尝试这些功能以加快构建速度。

[我们的基准测试](https://github.com/oxc-project/bench-transformer) 显示：

- Transform：Oxc 比 SWC 快 3 倍 - 5 倍，内存使用减少 20%，包体积更小（2 MB 对比 SWC 的 37 MB）。
- Transform：Oxc 比 Babel 快 20 倍 - 50 倍，内存使用减少 70%，体积小 19 MB，只需安装 2 个 npm 包，而 Babel 需要 170 个。
- React 开发 + React Refresh：Oxc 比 SWC 快 5 倍，比 Babel 快 50 倍。
- TS isolated declarations `.d.ts` 生成：Oxc 在典型文件上比 TSC 快 40 倍，在较大文件上快 20 倍。

## 使用示例

### [`oxc-transform`](https://npmx.dev/package/oxc-transform) npm 包

Vue.js 目前在其构建管道中 [实验](https://github.com/vuejs/core/blob/0895b2624b707ea1e75c41f2e1f75388e7a6f101/scripts/build-types.js#L20) 使用 [`oxc-transform`](https://npmx.dev/package/oxc-transform) npm 包进行 isolated declarations：

```javascript
import { isolatedDeclaration } from "oxc-transform";
const dts = isolatedDeclaration(filename, ts);
```

[@lukeed](https://github.com/lukeed) 和 [@maraisr](https://github.com/maraisr) 正在他们的包 [`empathic`](https://github.com/lukeed/empathic) 和 [`dldr`](https://github.com/maraisr/dldr) 中使用 `oxc-transform` 来 [单步完成](https://github.com/lukeed/empathic/blob/b83a360ff55051590dec19aa913cd12da97fa3f8/scripts/build.ts#L45-L52) 转换和生成 `.d.ts`。

以下示例演示了在单个转换步骤中发出 `.js` 和 `.d.ts`：

```javascript
import { transform } from "oxc-transform";
const transformed = transform(filePath, sourceCode, {
  typescript: {
    onlyRemoveTypeImports: true,
    declaration: { stripInternal: true },
  },
});
await fs.writeFile("out.js", transformed.code);
await fs.writeFile("out.d.ts", transformed.declaration);
```

### [`unplugin-isolated-decl`](https://npmx.dev/package/unplugin-isolated-decl)

`vue-macros` [使用](https://github.com/vue-macros/vue-macros/blob/4247c7ba9189c630111e058245ce1412c8da9229/tsup.config.ts#L10) `unplugin-isolated-decl` 作为其 esbuild 插件的集成工具。

[@sxzz](https://github.com/sxzz) [报告](https://x.com/sanxiaozhizi/status/1821320327231893600) 他们的 `.d.ts` 生成时间从 76 秒减少到 16 秒。

### [Airtable](https://github.com/Airtable) 的 Bazel 构建

来自 [Airtable](https://github.com/Airtable) 的 [@michaelm](https://github.com/MichaelMitchell-at) 正在其 [Bazel 构建](https://github.com/aspect-build/rules_ts/pull/697) 的 CI 管道中集成 Oxc 的 isolated declarations `.d.ts` 生成功能。

### Rust [`oxc_transformer`](https://crates.io/crates/oxc_transformer) crate

[Rolldown](https://rolldown.rs) 打包器 [直接](https://github.com/rolldown/rolldown/blob/3213e8fdb9e25f29295b6ec0d92fcc2ce03ce396/crates/rolldown/src/utils/pre_process_ecma_ast.rs#L67-L75) 使用 `oxc_transformer` Rust crate。

## 基准测试结果

基准测试设置位于 [oxc-project/bench-transformer](https://github.com/oxc-project/bench-transformer)
并且基准测试结果显示在其 [GitHub Actions](https://github.com/oxc-project/bench-transformer/actions/workflows/ci.yml) 中。

（欢迎纠正任何配置错误。）

在 `ubuntu-latest` 上，测量了不同代码行数的示例：

### 转换

| 行数   | oxc     | swc           | babel         |
| ------ | ------- | ------------- | ------------- |
| ~100   | 0.14 ms | 0.7 ms (5x)   | 11.5 ms (82x) |
| ~1000  | 0.9 ms  | 5.7 ms (6.3x) | 38.7 ms (43x) |
| ~10000 | 14.9 ms | 35.9 ms(2.4x) | 492 ms (33x)  |

### Isolated Declarations

| 行数   | oxc    | tsc            |
| ------ | ------ | -------------- |
| ~100   | 0.1 ms | 23.1 ms (231x) |
| ~1000  | 3.1 ms | 26.8 ms (8.6x) |
| ~10000 | 3.5 ms | 115.2 ms (33x) |

## 包大小

Oxc 仅下载 2 个 npm 包，总共 2 MB。

| 包                                                                                       | 大小                                                                   |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `@oxc-transform/binding-darwin-arm64`                                                    | [2.0 MB](https://npmx.dev/package/@oxc-transform/binding-darwin-arm64) |
| `@swc/core-darwin-arm64`                                                                 | [37.5 MB](https://npmx.dev/package/@swc/core-darwin-arm64)             |
| `@babel/core` + `@babel/preset-env` + `@babel/preset-react` + `@babel/preset-typescript` | [21 MB 和 170 个包](https://npmx.dev/package/@babel/core)              |

## 内存使用

Oxc 使用更少的内存。

转换 `parser.ts`（10777 行）的内存使用 - 使用 `/usr/bin/time -alh node` 测量：

|       | 最大 RSS |
| ----- | -------- |
| oxc   | 51 MB    |
| swc   | 67 MB    |
| babel | 172 MB   |

## 下一个版本

我们的下一个版本将包括目标降级到 ES6 和 `@babel/plugin-transform-modules-commonjs`。

## 致谢

感谢 [@Dunqing](https://github.com/dunqing) 和 [@overlookmotel](https://github.com/overlookmotel) 为本版本发布所做的所有辛勤工作。

感谢 [snyder.tech](https://snyder.tech)、[schoolhouse.world](https://schoolhouse.world)、[@lukeed](https://github.com/lukeed) 和 [@maraisr](https://github.com/maraisr) 的慷慨 [赞助](https://github.com/sponsors/boshen)。
