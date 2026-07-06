# 全局变量替换

Oxc transformer 支持替换全局变量。

::: tip 求值顺序
`inject` 先于 `define` 运行，且二者都在所有其他转换之后运行。有关完整顺序，请参见 [transformer 概览](../transformer#features)。
:::

## 定义

“Define” 功能提供了一种用常量表达式替换全局变量的方式。这个功能类似于 [Terser](https://terser.org/) 的 `global_defs` 选项和 [esbuild 的 `define` 选项](https://esbuild.github.io/api/#define)。

```js
// 输入
const foo = __DEV__ ? 1 : 2;

// 输出
const foo = 1;
```

```js
// 示例
import { transform } from "oxc-transform";

const result = await transform("lib.js", sourceCode, {
  define: {
    __DEV__: "true",
  },
});
```

每个 `define` 条目都会将一个表达式映射为包含表达式的代码字符串。其键必须是标识符（例如 `__DEV__`），或者是由标识符组成的点分序列（例如 `process.env.NODE_ENV`、`import.meta.env.MODE`）。其值必须是一个有效表达式。

::: tip 始终给值加引号

`define` 的值是表达式字符串。这意味着值应该始终是字符串。如果你想表示字符串字面量，就应该给它加引号（例如 `__MODE__: '"development"'`、`__MODE__: JSON.stringify("development")`）。

:::

::: tip 对象引用不会共享

与 esbuild 不同，当向 `define` 选项的值传入对象时，对象引用不会共享。这意味着如果你修改了该对象，这些修改不会反映到其他地方。

```js
const foo = __OBJECT__;
foo.bar = 1;
console.log(foo.bar); // 1

const bar = __OBJECT__;
console.log(foo.bar); // undefined
```

```js
// 示例
import { transform } from "oxc-transform";

const result = await transform("lib.js", sourceCode, {
  define: {
    __OBJECT__: "{}",
  },
});
```

:::

## 注入

“Inject” 功能提供了一种用模块导入来替换全局变量的方法。此功能类似于 [esbuild 的 `inject` 选项](https://esbuild.github.io/api/#inject) 和 [`@rollup/plugin-inject`](https://github.com/rollup/plugins/tree/master/packages/inject)。

```js
// 输入
const foo = new Promise((resolve) => resolve(1));

// 输出
import { Promise as P } from "es6-promise";
const foo = new P((resolve) => resolve(1));
```

```js
// 示例
import { transform } from "oxc-transform";

const result = await transform("lib.js", sourceCode, {
  inject: {
    P: ["es6-promise", "Promise"],
  },
});
```

每个 `inject` 条目都会将一个表达式映射到一个导入的标识符。其键必须是一个标识符（例如 `__DEV__`），或由标识符组成的点分序列（例如 `process.env.NODE_ENV`）。其值必须是导入源字符串，或者是由导入源和导入名称组成的字符串元组（`*` 表示命名空间导入）。

```js
const examples = {
  // 从 'es6-promise' 导入 { Promise }
  Promise: ["es6-promise", "Promise"],
  // 从 'es6-promise' 导入 { Promise as P }
  P: ["es6-promise", "Promise"],
  // 从 'jquery' 导入 $
  $: "jquery",
  // 从 'fs' 导入 * as fs
  fs: ["fs", "*"],
  // 使用本地模块替代第三方模块
  "Object.assign": path.resolve("src/helpers/object-assign.js"),
};
```
