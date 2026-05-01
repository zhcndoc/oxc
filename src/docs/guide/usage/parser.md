---
title: 解析器
outline: deep
---

# 解析器

<AppBadgeList />

一个用 Rust 编写的高性能 JavaScript / TypeScript 解析器，为 Oxc 项目中的其他工具提供支持。

## 功能

- 比 swc 解析器快 3 倍（[基准测试][url-benchmark]）。
- 解析 `.js(x)` 和 `.ts(x)`。
- 通过了 Test262 的所有解析器测试，以及 Babel 和 TypeScript 中 99% 的测试。
- 直接返回 ESM 信息，无需 [`es-module-lexer`](https://npmx.dev/package/es-module-lexer)。
- [✅ 可与 checker.ts 配合使用](https://x.com/robpalmer2/status/1805502964435505559)

## 安装

### Node.js

- 使用 node 绑定 [oxc-parser][url-oxc-parser-npm]。
- 在 [stackblitz](https://stackblitz.com/edit/oxc-parser) 上试用。

### Rust

使用总包 [oxc][url-oxc-crate]，或分别使用 [oxc_ast][url-oxc-ast-crate] 和 [oxc_parser][url-oxc-parser-crate] 这两个 crate。

Rust 使用示例可在[这里](https://github.com/oxc-project/oxc/blob/main/crates/oxc_parser/examples/parser.rs)找到。

## 打印

在解析并转换后，你可以打印代码。

这里有一个使用 [esrap](https://npmx.dev/package/esrap) 的直接示例 _（将 `parse` 反过来！）_：

```js
import { print } from "esrap";
import ts from "esrap/languages/ts";
import { parseSync } from "oxc-parser";

const { program } = parseSync("test.js", 'alert("hello oxc & esrap");');
const { code } = print(program, ts());

console.log(code); // alert("hello oxc & esrap");
```

:::info
目前不会打印注释。_这将通过 [oxc-parser #13285](https://github.com/oxc-project/oxc/pull/13285) 得到支持。_
:::

<!-- Links -->

[url-swc]: https://swc.rs
[url-benchmark]: https://github.com/oxc-project/bench-javascript-parser-written-in-rust
[url-oxc-crate]: https://docs.rs/oxc
[url-oxc-ast-crate]: https://docs.rs/oxc_ast
[url-oxc-parser-crate]: https://docs.rs/oxc_parser
[url-oxc-parser-npm]: https://npmx.dev/package/oxc-parser
