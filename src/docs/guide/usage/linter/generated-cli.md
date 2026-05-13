---
search: false
---

## 用法

**`oxlint`** \[**`-c`**=_`<./.oxlintrc.json>`_\] \[_`PATH`_\]...

## 基本配置

- **`-c`**, **`--config`**=_`<./.oxlintrc.json>`_ &mdash;
  Oxlint 配置文件

* `.json` 和 `.jsonc` 配置文件在所有运行时都支持
* JavaScript/TypeScript 配置文件是实验性的，需要通过 Node.js 运行
* 你可以在配置文件中使用注释。
* 尝试兼容 ESLint v8 的格式

  如果未提供，Oxlint 将在当前工作目录中查找 `.oxlintrc.json`、`.oxlintrc.jsonc` 或 `oxlint.config.ts` 文件。

- **`    --tsconfig`**=_`<./tsconfig.json>`_ &mdash;
  覆盖用于导入解析的 TypeScript 配置。Oxlint 会自动发现每个文件相关的 `tsconfig.json`。仅当你的项目使用非标准的 tsconfig 名称或位置时才使用此选项。

  ::: warning 避免使用此选项。它可能导致导入解析和类型感知 lint 之间的差异。类型感知 lint **不**尊重此选项，并将始终自动为每个文件发现合适的 `tsconfig.json`。 :::

- **`    --init`** &mdash;
  使用默认值初始化 oxlint 配置

## 允许/拒绝多个 Lint 规则

在命令行上从左到右累积规则和类别。

例如 `-D correctness -A no-debugger` 或 `-A all -D no-debugger`。
类别包括：

- `correctness` - 完全错误或无用的代码（默认）
- `suspicious` - 很可能错误或无用的代码
- `pedantic` - 较为严格或偶尔有误报的 Lint 规则
- `perf` - 可以写得更具性能的代码
- `style` - 应该写得更符合习惯用法的代码
- `restriction` - 阻止使用语言和库功能的 Lint 规则
- `nursery` - 仍在开发中的新 Lint 规则
- `all` - 除 `nursery` 外上述所有类别。不会自动启用插件。

参数：

- **`-A`**, **`--allow`**=_`NAME`_ &mdash;
  允许规则或类别（抑制 lint）
- **`-W`**, **`--warn`**=_`NAME`_ &mdash;
  拒绝规则或类别（发出警告）
- **`-D`**, **`--deny`**=_`NAME`_ &mdash;
  拒绝规则或类别（发出错误）

## 启用/禁用插件

- **`    --disable-unicorn-plugin`** &mdash;
  禁用 unicorn 插件，该插件默认开启
- **`    --disable-oxc-plugin`** &mdash;
  禁用 oxc 独特规则，该规则默认开启
- **`    --disable-typescript-plugin`** &mdash;
  禁用 TypeScript 插件，该插件默认开启
- **`    --import-plugin`** &mdash;
  启用 import 插件并检测 ESM 问题。
- **`    --react-plugin`** &mdash;
  启用 react 插件，该插件默认关闭
- **`    --jsdoc-plugin`** &mdash;
  启用 jsdoc 插件并检测 JSDoc 问题
- **`    --jest-plugin`** &mdash;
  启用 Jest 插件并检测测试问题
- **`    --vitest-plugin`** &mdash;
  启用 Vitest 插件并检测测试问题
- **`    --jsx-a11y-plugin`** &mdash;
  启用 JSX-a11y 插件并检测无障碍问题
- **`    --nextjs-plugin`** &mdash;
  启用 Next.js 插件并检测 Next.js 问题
- **`    --react-perf-plugin`** &mdash;
  启用 React 性能插件并检测渲染性能问题
- **`    --promise-plugin`** &mdash;
  启用 promise 插件并检测 promise 使用问题
- **`    --node-plugin`** &mdash;
  启用 node 插件并检测 node 使用问题
- **`    --vue-plugin`** &mdash;
  启用 vue 插件并检测 vue 使用问题

## 修复问题

- **`    --fix`** &mdash;
  尽可能修复更多问题。输出中仅报告未修复的问题。
- **`    --fix-suggestions`** &mdash;
  应用可自动修复的建议。可能会改变程序行为。
- **`    --fix-dangerously`** &mdash;
  应用危险的修复和建议

## 忽略文件

- **`    --ignore-path`**=_`PATH`_ &mdash;
  指定用作 `.eslintignore` 的文件
- **`    --ignore-pattern`**=_`PAT`_ &mdash;
  指定要忽略的文件模式（除了 `.eslintignore` 中的那些）

  支持的语法与 `.eslintignore` 和 `.gitignore` 文件相同。你应该引用你的模式以避免 shell 对 glob 模式的解释。

- **`    --no-ignore`** &mdash;
  禁用从 `.eslintignore` 文件、**`--ignore-path`** 标志和 **`--ignore-pattern`** 标志排除文件

## 处理警告

- **`    --quiet`** &mdash;
  禁用警告报告，仅报告错误
- **`    --deny-warnings`** &mdash;
  确保警告产生非零退出码
- **`    --max-warnings`**=_`INT`_ &mdash;
  指定警告阈值，如果项目中存在太多警告级别的规则违规，可用于强制以错误状态退出

## 输出

- **`-f`**, **`--format`**=_`ARG`_ &mdash;
  使用特定的输出格式。可选值：`checkstyle`、`default`、`agent`、`github`、`gitlab`、`json`、`junit`、`sarif`、`stylish`、`unix`

## 杂项

- **`    --silent`** &mdash;
  不显示任何诊断信息
- **`    --no-error-on-unmatched-pattern`** &mdash;
  当没有选择任何文件进行 lint 检查时不要以错误退出（例如，在应用忽略模式之后）
- **`    --threads`**=_`INT`_ &mdash;
  要使用的线程数。设置为 1 以仅使用 1 个 CPU 核心。
- **`    --print-config`** &mdash;
  此选项输出要使用的配置。当存在时，不执行 lint 检查，仅配置相关选项有效。

## 内联配置注释

- **`    --report-unused-disable-directives`** &mdash;
  报告指令注释（如 `// oxlint-disable-line`），当该行无论如何都不会报告错误时
- **`    --report-unused-disable-directives-severity`**=_`SEVERITY`_ &mdash;
  与 `--report-unused-disable-directives` 相同，但允许你指定报告错误的严重级别。这两个选项一次只能使用一个。

## 可用的位置项：

- _`PATH`_ &mdash;
  单个文件、单个路径或路径列表

## 可用的选项：

- **`    --rules`** &mdash;
  列出当前注册的所有规则
- **`    --lsp`** &mdash;
  启动语言服务器
- **`    --disable-nested-config`** &mdash;
  禁用嵌套配置文件的自动加载
- **`    --type-aware`** &mdash;
  启用需要类型信息的规则
- **`    --type-check`** &mdash;
  启用实验性类型检查（包括 TypeScript 编译器诊断）
- **`-h`**, **`--help`** &mdash;
  打印帮助信息
- **`-V`**, **`--version`** &mdash;
  打印版本信息
