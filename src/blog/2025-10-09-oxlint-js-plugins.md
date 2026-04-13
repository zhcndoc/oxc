---
title: Oxlint JS 插件预览
authors:
  - overlookmotel
  - cameron
---

<AppBlogPostHeader />

<Alert type="info">

**本文宣布 Oxlint JS 插件的预览版发布。** JS 插件此后已达到 Alpha 阶段！请参阅 [Oxlint JS Plugins Alpha 公告](/blog/2026-03-11-oxlint-js-plugins-alpha) 了解最新特性和改进。

</Alert>

<br>

今年早些时候，[我们向社区征求了意见](https://github.com/oxc-project/oxc/discussions/10342)，
以便为 Oxlint 支持自定义 JS 插件的设计提供参考。今天，我们很高兴地宣布经过数月
的研究、原型设计，以及最终的构建成果：

**Oxlint 支持用 JS 编写的插件！**

#### 主要特性

- 与 ESLint 兼容的插件 API。Oxlint 将能够运行许多现有的 ESLint 插件而无需修改。
- 另一种略有不同的 API，可实现更好的性能。

#### 这是什么以及不是什么

此预览版仅仅是个开始。重要的是要注意：

- 此初始版本并未实现 ESLint 插件 API 的全部功能。
- 性能不错，但会变得*更加*出色——我们有许多优化正在计划中。

用于代码检查规则的最常用 API [已实现](#features)，因此许多现有的 ESLint 规则已经可以工作。
但与 token 相关的 API 尚未包含，因此风格（格式化）规则将无法工作。

我们邀请用户试用一下，提供反馈，并为下一阶段的开发优先事项提供参考。

#### 本文涵盖内容

1. 如何使用它。
2. 接下来会有什么。
3. 一些技术细节，使我们能够采用“鱼与熊掌兼得”的方法，既提供 ESLint 兼容性
   **又** 提供卓越的性能。

## 快速开始

在项目中安装 Oxlint：

```sh
pnpm add -D oxlint
```

编写自定义 JS 插件：

```js
// plugin.js

// 最简单的规则 - 禁止 debugger
const rule = {
  create(context) {
    return {
      DebuggerStatement(node) {
        context.report({
          message: "No debugger!",
          node,
        });
      },
    };
  },
};

const plugin = {
  meta: {
    name: "best-plugin-ever",
  },
  rules: {
    "no-debugger": rule,
  },
};

export default plugin;
```

创建启用插件的配置文件：

```json
// .oxlintrc.json
{
  "jsPlugins": ["./plugin.js"],
  "rules": {
    "best-plugin-ever/no-debugger": "error"
  }
}
```

添加一个待检查的文件：

```js
// foo.js
debugger;
```

运行 Oxlint：

```sh
pnpm oxlint
```

预期看到：

```
 x best-plugin-ever(no-debugger): No debugger!
  ,-[foo.js:1:1]
1 | debugger;
  : ^^^^^^^^^
  `----
```

有关编写插件的更多详情，请参阅 [文档](/docs/guide/usage/linter/writing-js-plugins.html)。

## 替代 API

Oxlint 还提供了一种略有不同的 API，可实现更好的性能。

**此替代 API 生成的插件既兼容 ESLint，也兼容 Oxlint。**

示例规则：标记包含超过 5 个类声明的文件：

#### ESLint 版本

```js
const rule = {
  create(context) {
    let classCount = 0;

    return {
      ClassDeclaration(node) {
        classCount++;
        if (classCount === 6) {
          context.report({ message: "Too many classes", node });
        }
      },
    };
  },
};
```

#### 替代 API 版本

```js
import { defineRule } from "oxlint";

const rule = defineRule({
  createOnce(context) {
    // 定义计数器变量
    let classCount;

    return {
      before() {
        // 在遍历每个文件的 AST 之前重置计数器
        classCount = 0;
      },
      // 与之前相同
      ClassDeclaration(node) {
        classCount++;
        if (classCount === 6) {
          context.report({ message: "Too many classes", node });
        }
      },
    };
  },
});
```

#### 差异

1. 将规则对象包裹在 `defineRule(...)` 中。

```diff
- const rule = {
+ const rule = defineRule({
```

2. 使用 `createOnce` 代替 `create`。

```diff
-   create(context) {
+   createOnce(context) {
```

3. 将任何每文件设置从 `create` 主体移动到 `before` 钩子。

```diff
-     let classCount = 0;
+     let classCount;

      return {
+       before() {
+         classCount = 0; // 重置计数器
+       },
        ClassDeclaration(node) {
          classCount++;
          if (classCount === 6) {
            context.report({ message: "Too many classes", node });
          }
        },
      };
    },
  });
```

这是唯一的显著差异——`create`（ESLint 的方法）_为每个文件_ 重复调用，
而 `createOnce` 仅调用一次。

所有其他 API 的行为与 ESLint 完全相同。

为何此替代 API 有可能大幅提高性能的原因在
[文档](/docs/guide/usage/linter/writing-js-plugins.html#why-is-the-alternative-api-faster) 中解释。

## 性能

如上所述，在 Oxlint JS 插件的此初始预览版中，性能并非我们的关注重点。
我们的主要目标是填充足够的 API，使 JS 插件在实际项目中有用，
并收集早期采用者的反馈。

目前的性能尚可，但绝不出色。

然而——我们认为这是重点——我们*下一个* 版本的原型表明，
一旦加入各种优化（参见 [幕后技术](#under-the-hood)），
我们确定的架构设计能够实现*卓越* 的性能。

我们将在未来几个月内应用这些优化，用户将看到相比当前版本有多倍的速度提升。

话虽如此，即使没有这些优化，Oxlint 的性能仍然具有竞争力。

Oxlint 与 ESLint 检查中型 TypeScript 项目 [vuejs/core](https://github.com/vuejs/core) 的对比：

| Linter                       | Time     |
| ---------------------------- | -------- |
| ESLint                       | 4,116 ms |
| ESLint multi-threaded        | 3,710 ms |
| Oxlint                       | 48 ms    |
| Oxlint with custom JS plugin | 236 ms   |

<div>
<details>
<summary>详情</summary>

:::info

- 基准测试仓库：https://github.com/overlookmotel/vue-core-cam/tree/bench-js-plugins
- 基准测试环境：MacBook Air M3, 24GB RAM
- 基准测试命令：

```sh
hyperfine -i --warmup 3 \
  './node_modules/.bin/oxlint --silent' \
  './node_modules/.bin/oxlint -c .oxlintrc-with-custom-plugin.json --silent' \
  'USE_CUSTOM_PLUGIN=true ./node_modules/.bin/eslint .' \
  'USE_CUSTOM_PLUGIN=true ./node_modules/.bin/eslint . --concurrency=auto'
```

注意：撰写本文时 NPM 上的 Oxlint 版本 (1.23.0) 存在一个影响此基准测试的 bug，并且极大地
低估了 JS 插件的开销。上述结果是使用最新的 `main` 分支，在修复 bug 后，
在 [此提交](https://github.com/oxc-project/oxc/commit/cd266b4c101c35c33e122457cdd0b514b44597a9) 处获得的。
另见 [下方](#edit-18th-oct-2025)。

:::

</details>
</div>

在此示例中，向 Oxlint 添加一个简单的 JS 插件确实会产生显著开销，但 Oxlint 仍然比
ESLint 快 15 倍，即使使用 ESLint 新的多线程运行器。

显然，更复杂的 JS 插件，或许多插件，将具有更高的性能成本。

## 特性

Oxlint 支持大多数通常用于仅依赖 AST 检查的插件/规则中的 ESLint API。
这包括大多数“修复代码”类规则。

它尚未支持基于 token 的 API，因此风格（格式化）规则暂时无法工作。

#### 已支持

- AST 遍历
- AST 探索（`node.parent`, `context.sourceCode.getAncestors`）
- 修复
- 选择器（[ESLint 文档](https://eslint.org/docs/latest/extend/selectors)）
- `SourceCode` API（例如 `context.sourceCode.getText(node)`）

#### 尚未支持

- 语言服务器 (IDE) 支持
- 规则选项
- 建议
- ~~作用域分析~~（自 v1.25.0 起 [已实现](https://github.com/oxc-project/oxc/pull/14890)）
- 与 token 和注释相关的 `SourceCode` API（例如 `context.sourceCode.getTokens(node)`）
- 控制流分析

## 接下来会有什么

在未来几个月内，我们将：

#### 1. 完善插件 API 覆盖面

目标是支持 100% 的 ESLint 插件 API 覆盖面，以便 Oxlint 最终能够运行*任何* ESLint
插件而无需修改。

#### 2. 提升性能

性能已经不错，但我们在原型设计期间证明了进一步优化会带来许多显著的性能提升。我们将应用它们，
使 Oxlint 中的 JS 插件运行速度尽可能接近 Rust 速度。

## 幕后技术

本文的其余部分对于使用 Oxlint 的 JS 插件并非必需。但如果你对我们实现方式的
技术细节感兴趣，请继续阅读...

### 大问题：是否兼容 ESLint？

今年早些时候，[我们向社区提出的问题](https://github.com/oxc-project/oxc/discussions/10342)
是 Oxlint 是否应该旨在实现与 ESLint 兼容的插件 API。

显然，就熟悉度和从 ESLint 迁移的便利性而言，与 ESLint 兼容的接口是理想的。

然而，Oxlint 以其卓越的性能而闻名，过多妥协并不可取。

过去几个月我们原型设计工作的主要目标是量化性能
与 ESLint 兼容性之间的权衡，并调查是否存在一种“鱼与熊掌兼得”的解决方案，能够同时满足两者——
提供与 ESLint 兼容的 API _和_ 可接受的性能（这里的“可接受”意味着非常快！）

我们相信通过结合不同的方法，我们找到了一种满足两者需求的方式。

### 替代 API

请参阅 [文档](/docs/guide/usage/linter/writing-js-plugins.html#why-is-the-alternative-api-faster) 中的解释，
了解为何此 API 能释放更高性能的潜力。

### 原始传输

像 Oxc 这样的工具将 JS/TS 文件的代码表示为"AST"
（[抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree)）。
AST 非常大——比它们代表的源代码大得多。

通常，JS 与 Rust 等原生语言之间进行高性能互操作的最大障碍是
在“两个世界”之间传输如此大型数据结构所涉及的序列化
和反序列化。

在 JS 和 Rust 之间移动 AST 最简单和最常见的方法是：将 AST 序列化为 JSON，作为字符串发送到 JS，
然后使用 `JSON.parse` 再次“还原”它。但这非常慢。通常这些
转换的成本如此之高，以至于它们大大超过了首先使用原生代码所带来的性能增益。
其他序列化格式比 JSON 更高效，但它们仍然有相当大的开销。

我们开发了一种“原始传输”方案，通过使用 Rust 的原生内存布局作为序列化格式，完全消除了序列化（有关其工作原理的更多详情见 [此处](https://github.com/oxc-project/oxc/issues/2409)）。

“原始传输”是当前 JS 插件实现的基础。

### 惰性反序列化

良好性能的第二大敌人，特别是在工作线程中跨多个 CPU 核心运行 JS 时，
是垃圾回收器。你创建的每个对象也需要被销毁以回收其内存。
在 JS 中，这是垃圾回收器的工作。像 V8 这样的 JS 引擎经过高度优化，但垃圾回收
仍然是一个昂贵的过程，并且 GC 会“窃取”实际工作负载的 CPU 资源。

我们原型化了一个 AST 访问器，它*惰性* 地反序列化 AST，并且只反序列化实际上*需要* 的 AST 部分。

例如，如果你的 lint 规则与类声明有关，此访问器将飞过大部分 AST 而不做太多事情，
并且只会为 `ClassDeclaration` AST 节点创建 JS 对象，然后将这些对象传递给规则的代码
进行处理。对于其余的 AST（变量声明、`if` 语句、函数等），根本不需要创建
节点对象。

这有 2 个效果：

1. 原始传输将序列化成本降为零。惰性也大大减少了另一面
   （反序列化）。
2. 大大降低了垃圾回收器压力。

Deno 采用了类似的方法，这在
[Marvin Hagemeister 的博客文章](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-11/) 中解释得非常精彩，并且 Deno lint
有一个非常高效的实现。

然而，我们发现正是惰性反序列化与“原始传输”的结合提供了*真正* 好的
性能。我们的测试发现，消除了这两项开销后，JS 插件可以以更快的速度运行。

此优化尚未包含在当前版本的 JS 插件中。我们将在未来版本中实现它。

## 试一试！

请尝试一下 JS 插件并报告您的体验。所有反馈——无论是正面的还是负面的——我们都感激不尽。

特别是，如果您发现 Oxlint 缺少您的插件工作所需的一些 API，请告诉我们。我们将在未来几个月内填补 API 的空白，并将优先考虑需求最大的那些。

祝您 lint 愉快！

---

#### 编辑：2025 年 10 月 18 日

这篇博客文章最初于 10 月 9 日发布的版本包含了一些基准测试结果，显示 Oxlint JS 插件的性能比实际情况要好得多。这是由于 Oxlint 中的一个 bug 造成的，该 bug 导致在某些情况下，当配置包含 overrides 时，许多文件会跳过 JS 插件。这个 bug 导致我们引用的基准测试中 JS 插件的性能被严重高估。

我们为这个错误真诚地道歉，并感谢 [Herrington Darkholme](https://github.com/HerringtonDarkholme) 指出了这个错误。
