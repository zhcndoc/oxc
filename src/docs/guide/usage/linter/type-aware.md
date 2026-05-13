---
title: "类型感知 Lint | Oxlint"
description: 使用类型信息进行 lint。
---

# 类型感知 Lint

类型感知 lint 使得一些依赖 TypeScript 类型系统的规则成为可能，例如检测未处理的 promise 或不安全的赋值。在 Oxlint 中，类型感知 lint 由 [`tsgolint`](https://github.com/oxc-project/tsgolint) 提供，并集成到 Oxlint CLI 和配置系统中。

类型感知 lint 目前支持来自 typescript-eslint 的 [59/61](https://github.com/oxc-project/tsgolint/tree/main?tab=readme-ov-file#implemented-rules) 条类型感知规则。规则覆盖率、性能和兼容性仍在持续改进中。

## 概览

Oxlint 将职责划分给两个组件：

- **Oxlint（Rust）**
  负责文件遍历、忽略逻辑、配置、非类型感知规则以及报告输出。

- **tsgolint（Go）**
  使用 [`typescript-go`](https://github.com/microsoft/typescript-go) 构建 TypeScript 程序并执行类型感知规则，然后将结构化诊断结果返回给 Oxlint。

## 安装

类型感知 lint 需要额外依赖：

::: code-group

```sh [npm]
npm add -D oxlint-tsgolint@latest
```

```sh [pnpm]
pnpm add -D oxlint-tsgolint@latest
```

```sh [yarn]
yarn add -D oxlint-tsgolint@latest
```

```sh [bun]
bun add -D oxlint-tsgolint@latest
```

:::

## 运行类型感知 lint

你可以在以下任一位置启用类型感知 lint：

- CLI 标志：`--type-aware`
- 根配置：`options.typeAware: true`

CLI：

```bash
oxlint --type-aware
```

根配置：

::: code-group

```json [.oxlintrc.json]
{
  "options": {
    "typeAware": true
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
  },
});
```

:::

启用后，Oxlint 会运行标准规则以及 `typescript/*` 命名空间下的类型感知规则。

`--type-aware` 的优先级高于配置文件。例如，`oxlint --type-aware -c .oxlintrc.json` 即使该配置将 `options.typeAware` 设为 `false`，也会启用类型感知 lint。

`options.typeAware` 和 `options.typeCheck` 仅支持在根配置文件中使用。嵌套配置不应设置这些字段。

在 VS Code 等基于编辑器和 LSP 的集成中，可以通过将 `typeAware` 选项设置为 `true` 来启用类型感知 lint，更多信息请参见 [编辑器](./editors) 页面。

### 单仓库和构建产物

类型感知 lint 需要已解析的类型信息。

在单仓库中：

- 构建依赖包，以便 `.d.ts` 文件可用
- 确保在运行前已安装依赖

```bash
pnpm install
pnpm -r build
oxlint --type-aware
```

### 类型检查诊断

启用类型检查，以便在 lint 结果之外同时报告 TypeScript 错误：

```bash
oxlint --type-aware --type-check
```

或者在根配置中启用：

::: code-group

```json [.oxlintrc.json]
{
  "options": {
    "typeAware": true,
    "typeCheck": true
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

:::

`--type-check` 的优先级高于配置文件。例如，`oxlint --type-check -c .oxlintrc.json` 即使该配置将 `options.typeCheck` 设为 `false`，也会启用类型检查。

这种模式可以在 CI 中替代单独的 `tsc --noEmit` 步骤：

```bash
# 之前
tsc --noEmit
oxlint

# 之后
oxlint --type-aware --type-check
```

## 配置类型感知规则

类型感知规则的配置方式与其他 Oxlint 规则相同。

::: code-group

```json [.oxlintrc.json]
{
  "plugins": ["typescript"],
  "rules": {
    "typescript/no-floating-promises": "error",
    "typescript/no-unsafe-assignment": "warn"
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  rules: {
    "typescript/no-floating-promises": "error",
    "typescript/no-unsafe-assignment": "warn",
  },
});
```

:::

规则支持与其 `typescript-eslint` 对应项相同的选项。

::: code-group

```json [.oxlintrc.json]
{
  "plugins": ["typescript"],
  "rules": {
    "typescript/no-floating-promises": ["error", { "ignoreVoid": true }]
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  rules: {
    "typescript/no-floating-promises": ["error", { ignoreVoid: true }],
  },
});
```

:::

## 禁用注释

类型感知规则支持行内禁用注释：

```ts
// oxlint-disable-next-line typescript/no-floating-promises
doSomethingAsync();
```

使用以下命令报告未使用的禁用注释：

```bash
oxlint --type-aware --report-unused-disable-directives
```

## TypeScript 兼容性

类型感知 lint 由 `typescript-go` 提供支持。

- 需要 TypeScript **7.0+**
- 某些旧版 `tsconfig` 选项不受支持（例如 `tsconfig.json` 中的 `baseUrl`）
- 如果你使用的是在 TypeScript 6.0 中已弃用或在 TypeScript 7.0 中已移除的配置选项/功能，你需要先迁移代码库
- 在启用 `--type-check` 时会报告无效选项

更多详情请参见 [TypeScript 迁移指南](https://github.com/microsoft/TypeScript/issues/62508#issuecomment-3348649259)，并考虑使用 [ts5to6](https://github.com/andrewbranch/ts5to6) 来升级你的 tsconfig 文件。

## 稳定性说明

类型感知 lint：

- 规则覆盖不完整（但已非常接近）
- 超大型代码库可能会遇到较高的内存使用
- 性能仍在持续改进

## 故障排查

### 性能与调试

如果类型感知 lint 很慢或占用过多内存：

1. 更新两个工具：

- `oxlint`
- `oxlint-tsgolint`

2. 启用调试日志：

```bash
OXC_LOG=debug oxlint --type-aware
```

示例输出（显示关键时间节点）：

```
2026/01/01 12:00:00.000000 开始 tsgolint
2026/01/01 12:00:00.001000 开始将文件分配到程序。文件总数：259
2026/01/01 12:00:01.000000 完成文件分配到程序。程序总数：8。未匹配文件：75
2026/01/01 12:00:01.001000 使用 12 个 worker 启动 linter
2026/01/01 12:00:01.001000 工作负载分布：8 个程序
2026/01/01 12:00:01.002000 [1/8] 正在程序上运行 linter：/path/to/project/jsconfig.json
...
2026/01/01 12:00:01.100000 [4/8] 正在程序上运行 linter：/path/to/project/tsconfig.json
2026/01/01 12:00:02.500000 已创建程序，包含 26140 个源文件
2026/01/01 12:00:14.000000 /path/to/project/oxlint-plugin.mts
...
2026/01/01 12:00:14.100000 [5/8] 正在程序上运行 linter：/path/to/project/apps/tsconfig.json
...
2026/01/01 12:00:15.000000 Lint 完成
在 12 个线程上，针对 259 个文件使用 161 条规则，耗时 16.4s。
```

**如何解读日志：**

- **文件分配阶段**（`Starting to assign files...` → `Done assigning files...`）：将源文件映射到各自的 tsconfig 项目。此阶段应当很快。如果很慢，请提交 issue。
- **程序 lint 阶段**（`[N/M] Running linter on program...`）：每个 TypeScript 项目会单独进行 lint。耗时明显更长的程序可能表示类型解析开销很大，或者项目规模过大。
  - 注意源文件数量异常高的程序（例如 `Program created with 26140 source files`）。这可能说明 tsconfig 的 `includes`/`excludes` 配置不正确，导致把 `node_modules` 等不必要的文件也包含进来了。
  - 日志中每个文件路径的出现表示该文件正在被 lint。文件之间出现较大的时间间隔，可能表示某些文件的类型解析成本很高。

### 常见性能问题

#### 根 tsconfig 包含了过多文件

如果根 `tsconfig.json` 的 `include` 模式过于宽泛，可能会无意中把仓库中的所有文件都包含进来，从而导致明显变慢：

```json [tsconfig.json]
{
  "include": ["**/*"] // ❌ 捕获所有内容
}
```

这种配置会把构建产物和其他不应进行类型检查的文件也纳入进来。

**修复方法：** 明确限定 `include` 模式，并添加适当的 `exclude` 条目：

```json [tsconfig.json]
{
  "include": ["src/**/*"], // ✅ 仅源文件
  "exclude": ["dist", "build", "coverage"] // node_modules 默认已排除
}
```

对于单仓库，请确保根 `tsconfig.json` 不会直接包含源文件：

```json [tsconfig.json]
{
  "files": []
}
```

**问题诊断：** 启用调试日志，并查看是否有源文件数量异常高的程序：

```
2026/01/01 12:00:02.500000 Program created with 26140 source files
```

如果你看到单个程序中有成千上万个文件，请检查 tsconfig 的 `include`/`exclude` 设置。

## 下一步

- 查看 [已实现规则](https://github.com/oxc-project/tsgolint/tree/main?tab=readme-ov-file#implemented-rules)
- 将问题报告到 [https://github.com/oxc-project/tsgolint](https://github.com/oxc-project/tsgolint)
