---
search: false
---

## 用法

**`oxfmt`** \[**`-c`**=_`PATH`_\] \[_`PATH`_\]...

## 模式选项：

- **`    --init`** &mdash;
  使用默认值初始化 `.oxfmtrc.json`
- **`    --migrate`**=_`SOURCE`_ &mdash;
  从指定源迁移配置到 `.oxfmtrc.json` 可用源：prettier, biome
- **`    --lsp`** &mdash;
  启动语言服务器协议 (LSP) 服务器
- **`    --stdin-filepath`**=_`PATH`_ &mdash;
  指定用于推断使用哪个解析器的文件名

## 输出选项：

- **`    --write`** &mdash;
  格式化并原地写入文件（默认）
- **`    --check`** &mdash;
  检查文件是否已格式化，同时显示统计信息
- **`    --list-different`** &mdash;
  列出将被更改的文件

## 配置选项

- **`-c`**, **`--config`**=_`PATH`_ &mdash;
  配置文件路径 (.json, .jsonc, .ts, .mts, .cts, .js, .mjs, .cjs)

## 忽略选项

- **`    --ignore-path`**=_`PATH`_ &mdash;
  忽略文件的路径。可以指定多次。如果未指定，则使用当前目录中的 .gitignore 和 .prettierignore。
- **`    --with-node-modules`** &mdash;
  格式化 node_modules 目录中的代码（默认跳过）

## 运行时选项

- **`    --no-error-on-unmatched-pattern`** &mdash;
  当模式未匹配时不要退出并报错
- **`    --threads`**=_`INT`_ &mdash;
  要使用的线程数。设置为 1 以仅使用 1 个 CPU 核心。

## 可用位置项：

- _`PATH`_ &mdash;
  单个文件、路径或路径列表。也支持 Glob 模式。（务必将它们引起来，否则你的 shell 可能在传递之前展开它们。）也支持带 `!` 前缀的排除模式，例如 `'!**/fixtures/*.js'`。如果未提供，则使用当前工作目录。

## 可用选项：

- **`-h`**, **`--help`** &mdash;
  打印帮助信息
- **`-V`**, **`--version`** &mdash;
  打印版本信息
