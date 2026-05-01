---
title: 添加 Linter 规则
outline: deep
---

# 添加 Linter 规则

为 Oxlint 做贡献最好且最简单的方法是添加新的 linter 规则。

本指南将带你完成这个过程，以 ESLint 的
[`no-debugger`](https://eslint.org/docs/latest/rules/no-debugger) 规则作为
示例。

:::tip
确保你首先阅读了 [设置说明](../development.md)。
:::

## 步骤 1：选择规则

我们的 [Linter 产品计划和进度](https://github.com/oxc-project/oxc/issues/481) 问题跟踪了我们想要从现有 ESLint 插件实现的所有规则的状态。从这里，选择一个
你感兴趣的插件，并找到一个尚未实现的规则。

**重要**：由于现在支持兼容 ESLint 的 JavaScript 插件，我们不计划添加新的基于 Rust 的插件。但是，为现有插件添加规则的贡献是**强烈鼓励**的。如果你认为某个规则或插件受益于用 Rust 编写，请在提交 pull request 之前先开启讨论。

大多数 ESLint 规则文档页面都包含指向规则 [源代码](https://eslint.org/docs/latest/rules/no-debugger#resources) 的链接。以此作为
参考将有助于你的实现。

## 步骤 2：规则生成

接下来，运行 rulegen 脚本为你的新规则生成样板代码。

```bash
just new-rule no-debugger
```

这将：

1. 在 `crates/oxc_linter/src/rules/<plugin-name>/<rule-name>.rs` 创建一个新文件，包含规则实现的开头以及从 ESLint 移植的所有测试用例
2. 在 [`rules.rs`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/src/rules.rs) 中的适当 `mod` 里注册规则
3. 将规则添加到 `oxc_macros::declare_all_lint_rules!`

对于属于不同插件的规则，你需要使用该插件自己的 rulegen 脚本。

:::tip
运行不带参数的 `just` 以查看所有可用命令。
:::

```bash
just new-rule [name]            # 用于 eslint 核心规则
just new-jest-rule [name]       # 用于 eslint-plugin-jest
just new-ts-rule [name]         # 用于 @typescript-eslint/eslint-plugin
just new-unicorn-rule [name]    # 用于 eslint-plugin-unicorn
just new-import-rule [name]     # 用于 eslint-plugin-import
just new-react-rule [name]      # 用于 eslint-plugin-react 和 eslint-plugin-react-hooks
just new-jsx-a11y-rule [name]   # 用于 eslint-plugin-jsx-a11y
just new-oxc-rule [name]        # 用于 oxc 自己的规则
just new-nextjs-rule [name]     # 用于 eslint-plugin-next
just new-jsdoc-rule [name]      # 用于 eslint-plugin-jsdoc
just new-react-perf-rule [name] # 用于 eslint-plugin-react-perf
just new-n-rule [name]          # 用于 eslint-plugin-n
just new-promise-rule [name]    # 用于 eslint-plugin-promise
just new-vitest-rule [name]     # 用于 eslint-plugin-vitest
```

生成的文件看起来像这样：

<details>
<summary>点击展开</summary>

::: code-group

````rust [rules/eslint/no_debugger.rs]
use oxc_diagnostics::OxcDiagnostic;
use oxc_macros::declare_oxc_lint;
use oxc_span::Span;

use crate::{
    context::LintContext,
    fixer::{RuleFix, RuleFixer},
    rule::Rule,
    AstNode,
};

#[derive(Debug, Default, Clone)]
pub struct NoDebugger;

declare_oxc_lint!(
    /// ### 它做什么
    ///
    ///
    /// ### 为什么这不好？
    ///
    ///
    /// ### 示例
    ///
    /// 此规则 **不正确** 代码的示例：
    /// ```js
    /// FIXME: 如果示例缺失或语法不正确，测试将失败。
    /// ```
    ///
    /// 此规则 **正确** 代码的示例：
    /// ```js
    /// FIXME: 如果示例缺失或语法不正确，测试将失败。
    /// ```
    NoDebugger,
    nursery, // TODO: 将类别更改为 `correctness`, `suspicious`, `pedantic`, `perf`, `restriction`, 或 `style`
             // 参见 <https://oxc.rs/docs/contribute/linter.html#rule-category> 了解详情

    pending  // TODO: 描述修复能力。如果无法完成修复则移除，
             // 如果你认为可以添加但不知道如何做，则保持为 'pending'。
             // 选项有 'fix', 'fix_dangerous', 'suggestion', 和 'conditional_fix_suggestion'
);

impl Rule for NoDebugger {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {}
}

#[test]
fn test() {
    use crate::tester::Tester;
    let pass = vec!["var test = { debugger: 1 }; test.debugger;"];
    let fail = vec!["if (foo) debugger"];
    Tester::new(NoDebugger::NAME, pass, fail).test_and_snapshot();
}
````

:::

</details>

你的规则现在应该可以运行了！你可以使用 `cargo test -p
oxc_linter` 尝试一下。测试应该会失败，因为你还没有实现该规则。

## 步骤 3：填写模板

### 文档

填写各种文档部分。

- 提供清晰简洁的规则功能摘要。
- 解释为什么该规则很重要以及它防止了什么不良行为。
- 提供违反规则的代码示例和未违反的代码示例。

请记住，我们使用此文档为此网站生成 [规则文档页面](/docs/guide/usage/linter/rules)，所以请确保你的文档清晰且有帮助！

#### 配置文档

如果你的规则有配置选项，你需要对它们进行文档化。你应该通过自动生成文档的系统来完成。这应该由 rulegen 脚本为你部分自动生成。

每个配置选项都应该通过向规则的 struct 添加字段来定义：

```rust
pub struct RuleName {
  option_name: bool,
  another_option: String,
  yet_another_option: Vec<CompactStr>,
}
```

或者，你可以定义一个单独的 `Config` struct 来持有所有配置选项：

```rust
pub struct RuleName(Box<RuleNameConfig>);

pub struct RuleNameConfig {
  option_name: bool,
}
```

配置选项应该派生 `JsonSchema` 并且还有一个 serde 装饰，如下所示：

```rust
use schemars::JsonSchema;

#[derive(Debug, Default, Clone, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
pub struct RuleName {
  option_name: bool,
}
```

为每个字段添加文档注释 (`///`) 以描述该选项，例如：

```rust
use schemars::JsonSchema;

#[derive(Debug, Default, Clone, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
pub struct RuleName {
  /// 是否在评估 baz 时检查 foo 和 bar。
  /// 注释可以尽可能长，以充分描述该选项。
  option_name: bool,
}
```

每个选项的默认值和类型将从 struct 定义中自动提取，不应在文档注释中提及。

参见 [此问题](https://github.com/oxc-project/oxc/issues/14743) 了解如何在各种规则中正确记录配置选项的数十个示例。

你可以通过运行 `cargo run -p website -- linter-rules --rule-docs target/rule-docs --git-ref $(git rev-parse HEAD)` 然后打开 `target/rule-docs/<plugin-name>/<rule-name>.md` 来查看生成的文档。

### 规则类别

首先，选择一个最适合该规则的 [规则类别](../linter.md#rule-category)。请记住，`correctness` 规则默认会运行，所以选择此类别时要小心。在 `declare_oxc_lint!` 宏中设置你的类别。

### 修复器状态

如果规则有修复器，在 `declare_oxc_lint!` 中注册它提供何种修复。如果你不想实现修复器，也可以使用 `pending` 作为占位符。这有助于其他贡献者随后找到并实现缺失的修复器。

<!-- TODO: 提供修复器类型文档的链接 -->

### 诊断

创建一个函数来为规则违规创建诊断。遵循以下原则：

1. `message` 应该是关于出了什么问题的祈使句，而不是规则做什么的描述。
2. `help` 消息应该是一个命令式的陈述，告诉用户如何修复问题。

::: code-group

```rust [good]
fn no_debugger_diagnostic(span: Span) -> OxcDiagnostic {
    OxcDiagnostic::warn("`debugger` 语句是禁止的")
        .with_help("移除这个 `debugger` 语句")
        .with_label(span)
}
```

```rust [bad]
fn no_debugger_diagnostic(span: Span) -> OxcDiagnostic {
    OxcDiagnostic::warn("禁止 `debugger` 语句")
        .with_help("不允许使用 `debugger` 语句。")
        .with_label(span)
```

:::

## 步骤 4：规则实现

阅读规则的源代码以了解其工作原理。虽然 Oxlint 的工作方式与 ESLint 类似，但该规则不太可能直接移植。

ESLint 规则有一个 `create` 函数，返回一个对象，其键是触发规则的 AST 节点，值是那些节点上运行 lint 的函数。Oxlint 规则在几个触发器之一上运行，每个触发器都来自
[`Rule`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/src/rule.rs)
trait：

1. 在每个 AST 节点上运行（通过 `run`）
2. 在每个 symbol 上运行（通过 `run_on_symbol`）
3. 在整个文件上运行一次（通过 `run_once`）

对于 `no-debugger`，我们正在寻找 `DebuggerStatement` 节点，所以我们将使用 `run`。这是该规则的简化版本：

<details>
<summary>点击展开</summary>

::: code-group

````rust [rules/eslint/no_debugger.rs]
use oxc_ast::AstKind;
use oxc_diagnostics::OxcDiagnostic;
use oxc_macros::declare_oxc_lint;
use oxc_span::Span;

use crate::{context::LintContext, rule::Rule, AstNode};

fn no_debugger_diagnostic(span: Span) -> OxcDiagnostic {
    OxcDiagnostic::warn("`debugger` 语句是禁止的")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoDebugger;

declare_oxc_lint!(
    /// ### 它做什么
    /// 检查 `debugger` 语句的使用
    ///
    /// ### 为什么这不好？
    /// 当没有附加调试器时，`debugger` 语句不影响功能。它们通常是
    /// 意外留下的调试代码。
    ///
    /// ### 示例
    ///
    /// 此规则 **不正确** 代码的示例：
    /// ```js
    /// async function main() {
    ///     const data = await getData();
    ///     const result = complexCalculation(data);
    ///     debugger;
    /// }
    /// ```
    NoDebugger,
    correctness
);

impl Rule for NoDebugger {
    // 在 AST 中的每个节点上运行
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        // `debugger` 语句有它们自己的 AST 种类
        if let AstKind::DebuggerStatement(stmt) = node.kind() {
            // 报告违规
            ctx.diagnostic(no_debugger_diagnostic(stmt.span));
        }
    }
}
````

:::

</details>

:::tip

你将会想要熟悉存储在
[`Semantic`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_semantic/src/lib.rs#L59)
中的数据，这是语义分析期间提取的所有数据存储的地方。你还需要熟悉 AST 结构。这里最重要的两个数据结构是
[`AstNode`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_semantic/src/node/mod.rs)
和
[`AstKind`](https://github.com/oxc-project/oxc/blob/main/crates/oxc_ast/src/generated/ast_kind.rs)
:::

## 步骤 5：测试

每当您更改规则时，要测试它，请运行：

```bash
just watch "cargo test -p oxc_linter -- rule-name"
```

或者只测试一次，请运行：

```bash
cargo test -p oxc_linter -- rule-name
# 或者
cargo insta test -p oxc_linter -- rule-name
```

Oxlint 使用 [`cargo insta`](https://insta.rs/docs) 进行快照测试。如果快照已更改或刚刚创建，`cargo test` 将会失败。您可以运行 `cargo insta test -p oxc_linter` 以便在测试结果中不看到差异。您可以通过运行 `cargo insta review` 来审查快照，或者跳过审查并使用 `cargo insta accept` 直接接受所有更改。

当您准备好提交 PR 时，运行 `just ready` 或 `just r` 以在本地运行 CI 检查。您还可以运行 `just fix` 来自动修复任何 lint、格式或拼写问题。一旦 `just ready` 通过，创建 PR 后维护者将审查您的更改。

## 一般建议

### 将错误消息定位到最短的代码跨度

我们希望用户专注于有问题的代码，而不是解读错误消息来识别代码的哪部分有误。

### 使用 `let-else` 语句

如果您发现自己深层嵌套 [`if-let`](https://doc.rust-lang.org/rust-by-example/flow_control/if_let.html) 语句，请考虑改用 [`let-else`](https://doc.rust-lang.org/rust-by-example/flow_control/let_else.html)。

:::tip
CodeAesthetic 的 [永不嵌套视频](https://www.youtube.com/watch?v=CFRhGnuXG-4) 更详细地解释了这个概念。
:::

::: code-group

```rust [good]
// let-else 更易读
fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
    let AstKind::JSXOpeningElement(jsx_opening_elem) = node.kind() else {
        return;
    };
    let Some(expr) = container.expression.as_expression() else {
        return;
    };
    let Expression::BooleanLiteral(expr) = expr.without_parenthesized() else {
        return;
    };
    // ...
}
```

```rust [bad]
// 深层嵌套难以阅读
fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
    if let AstKind::JSXOpeningElement(jsx_opening_elem) = node.kind() {
        if let Some(expr) = container.expression.as_expression() {
            if let Expression::BooleanLiteral(expr) = expr.without_parenthesized() {
                // ...
            }
        }
    }
}
```

:::

### 尽可能使用 `CompactStr`

尽可能减少分配对于 `oxc` 的性能至关重要。`String` 类型需要在堆上分配内存，这会消耗内存和 CPU 周期。使用 `CompactStr` 可以在栈上 [内联存储小字符串](https://oxc.rs/docs/learn/performance.html#string-inlining)（64 位系统上最多 24 字节），这意味着我们不需要分配内存。如果字符串太大无法内联存储，它将分配必要的空间。`CompactStr` 几乎可以用在任何类型为 `String` 或 `&str` 的地方，与 `String` 类型相比可以节省大量的内存和 CPU 周期。

::: code-group

```rust [good]
struct Element {
  name: CompactStr
}

let element = Element {
  name: "div".into()
};
```

```rust [bad]
struct Element {
  name: String
}

let element = Element {
  name: "div".to_string()
};
```

:::
