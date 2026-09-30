# 测试基础设施

::: info

本文旨在邀请大家分享改进我们测试基础设施的想法，
请随时在 [Discord][discord-url] 上联系我们。

:::

在 Oxc 中，正确性和可靠性受到极度重视。

我们花费大量时间加强测试基础设施，以防止问题传播到下游工具。

## 解析器

### 一致性

来自 [Test262](https://github.com/tc39/test262)、[Babel](https://github.com/babel/babel) 和 [TypeScript](https://github.com/microsoft/TypeScript) 的解析器测试用于测试 JavaScript、TypeScript 和 JSX 语法。

共享的 [`tasks/coverage`](https://github.com/oxc-project/oxc/tree/main/tasks/coverage) 测试工具会在解析器、语义分析、代码生成、转换、压缩和 ESTree 测试中复用这些测试夹具集合。

对于 Test262，会包含所有 stage 4 和正则表达式测试。

所有一致性结果都存储在快照文件中，以便跟踪变化：

- [test262.snap](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_test262.snap).
- [babel.snap](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_babel.snap).
- [typescript.snap](https://github.com/oxc-project/oxc/blob/main/tasks/coverage/snapshots/parser_typescript.snap).

所有语法错误都写入这些快照文件以便对比变化。

### 模糊测试

为了确保解析器在遇到随机数据时不会 panic，使用了三个模糊测试工具：

1. [`cargo-fuzz`](https://github.com/oxc-project/fuzz-oxc) 用于向解析器发送随机数据。
2. [shift-fuzzer-js](https://github.com/shapesecurity/shift-fuzzer-js) 由 [bakkot](https://github.com/bakkot) 开发，用于生成随机但有效的 AST。
3. [Automated-Fuzzer](https://github.com/qarmin/Automated-Fuzzer) 由 [qarmin](https://github.com/qarmin) 开发，会[主动报告](https://github.com/oxc-project/oxc/issues?q=is%3Aissue+author%3Aqarmin+)崩溃。

### 内存安全

Oxc 使用 arena 分配器作为 AST 和其他数据的内存分配器。
任何 AST 节点类型都没有 `Drop` 实现。
这由 Oxc 分配器在编译时强制执行：如果代码尝试在 arena 中分配实现了 `Drop` 的类型，就会产生编译错误。这样可以在静态层面确保拥有堆分配数据的类型不会存储在 arena 中，避免内存泄漏。

### 不安全代码

Oxc 使用 `unsafe` 代码进行性能优化。我们的目标是将 `unsafe` 限制在对外提供安全 API 的自包含数据结构中。[Miri](https://github.com/oxc-project/oxc/blob/main/.github/workflows/miri.yml) 会在包含这些结构的 crate 发生相关变更时运行。

## 检查器

### 快照诊断

所有检查器诊断信息都会写入[快照文件](https://github.com/oxc-project/oxc/tree/main/crates/oxc_linter/src/snapshots)，用于回归测试。

例如：

```javascript
 ⚠ typescript-eslint(adjacent-overload-signatures): All "foo" signatures should be adjacent.
  ╭─[adjacent_overload_signatures.tsx:3:18]
2 │         function foo(s: string);
3 │         function foo(n: number);
  ·                  ───
4 │         type bar = number;
5 │         function foo(sn: string | number) {}
  ·                  ───
6 │       }
  ╰────
```

### 生态系统 CI

[oxc-ecosystem-ci](https://github.com/oxc-project/oxc-ecosystem-ci) 针对大型仓库运行 Oxlint 和 Oxfmt。Oxlint 检查误报、回归和 panic；Oxfmt 检查格式差异、代码丢失、错误和 panic。测试的仓库包括：

- [rolldown/rolldown](https://github.com/rolldown-rs/rolldown)
- [napi-rs/napi-rs](https://github.com/napi-rs/napi-rs)
- [toeverything/affine](https://github.com/toeverything/affine)
- [preactjs/preact](https://github.com/preactjs/preact)
- [microsoft/vscode](https://github.com/microsoft/vscode)
- [bbc/simorgh](https://github.com/bbc/simorgh)
- [elastic/kibana](https://github.com/elastic/kibana)
- [DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

## 幂等性

幂等性测试用于所有工具的集成测试和端到端测试。

幂等性测试遵循以下过程：

```javascript
let sourceText = "foo";
let printed = tool(sourceText);
let printed2 = tool(printed);
assert(printed == printed2);
```

例如，幂等地最小化一段代码应该产生相同的结果。

代码生成器、转换器、压缩器和格式化器都会在 Test262、Babel 和 TypeScript 测试文件上进行幂等测试。

## 集成测试

集成测试优于单元测试。

[codecov](https://app.codecov.io/gh/oxc-project/oxc) 目前报告
<span style="display:inline-block">[![代码覆盖率][code-coverage-badge]][code-coverage-url]</span>
行覆盖率。

## 端到端

仓库 [monitor-oxc](https://github.com/oxc-project/monitor-oxc) 针对 [npm-high-impact](https://github.com/wooorm/npm-high-impact) 中前 3000 个 npm 包执行端到端测试。

它会对这些软件包的文件运行代码生成、转换、压缩、名称混淆、空白移除和格式化。

其 `package.json` 将这些软件包列为依赖项：

```json
"devDependencies": {
  "@aashutoshrathi/word-wrap": "latest",
  "@actions/http-client": "latest",
  "@adobe/css-tools": "latest",
  "@alloc/quick-lru": "latest",
 ...
  "zip-stream": "latest",
  "zod": "latest",
  "zone.js": "latest",
  "zustand": "latest"
}
```

以及一个导入这些包并断言导入的测试文件：

`src/dynamic.test.mjs`

```javascript
import test from "node:test";
import assert from "node:assert";
test("@aashutoshrathi/word-wrap", () => import("@aashutoshrathi/word-wrap").then(assert.ok));
test("@actions/http-client", () => import("@actions/http-client").then(assert.ok));
test("@adobe/css-tools", () => import("@adobe/css-tools").then(assert.ok));
test("@alloc/quick-lru", () => import("@alloc/quick-lru").then(assert.ok));
...
test("zod", () => import("zod").then(assert.ok));
test("zone.js", () => import("zone.js").then(assert.ok));
test("zustand", () => import("zustand").then(assert.ok));
test("zwitch", () => import("zwitch").then(assert.ok));
```

此测试文件在每个工具（代码生成器、转换器、最小化器等）重写 `node_modules` 中的所有文件后运行。

该工作流每三小时运行一次。

还会针对 Vue 测试隔离声明。

---

如果你对如何改进我们的测试基础设施有任何想法，
欢迎在 [Discord][discord-url] 上联系我们。

[discord-url]: https://discord.gg/9uXCAwqQZW
[code-coverage-badge]: https://codecov.io/github/oxc-project/oxc/branch/main/graph/badge.svg
[code-coverage-url]: https://codecov.io/gh/oxc-project/oxc
