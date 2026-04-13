---
title: Oxlint JS 插件 Alpha
outline: deep
authors:
  - overlookmotel
  - cameron
---

<AppBlogPostHeader />

<br>

**Oxlint 的 JavaScript 插件已达到 Alpha 阶段 - 我们预计 80% 的 ESLint 用户现在可以切换到 Oxlint，并且能够“开箱即用”。**

Oxlint 已经用 Rust 实现了超过 650 条流行的 lint 规则，以原生速度运行。JS 插件填补了空白 - 一个兼容 ESLint 的插件 API，让你可以在 Oxlint 中运行现有的 ESLint 插件并编写你自己的自定义规则。大多数规则享有原生性能，其余规则拥有完全的灵活性。

自从去年 [首次技术预览](./2025-10-09-oxlint-js-plugins) 以来，我们完善了几乎整个 ESLint 插件 API，添加了 TypeScript 插件支持、自动修复、IDE 集成以及 [重大的性能提升](#performance)。

这意味着许多团队可以用 Oxlint 替换 ESLint，而无需重写他们的 lint 规则。

这个 Alpha 版本标志着我们认为 JS 插件已准备好在真实世界项目中采用的节点。

大多数项目应该会发现 Oxlint 现在可以作为 ESLint 的直接替代品，迁移简单，并且 lint 时间大幅减少。

### 功能

- 无需修改即可运行大多数现有的 ESLint 插件。
- 使用 JavaScript 或 TypeScript 编写你自己的自定义 lint 规则。
- 从 JS 插件规则获得自动修复和建议。
- 通过语言服务器在 IDE 中实时查看 JS 插件诊断。

### 它有多可靠？

Oxlint JS 插件支持针对 ESLint 本身的完整测试套件进行了测试，也针对广泛的 ESLint 插件进行了测试，包括：

| 插件                                                                                               | 测试数 |  通过率 |
| -------------------------------------------------------------------------------------------------- | -----: | ------: |
| ESLint 内置规则                                                                                    | 33,006 |    100% |
| [React hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)（包括 React Compiler 规则） |  5,007 |    100% |
| [ESLint Stylistic](https://eslint.style/)                                                          | 18,310 |  99.99% |
| [Testing Library](https://www.npmjs.com/package/eslint-plugin-testing-library)                     | 17,016 |    100% |
| [SonarJS](https://www.npmjs.com/package/eslint-plugin-sonarjs)                                     |  3,951 | 99.6%\* |
| [e18e](https://www.npmjs.com/package/@e18e/eslint-plugin)                                          |    474 |  100%\* |

<small>\* 不包括类型感知规则</small>

如果插件不在上面的列表中，它很可能仍然可以工作 - 只是尚未包含在 [我们的合规性测试套件](https://github.com/oxc-project/oxc/tree/13606c3ab16cc273a6fad7e2de964ffa0ad0a241/apps/oxlint/conformance) 中。

ESLint 自己的测试覆盖了整个 API 表面，所以 100% 的通过率让我们有信心覆盖了边界情况以及正常路径。请尝试一下并告诉我们反馈！

Oxlint 已经被许多公司和项目在生产环境中使用，包括 [Midjourney](https://x.com/_chenglou/status/2026408795857981610)、[Preact](https://github.com/preactjs/preact)、[Posthog](https://github.com/PostHog/posthog)、[Outline](https://github.com/outline/outline) 和 [Actual](https://github.com/actualbudget/actual)。

### 它目前还不能做什么

- 对前端框架自定义文件格式的支持有限（例如 Svelte、Vue、Angular）- 今年晚些时候推出。
- 没有自定义类型感知规则（TypeScript-ESLint 的规则已经通过 [类型感知 lint](../docs/guide/usage/linter/type-aware) 内置到 Oxlint 中）。
- 一些用户发现 Windows 上的体验欠佳。内存不足错误是 [一个已知问题](https://github.com/oxc-project/oxc/issues/19395)，特别是在 Windows 上。我们正在解决。与此同时，如果你遇到这个问题，我们建议在可行的情况下在 WSL 中运行 Oxlint。

你可以在 [跟踪问题](https://github.com/oxc-project/oxc/issues/19918) 上关注我们填补这些空白的进展。

## 开始使用

将 `oxlint` 安装为开发依赖：

```sh
pnpm add -D oxlint
```

在 `package.json` 中添加脚本：

```json [package.json]
{
  "scripts": {
    "lint": "oxlint"
  }
}
```

创建配置文件（或使用 [我们的迁移工具](#migrating-from-eslint)）：

```json [.oxlintrc.json]
{
  "jsPlugins": ["eslint-plugin-testing-library"],
  "rules": {
    "testing-library/no-render-in-lifecycle": "error"
  }
}
```

Lint 你的项目：

```sh
pnpm run lint
```

### 从 ESLint 迁移

大多数项目应该会发现从 ESLint 迁移很简单。

最简单的途径是通过 `@oxlint/migrate` 工具。

```sh
npx @oxlint/migrate eslint.config.js
```

或者让你的编码代理使用 [`migrate-oxlint` 技能](https://skills.sh/oxc-project/oxc/migrate-oxlint) 为你完成。

查看更多详情请参阅 [迁移指南](../docs/guide/usage/linter/migrate-from-eslint)。

## ESLint 规则

Oxlint 已经原生实现了大多数 ESLint 的内置规则，用 Rust 重写，但并非所有规则都已实现。

为了弥补这一差距，我们提供了 [oxlint-plugin-eslint](https://www.npmjs.com/package/oxlint-plugin-eslint)，其中包含所有 ESLint 内置规则，打包为 Oxlint JS 插件。

这解锁了诸如 `no-restricted-syntax` 之类的规则，这些规则尚未在 Oxlint 中原生实现。

```jsonc [.oxlintrc.json]
{
  "jsPlugins": ["oxlint-plugin-eslint"],
  "rules": {
    // 注意："eslint-js" 而不是 "eslint"
    "eslint-js/no-restricted-syntax": [
      "error",
      {
        "selector": "ThrowStatement > CallExpression[callee.name=/Error$/]",
        "message": "Use `new` keyword when throwing an `Error`.",
      },
    ],
  },
}
```

Oxlint 还原生实现了来自 [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc) 等插件的子集规则。对于 Oxlint 本身未实现的规则，你可以直接使用 `eslint-plugin-jsdoc` 包。这是推荐的模式：

```jsonc [.oxlintrc.json]
{
  "jsPlugins": [
    // 为插件 "jsdoc-js" 设置别名
    { "name": "jsdoc-js", "specifier": "eslint-plugin-jsdoc" },
  ],
  "rules": {
    // 使用别名来引用插件中的规则
    "jsdoc-js/check-examples": "error",
    "jsdoc-js/require-description": "error",
    // 对 Oxlint 原生实现的规则使用普通的 "jsdoc"
    "jsdoc/require-property-name": "error",
    "jsdoc/require-property-description": "error",
  },
}
```

## 性能

自从首次技术预览以来，我们已经将驱动 JS 插件的大量代码"Rust 化"，这带来了显著的性能提升。特别是依赖 tokens API 的插件（例如 ESLint Stylistic）比以前快了 5 倍。

作为一个基准测试，我们将 Node.js 的仓库从 ESLint 迁移到了 Oxlint。Node.js 是一个大型项目，利用了许多自定义 lint 规则，以及几个重量级的 ESLint 插件（总共 98 条 JS lint 规则）。

| Linter | 时间       | 加速比 |
| ------ | ---------- | ------ |
| ESLint | 1 分 43 秒 |        |
| Oxlint | 21 秒      | 4.8 倍 |

<div>
<details>
<summary>详情</summary>

:::info

- [基准测试仓库](https://github.com/overlookmotel/node)
- 6298 个文件已 lint
- 104 个内置 Oxlint 规则 (Rust)
- 75 个来自 JS 插件的规则 (JS)
- 23 个自定义规则 (JS)
- 基准测试环境：Mac Mini M4, 48GB RAM, Node.js 24.14.0

- ESLint 基准测试：

```sh
git checkout bench-eslint
npm ci
hyperfine -i --warmup 1 --runs 5 "node --run eslint"
```

- Oxlint 基准测试：

```sh
git checkout bench-oxlint
npm ci
hyperfine -i --warmup 1 --runs 5 "node --run oxlint"
```

:::

</details>
</div>

当前使用 TypeScript-ESLint 或 `eslint-plugin-import` 的项目可能会看到 **更大** 的性能提升。[我们 Discord 中的一位用户](https://discord.com/channels/1079625926024900739/1080712072012238858/threads/1478161352097796206) 报告说，当他们从 ESLint 切换到 Oxlint 并大量使用 JS 插件时，他们公司 200 万行代码库的 lint 速度提升了 16 倍。较少使用 JS 插件的项目报告的速度提升高达 100 倍。

### 未来的性能改进

这只是开始！

虽然带有 JS 插件的 Oxlint 已经比 ESLint 快得多，但我们管道中还有更多的优化。

Oxlint JS 插件性能的关键是一种新的、高度优化的、用于 Rust 和 JS 之间通信的底层机制，我们称之为 "raw transfer"。

Rust/JS 边界一直是支持 JS 插件的原生工具的根本问题。原生代码很快，但在 Rust 和 JS 之间来回发送数据的成本可能非常高，以至于抵消了这种增益，导致整体性能平庸。

Raw transfer 将数据在 Rust 和 JS 之间移动的成本降低到几乎为零，终于使原生代码和 JS 插件能够有效地协同工作。

Raw transfer 的第一次迭代已经在 Oxlint 的底层工作，但我们才刚刚开始利用它能做什么。随着我们继续这项工作，我们预计性能将进一步发生阶梯式变化，使 JS 插件接近原生 Rust 性能。

如果你对细节感兴趣，Oxc 核心团队成员 [@overlookmotel](https://github.com/overlookmotel) 就这个主题 [在 ViteConf 2025 做了一次演讲](https://www.youtube.com/watch?v=ofQV3xiBgT8)。

简而言之：Oxlint 已经是现存最快的 JS/TS linter。它将变得更快。

### 性能提示 1：使用格式化工具

我们强烈建议从使用 linter 进行代码格式化转向使用 [Oxfmt](../docs/guide/usage/formatter)（或你首选的格式化工具），如果可以的话。

Oxfmt 比 Prettier 快 30 倍，并且与 ESLint Stylistic 等 linter 插件相比，也将大幅减少 lint 时间。

Oxlint 和 Oxfmt 是非常强大的组合！

### 性能提示 2：明智地选择插件

与许多人的看法相反，编写高性能的 JavaScript 代码是完全可能的。Oxlint 速度快不仅仅是因为它是用 Rust 编写的——它也是经过精心设计，考虑了性能。

JS 插件本身的代码不在 Oxlint 的控制之下。要从整体上获得 Oxlint 的良好性能，需要你选择的 JS 插件也表现良好。

如果插件使用低效的算法或执行大量的文件系统操作，它在 ESLint 中会很慢，在 Oxlint 中也会很慢。Oxlint _可以_ 做的是提供一个闪电般的解析器和供插件接口的高性能 API，但它不能神奇地让缓慢的 JS 代码变快。

如果你发现 lint 速度不如你想要的快，我们将来会提供一个实用工具来诊断哪些插件/规则是你项目中的性能瓶颈。

## 创建自定义插件

如果您的项目有特定需求，为 Oxlint 创建自定义 JS 插件很简单。

请参阅 [JS 插件指南](../docs/guide/usage/linter/js-plugins)。

# 常见问题

**Oxlint 可以运行 ESLint 插件吗？**
可以。大多数插件无需修改即可工作。

**Oxlint 比 ESLint 更快吗？**
是的。基准测试通常显示 4 倍到 100 倍的速度提升。

**我可以逐步迁移吗？**
可以。您可以同时运行 Oxlint 和 ESLint。

## 致谢

将 JS 插件推进到这个里程碑是许多人共同努力的结果。特别是，我们要感谢：

- [@Sysix](https://github.com/Sysix) 为语言服务器集成所做的不懈努力。
- [@lilnasy](https://github.com/lilnasy) 构建了许多 API。

## 加入社区

我们很乐意听取您对 Oxlint JS 插件的反馈，并很高兴看到它如何帮助改善您的开发工作流程。

联系我们：

- **Discord**：加入我们的 [社区服务器](https://discord.gg/9uXCAwqQZW) 进行实时讨论
- **GitHub**：在 [GitHub Discussions](https://github.com/oxc-project/oxc/discussions) 上分享反馈
- **Issues**：向 [oxc](https://github.com/oxc-project/oxc/issues) 报告 `oxlint` 错误。
