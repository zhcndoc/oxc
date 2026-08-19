---
title: React Compiler 支持
outline: deep
authors:
  - boshen
---

<AppBlogPostHeader />

我们很高兴地宣布，Oxlint 和 Oxc Transform 现已支持 [React Compiler](https://react.dev/learn/react-compiler)。

Oxlint 现已包含 22 条由 React Compiler 驱动的规则，这些规则使用编译器的验证流程来捕获违反 React 规则的情况。

[`oxc-transform-react`](https://npmx.dev/package/oxc-transform-react) 软件包会应用 React Compiler 的自动记忆化。在我们的初步基准测试中，它的速度比 Babel 快 10 倍以上。

与 [`@vitejs/plugin-react`](https://npmx.dev/package/@vitejs/plugin-react) 的集成即将推出。

## 入门

### Oxlint

启用 React 插件及其正确性规则：

```json [.oxlintrc.json]
{
  "plugins": ["react"],
  "categories": {
    "correctness": "error"
  }
}
```

React Compiler 的规则类别与上游 ESLint 预设保持一致。我们已将所有推荐规则添加到 Oxlint 的 correctness 类别中。

如果你启用了之前的 nursery `react/react-compiler` 规则，请将其从配置中移除。它已被下面按类别划分的规则所取代。

| 规则名称                                                                                               | ESLint 预设        | Oxlint 类别 | 备注                                                                            |
| ------------------------------------------------------------------------------------------------------- | -------------------- | --------------- | ---------------------------------------------------------------------------------- |
| [`error-boundaries`](/docs/guide/usage/linter/rules/react/error-boundaries)                             | `recommended`        | `correctness`   |                                                                                 |
| [`globals`](/docs/guide/usage/linter/rules/react/globals)                                               | `recommended`        | `correctness`   |                                                                                 |
| [`immutability`](/docs/guide/usage/linter/rules/react/immutability)                                     | `recommended`        | `correctness`   |                                                                                 |
| [`incompatible-library`](/docs/guide/usage/linter/rules/react/incompatible-library)                     | `recommended`        | `correctness`   |                                                                                 |
| [`preserve-manual-memoization`](/docs/guide/usage/linter/rules/react/preserve-manual-memoization)       | `recommended`        | `correctness`   |                                                                                 |
| [`purity`](/docs/guide/usage/linter/rules/react/purity)                                                 | `recommended`        | `correctness`   |                                                                                 |
| [`refs`](/docs/guide/usage/linter/rules/react/refs)                                                     | `recommended`        | `correctness`   |                                                                                 |
| [`set-state-in-effect`](/docs/guide/usage/linter/rules/react/set-state-in-effect)                       | `recommended`        | `correctness`   |                                                                                 |
| [`set-state-in-render`](/docs/guide/usage/linter/rules/react/set-state-in-render)                       | `recommended`        | `correctness`   |                                                                                 |
| [`static-components`](/docs/guide/usage/linter/rules/react/static-components)                           | `recommended`        | `correctness`   |                                                                                 |
| [`use-memo`](/docs/guide/usage/linter/rules/react/use-memo)                                             | `recommended`        | `correctness`   |                                                                                 |
| [`unsupported-syntax`](/docs/guide/usage/linter/rules/react/unsupported-syntax)                         | `recommended`        | `restriction`   |                                                                                 |
| `config`                                                                                                | `recommended`        | 尚未实现 | Oxlint 使用固定且有效的编译器选项。                                      |
| `gating`                                                                                                | `recommended`        | 尚未实现 | Oxlint 尚未公开编译器门控选项。                             |
| [`void-use-memo`](/docs/guide/usage/linter/rules/react/void-use-memo)                                   | `recommended-latest` | `correctness`   |                                                                                 |
| [`no-deriving-state-in-effects`](/docs/guide/usage/linter/rules/react/no-deriving-state-in-effects)     | `off`                | `perf`          |                                                                                 |
| [`invariant`](/docs/guide/usage/linter/rules/react/invariant)                                           | `off`                | `restriction`   |                                                                                 |
| [`rule-suppression`](/docs/guide/usage/linter/rules/react/rule-suppression)                             | `off`                | `restriction`   |                                                                                 |
| [`syntax`](/docs/guide/usage/linter/rules/react/syntax)                                                 | `off`                | `restriction`   |                                                                                 |
| [`todo`](/docs/guide/usage/linter/rules/react/todo)                                                     | `off`                | `restriction`   |                                                                                 |
| [`capitalized-calls`](/docs/guide/usage/linter/rules/react/capitalized-calls)                           | `off`                | `suspicious`    |                                                                                 |
| [`exhaustive-effect-dependencies`](/docs/guide/usage/linter/rules/react/exhaustive-effect-dependencies) | `off`                | `suspicious`    |                                                                                 |
| [`hooks`](/docs/guide/usage/linter/rules/react/hooks)                                                   | `off`                | `suspicious`    |                                                                                 |
| [`memo-dependencies`](/docs/guide/usage/linter/rules/react/memo-dependencies)                           | `off`                | `suspicious`    |                                                                                 |
| `fbt`                                                                                                   | `off`                | 尚未实现 | 这是 Meta 内部使用的 FBT 类别。                                           |
| `memoized-effect-dependencies`                                                                          | `off`                | 尚未实现 | 上游的 `EffectDependencies` 类别在 Rust 编译器移植版中不存在。 |

### Transform

安装 [`oxc-transform-react`](https://npmx.dev/package/oxc-transform-react)：

```sh
pnpm add -D oxc-transform-react
```

```js
import { transformSync } from "oxc-transform-react";

const result = transformSync(
  "Component.tsx",
  `
    export function Component({ name }: { name: string }) {
      return <div>Hello {name}</div>;
    }
  `,
  {
    reactCompiler: {
      target: "19",
    },
    jsx: {
      runtime: "automatic",
    },
  },
);

if (result.fatal) {
  console.error(result.errors);
} else {
  console.log(result.code);
}
```

### [`@vitejs/plugin-react`](https://npmx.dev/package/@vitejs/plugin-react)

原生集成正在等待 [vitejs/vite-plugin-react#1419](https://github.com/vitejs/vite-plugin-react/pull/1419) 合并。

我们将这一框架专属的集成保留在 [`@vitejs/plugin-react`](https://npmx.dev/package/@vitejs/plugin-react) 中，而不是将其添加到 Vite 或 Rolldown，这样可以让核心工具链保持厂商中立。

## 基准测试

我们的[初步基准测试](https://github.com/oxc-project/bench-transformer#react-compiler)显示，[`oxc-transform-react`](https://npmx.dev/package/oxc-transform-react) 的速度比 [`babel-plugin-react-compiler`](https://npmx.dev/package/babel-plugin-react-compiler) 快 10 倍以上。

过去需要大约 100 毫秒进行编译的文件，现在只需大约 10 毫秒。

## 背景

React Compiler 是一种构建时编译器，可以自动对 React 组件和 hooks 进行记忆化。[React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1) 于去年以 [`babel-plugin-react-compiler`](https://npmx.dev/package/babel-plugin-react-compiler) 的形式发布。

今年早些时候，React 团队[将 React Compiler 移植到了 Rust](https://github.com/react/react/pull/36173)。我们开始寻找将其集成到 Oxc 中的方法。

我们最初的集成使二进制文件增加了[超过 5 MiB](https://github.com/oxc-project/oxc/pull/22942)，我们相信还可以显著提升其性能。

我们的第一次尝试是维护一个[同步分支](https://github.com/oxc-project/forked-react-compiler)，并将其发布为 crates。目标是让 Rust 工具生态系统，包括 SWC、Bun 和 Biome，都能使用并维护同一个共享分支。

随后我们发现，这个版本的 React Compiler 维护了自己的 Babel 形状 AST。Oxc 必须先将其 AST 转换为该表示形式，然后运行编译器，之后再将其转换回来。我们知道，直接在 Oxc 的 AST 上运行编译器可以让它更快。这个 Rust 移植版也尚未完成，存在缺陷，并且还没有与原始 Babel 实现保持一致。

最终，我们决定[将 React Compiler 内置到 Oxc 中](https://github.com/oxc-project/oxc/tree/main/crates/oxc_react_compiler)，以实现更紧密的集成。这样我们就可以移除中间的 Babel AST，并让 React Compiler 直接在 Oxc AST 上运行。

经过大量工作后，我们显著提升了它的速度并减小了体积，同时改进了一致性、诊断信息和源映射。

## 改进

原始 Rust 移植版在合并时尚未完成。我们完成了许多缺失部分，修复了错误，并添加了以下改进。

### 性能

根据我们的本地测量，Oxc 版本的速度约为 [React Compiler 原始 Rust 移植版](https://github.com/react/react/pull/36173)的两倍。

直接在 Oxc 的 AST 上运行还减少了内存分配。

### 一致性

Oxc 与 [`babel-plugin-react-compiler` 的最新实验版本](https://npmx.dev/package/babel-plugin-react-compiler/v/0.0.0-experimental-a1856f3-20260507)保持一致，但其默认选项仍与 Babel React Compiler v1 保持一致，因为最新实验版本更改了一些默认值。

我们已在 100 多个大型且热门的代码仓库中，将我们的输出与该版本进行了比较，覆盖超过 100,000 个源文件，并确保所有文件都能编译为相同的输出。

### 诊断信息

我们改进了 React Compiler 的诊断信息，使编码代理更容易修复问题。Oxlint 现在会显示紧凑的代码帧、相关源位置、帮助消息和链接。

```text
⚠ react(immutability): This value cannot be modified
 ╭─[immutability.tsx:7:11]
6 │           const [state, setState] = useState({a: 0});
7 │           state.a = 1;
  ·           ──┬──
  ·             ╰── value cannot be modified
8 │           return <div>{props.foo}</div>;
  ╰────
help: Modifying a value returned from 'useState()', which should not be modified directly. Use the setter function to update instead
note: React Compiler skipped optimizing this component or hook. Additional guidance: https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
```

### 二进制大小

我们[第一次基于分支的集成](https://github.com/oxc-project/oxc/pull/22942)生成了一个 8.66 MiB 的 macOS ARM64 二进制文件。在移除 Babel AST 和 JSON 往返、替换完整的正则表达式引擎，并移除未使用的编译器代码后，已发布的 [`oxc-transform-react` v0.144.0 binding](https://npmx.dev/package/@oxc-transform-react/binding-darwin-arm64)大小为 3.97 MiB。

React Compiler 仍处于独立的可选软件包中，因此不会增加 Oxc Transform 的二进制大小。

### 源映射

原始 Rust 移植版的源映射支持不完整。

我们确保源映射能够在 React Compiler、TypeScript、JSX 和 React Fast Refresh 之间正确工作。

## 未来工作

代码中仍有许多 TODO。截至本文撰写时，[原始 Rust crates](https://github.com/oxc-project/forked-react-compiler/tree/39b638ccbb0ac5f87a1420523707fc463d35a824/react-compiler/crates) 中包含 16 个字面量 `TODO` 标记和 62 条会生成 `Todo` 诊断信息的代码路径。[Oxc 内置的编译器](https://github.com/oxc-project/oxc/tree/794891d93afabfb4a61dbf4b7ada4cca984b7190/crates/oxc_react_compiler) 中包含 10 个字面量 `TODO` 标记和 57 个集中的 `Todo` 诊断构造器。

我们将维护 Rust 移植版，完成剩余的 TODO，并修复报告的 React Compiler 问题。我们还发现了原始 Babel 实现中的错误，并希望对其进行调查和修复。欢迎提交错误报告和贡献。

## 致谢

感谢 React Compiler 团队，尤其是 [Joseph Savona](https://github.com/josephsavona)，感谢他们开发并开源了 Rust 移植版，使此次集成成为可能。

感谢 [Lauren Tan](https://github.com/poteto) 解答我们的问题。

---

请试用，并通过[最小复现](https://github.com/oxc-project/oxc/issues)报告任何问题。
