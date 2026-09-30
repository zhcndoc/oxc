# 代码生成

`codegen` 选项控制 Oxc 压缩器如何输出代码。

## 空白压缩

Oxc 压缩器默认移除空白。将 `codegen.removeWhitespace` 设置为 `false` 可保留格式化后的输出。

注释默认会被移除。使用 `codegen.legalComments` 可控制是否保留合法注释、将其移动到文件末尾或提取出来。

## ASCII 转义

将 `codegen.asciiOnly` 设置为 `true`，可转义字符串字面量、未标记模板字面量、正则表达式字面量和标识符名称中的非 ASCII 字符。该选项默认为 `false`，无论是否压缩空白均可使用。

### Node.js

```js
import { minifySync } from "oxc-minify";

const result = minifySync("input.js", "export let π = '☕';", {
  codegen: {
    asciiOnly: true,
    removeWhitespace: false,
  },
});

console.log(result.code);
```

输出：

```text
export let \u03C0 = "\u2615";
```

异步的 `minify` 函数接受相同的选项。

### Rust

生成代码时，在 `oxc_codegen::CodegenOptions` 上设置 `ascii_only`：

```rust
use oxc_codegen::{Codegen, CodegenOptions};

let output = Codegen::new()
    .with_options(CodegenOptions {
        ascii_only: true,
        ..CodegenOptions::default()
    })
    .build(&program);
```

### 转义与限制

不超过 U+FFFF 的字符使用 `\uXXXX` 转义。更高的码点使用 `\u{...}` 转义，这需要 ES2015 或更高版本。此选项不会生成兼容 ES5 的输出。

对于更高的码点，正则表达式会改用转义的 UTF-16 代理对。转义正则表达式会改变其可观察的 `RegExp.prototype.source` 值。

部分输出仍可能包含非 ASCII 字符：

- 标记模板字面量文本会被保留，因为 `String.raw` 等标签函数可以观察其原始内容。
- JSX 名称、JSX 文本和 JSX 属性字符串会被保留。
- Hashbang 以及保留的注释（包括合法注释）会被保留。

标记模板和 JSX 内的 JavaScript 表达式会按正常方式转义。
