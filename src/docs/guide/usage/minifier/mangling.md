# 名称混淆

Oxc 压缩器可以缩短变量名和选定的属性名。

## 变量名

变量名混淆默认启用。将 `mangle` 设置为 `false` 可禁用它，也可以传入对象进行配置。使用 `mangle.reserved` 可保持绑定名称完全不变，并防止 Oxc 生成这些名称。

### 顶层变量

在模块和 CommonJS 文件中，顶层名称默认会被混淆，但脚本中不会。设置 `mangle.toplevel` 可覆盖此行为。

```js
// input
var foo = 1;

// output
var e = 1;
```

```js
// Example
import { minify } from "oxc-minify";

const result = await minify("lib.js", code, {
  mangle: {
    toplevel: true,
  },
});
```

### 保留 `name` 属性值

混淆变量名可能会改变函数和类的 `name` 属性值。设置 `mangle.keepNames` 可保留这些值。

```js
// input
var foo = function () {};

// output
var foo = function () {};
```

```js
// Example
import { minify } from "oxc-minify";

const result = await minify("lib.js", code, {
  mangle: {
    keepNames: true, // shorthand of { function: true, class: true }
  },
});
```

::: tip `compress.keepNames` 选项

启用此选项时，你可能还需要启用 [`compress.keepNames` 选项](./dead-code-elimination#keep-name-property-values)。

:::

### 调试名称混淆器

要调试名称混淆器，可以启用 `mangle.debug` 选项。启用后，名称混淆器会使用 `slot_0`、`slot_1` 等作为变量名。

```js
// input
var foo = 1;

// output
var slot_0 = 1;
```

```js
// 示例
import { minify } from "oxc-minify";

const result = await minify("lib.js", code, {
  mangle: {
    debug: true,
    toplevel: true,
  },
});
```

## 属性名

属性名混淆默认关闭。使用 `mangleProps.include` 选择要混淆的属性名。

```js
import { minify } from "oxc-minify";

const result = await minify("lib.js", code, {
  mangleProps: {
    include: /^_/,
    exclude: /^__public/,
    reserved: ["_externalApi"],
  },
});
```

`exclude` 会从 `include` 选中的集合中移除匹配的属性名。`reserved` 会保持列出的名称完全不变，并防止 Oxc 将它们生成为替换名称。这两个选项都不会单独向 `mangleCache` 添加条目。

`obj["_field"]` 等带引号的出现形式默认会被保留。处理按出现位置进行，因此同名的不带引号用法仍可能被混淆。将 `quoted` 设置为 `true` 也混淆带引号的出现形式，或将 `debug` 设置为 `true` 以生成可读的属性名。

过滤器是 JavaScript `RegExp` 对象，但 Oxc 使用 Rust 的 [regex 引擎](https://docs.rs/regex/latest/regex/#syntax)进行匹配。它支持 `i`、`m`、`s` 和 `u` 标志，并在 `result.errors` 中报告不支持的语法或标志。

为了在源代码变化时保持名称稳定，将 `result.mangleCache` 复用为 `mangleProps.cache`。值为 `false` 的缓存条目会保持该属性不变。始终从未压缩的源代码开始；不要将同一个缓存应用于已经混淆的输出。

::: warning

只混淆待压缩代码所拥有的属性。Oxc 无法安全地更新运行时构造或由未压缩代码使用的名称。对于公共 API、模块命名空间对象、全局对象、DOM API 和其他宿主 API 使用的匹配名称，请将其排除或保留。单独使用缓存并不能保证分别压缩的文件安全。

更多详情请参阅[属性名假设](https://github.com/oxc-project/oxc/blob/main/crates/oxc_minifier/docs/ASSUMPTIONS.md#property-names-selected-for-mangling-are-not-accessed-dynamically)。

:::
