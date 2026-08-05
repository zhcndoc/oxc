---
title: "类型感知 lint 稳定版"
outline: deep
authors:
  - cameron
---

<AppBlogPostHeader />

今天，我们发布了 [tsgolint](https://github.com/oxc-project/tsgolint) v7，它是 Oxlint 背后的类型感知 lint 引擎。

此版本跟进了 [TypeScript v7.0.2](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)，并使 tsgolint 支持 typescript-eslint 的 61 条类型感知规则中的 59 条。自我们的[alpha 版本](/blog/2025-12-08-type-aware-alpha)发布以来，我们新增了 16 条规则、提供了逐规则计时、改进了配置，并在性能方面进行了新一轮优化。

## 入门

安装最新版本的 Oxlint 和 tsgolint，然后启用类型感知 lint：

```sh
pnpm add -D oxlint oxlint-tsgolint@7
pnpm oxlint --type-aware
```

要在 lint 诊断信息旁报告 TypeScript 编译器错误，请添加 `--type-check`：

```sh
pnpm oxlint --type-aware --type-check
```

之后，lint 和类型检查会共享同一个 TypeScript 程序，从而避免单独的类型检查命令所需的重复配置和分析。

## 版本号

tsgolint 直接构建于 [TypeScript v7](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) 之上，因此其兼容性与特定的 TypeScript 版本绑定。tsgolint 的新版本号方案也体现了这一点：

```text
v7.0.2000
^^^^^^    TypeScript version
      ^^^ tsgolint patch version
```

换句话说，`v7.0.2000` 表示 TypeScript `v7.0.2` 对应的 tsgolint 补丁版本 `0`。如果我们需要在保持 TypeScript 版本不变的情况下发布另一个 tsgolint 修复版本，下一个版本将是 `v7.0.2001`。当我们更新 TypeScript 时，TypeScript 部分会发生变化，而 tsgolint 补丁版本会重置。

## 自 alpha 以来新增的 16 条规则

alpha 版本包含 43 条类型感知规则。v7.0.2000 包含 61 条规则中的 59 条，新增：

- [`consistent-return`](/docs/guide/usage/linter/rules/typescript/consistent-return)
- [`consistent-type-exports`](/docs/guide/usage/linter/rules/typescript/consistent-type-exports)
- [`dot-notation`](/docs/guide/usage/linter/rules/typescript/dot-notation)
- [`no-unnecessary-condition`](/docs/guide/usage/linter/rules/typescript/no-unnecessary-condition)
- [`no-unnecessary-qualifier`](/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier)
- [`no-unnecessary-type-conversion`](/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-conversion)
- [`no-unnecessary-type-parameters`](/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-parameters)
- [`no-useless-default-assignment`](/docs/guide/usage/linter/rules/typescript/no-useless-default-assignment)
- [`prefer-find`](/docs/guide/usage/linter/rules/typescript/prefer-find)
- [`prefer-nullish-coalescing`](/docs/guide/usage/linter/rules/typescript/prefer-nullish-coalescing)
- [`prefer-optional-chain`](/docs/guide/usage/linter/rules/typescript/prefer-optional-chain)
- [`prefer-readonly`](/docs/guide/usage/linter/rules/typescript/prefer-readonly)
- [`prefer-readonly-parameter-types`](/docs/guide/usage/linter/rules/typescript/prefer-readonly-parameter-types)
- [`prefer-regexp-exec`](/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec)
- [`prefer-string-starts-ends-with`](/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with)
- [`strict-void-return`](/docs/guide/usage/linter/rules/typescript/strict-void-return)

## 配置即代码

类型感知 linting 不再需要接入每个 package 脚本或 CI 命令。你可以将其与其余 lint 配置一同启用：

::: code-group

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

```json [.oxlintrc.json]
{
  "options": {
    "typeAware": true,
    "typeCheck": true
  }
}
```

:::

`typeAware` 会启用需要类型信息的规则。`typeCheck` 选项还会报告 TypeScript 编译器诊断信息；如果你只需要类型感知 linting，可以省略此选项。这两个选项只能在根配置中使用，并且 CLI 标志的优先级更高。

有关配置和迁移的详细信息，请参阅[类型感知 linting 指南](/docs/guide/usage/linter/type-aware)。

## 查看 lint 时间花在哪里

感谢 [Cam McHenry](https://github.com/oxc-project/tsgolint/pull/960)，Oxlint 现在可以[报告每个启用规则的耗时](/docs/guide/usage/linter/type-aware#rule-timings)，包括类型感知规则：

```sh
pnpm oxlint --type-aware --debug timings
```

耗时最长的规则会列在最前面：

```text
Rule timings:
Rule                                                         Time (ms)  Relative  Calls  Source
----------------------------------------------------------  ----------  --------  -----  ----------
typescript/unbound-method                                      108.620     46.5%  12450  type-aware
typescript/no-floating-promises                                 65.606     28.1%   7327  type-aware
eslint/no-unused-vars                                            2.187      0.9%    372  native
typescript/no-duplicate-type-constituents                        1.505      0.6%    870  type-aware
typescript/no-meaningless-void-operator                          1.445      0.6%    383  type-aware
vitest/no-standalone-expect                                      0.978      0.4%    372  native
vitest/expect-expect                                             0.951      0.4%   4682  native
typescript/no-implied-eval                                       0.401      0.2%  13809  type-aware
oxc/no-map-spread                                                0.383      0.2%  12545  native
react/no-did-update-set-state                                    0.382      0.2%  12545  native
eslint/no-misleading-character-class                             0.380      0.2%  13524  native
typescript/no-redundant-type-constituents                        0.371      0.2%    870  type-aware
unicorn/no-single-promise-in-promise-methods                     0.362      0.2%  12545  native
eslint/no-useless-backreference                                  0.360      0.2%  13524  native
typescript/no-useless-default-assignment                         0.258      0.1%   3110  type-aware
eslint/no-console                                                0.256      0.1%  12484  native
eslint/no-caller                                                 0.253      0.1%  11603  native
...
```

报告会显示每个规则的总耗时、相对占比、调用次数，以及该规则是在 Oxlint 中原生运行，还是通过类型感知引擎运行。当未启用耗时统计时不会产生额外开销，因此这让我们更容易调查耗时较长的规则和配置更改。有关耗时统计如何帮助我们识别并加速耗时规则的示例，请参阅我们在 [X 上发布的性能分析主题](https://x.com/Cameron_C2/status/2056713117611049465)。

## 更快了

在我们[最近一次基准测试](https://github.com/oxc-project/tsgolint/pull/1102)中，在四个大型 TypeScript 代码库上，tsgolint 比使用 typescript-eslint 的 ESLint 快 12 到 18 倍：

| 代码库                                                        | ESLint + typescript-eslint | tsgolint | 加速比 |
| ------------------------------------------------------------- | -------------------------- | -------- | ------ |
| [microsoft/vscode](https://github.com/microsoft/vscode)       | 83.2s                      | 6.96s    | 12x    |
| [microsoft/typescript](https://github.com/microsoft/typescript) | 27.2s                      | 1.94s    | 14x    |
| [typeorm/typeorm](https://github.com/typeorm/typeorm)         | 13.2s                      | 0.75s    | 18x    |
| [vuejs/core](https://github.com/vuejs/core)                   | 12.3s                      | 0.95s    | 13x    |

这些结果是在配备 12 个核心的 Apple M4 Pro 上测得的。两个代码检查器使用了相同的兼容 TypeScript 7 的项目配置；完整的方法和结果请参见[基准测试套件](https://github.com/oxc-project/tsgolint/tree/main/benchmarks)。

自 alpha 版本以来，我们使 tsconfig 的发现过程支持并发，缓存了文件系统读取，批量处理语义诊断，并复用了每个文件的规则状态。我们还增加了针对性的快速路径：当语法已经能够给出答案时，避免执行开销高昂的类型检查器查询。例如，[`no-unnecessary-qualifier` 现在会跳过命名空间外的符号解析](https://github.com/oxc-project/tsgolint/pull/1032)，使该规则在 VS Code 上的速度提升了 35 倍；而 [`consistent-return` 会将类型解析推迟到确有需要时](https://github.com/oxc-project/tsgolint/pull/1031)，使该规则在同一代码库上的速度提升了 8.6 倍。类似的快速路径还使 [`no-unnecessary-type-arguments` 的速度提升了 3.7 倍](https://github.com/oxc-project/tsgolint/pull/1064)，前提是单独在 VS Code 上运行该规则。

感谢 [Connor Shea](https://github.com/connorshea) 和 [Cam McHenry](https://github.com/camchenry) 付出的广泛性能分析和优化工作。

## 更小的下载体积

我们现在会[从发布版本的二进制文件中移除调试信息](https://github.com/oxc-project/tsgolint/pull/1049)。在 Darwin ARM64 上，这使安装后的二进制文件大小减少了 26.6%，从 29.7 MB 降至 21.8 MB；压缩后的 npm 下载包大小减少了 44.9%，从 13.1 MB 降至 7.2 MB，同时不会影响 lint 结果或运行时性能。

## 感谢

感谢 TypeScript 团队，尤其是 [Jake Bailey](https://github.com/jakebailey)，感谢他们构建了原生 TypeScript 编译器，并与我们在性能、兼容性和修复方面密切合作，从而改进了这两个项目。同时也感谢 typescript-eslint 团队，他们的规则使这项工作成为可能，尤其要感谢创建了 tsgolint 的 [@auvred](https://github.com/auvred)。

请试用此版本，并[告诉我们您的发现](https://github.com/oxc-project/tsgolint/issues)。
