# 语法降级

Oxc transformer 支持将 ESNext 降级为 ES2015 语法。

## 目标

Oxc transformer 接收一个 `target` 选项，用于指定目标运行时。这将决定哪些语法会被降级，以及会发出哪些警告。

每个目标环境都由一个环境名称后接版本号组成。目前支持以下环境名称：

- `chrome`
- `deno`
- `edge`
- `firefox`
- `hermes`
- `ie`
- `ios`
- `node`
- `opera`
- `rhino`
- `safari`
- `samsung`
- `es`

支持 [esbuild 的 target 选项](https://esbuild.github.io/api/#target) 所支持的值，但不包括 ES5。

你可以传入单个字符串或字符串数组：

```js
import { transform } from "oxc-transform";

const result = await transform("lib.js", "const foo = a ?? b;", {
  target: "es2020",
  // 或多个目标：
  // target: ["chrome87", "es2022"],
});
```

## 转换

Oxc 支持降级以下语法。请注意，与 RegExp 相关的转换只会将 RegExp 字面量（`/foo/v`）转换为使用 RegExp 构造函数（`new RegExp('foo', 'v')`）。你需要同时使用 polyfill 才能支持较旧的浏览器。

### ES2026

- 显式资源管理（`using a = foo()`）

### ES2024

- 带集合表示法和字符串属性的 RegExp v 标志（`/\p{Emoji}--\p{ASCII}/v`）

### ES2022

- 类静态块（`class A { static { foo() } }`）
- 类字段（`class A { foo = 1; #bar = 2; static baz = 3; static qux = 4; foobar(a) { return #bar in a } }`）
- RegExp 匹配索引（`/foo/d`）

### ES2021

- 逻辑赋值运算符（`foo ||= bar`）
- 数字分隔符（注意：这并不是作为转换实现的，但代码生成始终会移除分隔符）

### ES2020

- 空值合并运算符（`foo ?? bar`）
- 可选链（`foo?.bar`）
- 从命名空间导出（`export * as foo from "bar"`）

### ES2019

- 可选的 `catch` 绑定（`try {} catch {}`）

### ES2018

- Rest/Spread 属性（`const foo = { a, b, ...c }`, `const { x, y, ...z } = foo;`）
- 异步迭代（`for await (const x of y) {}`, `async function* foo() {}`）
- RegExp Unicode 属性转义（`/\p{Script=Greek}/u`）
- RegExp 向后断言（`/(?<=foo)bar/`）
- RegExp 命名捕获组（`/(?<foo>bar)/`）
- 正则表达式的 `s`（`dotAll`）标志（`/foo./s`）

### ES2017

- 异步函数（`async function foo() {}`）

### ES2016

- 指数运算符（`foo ** bar`）

### ES2015

- 箭头函数（`const foo = () => {}`）
- RegExp 粘性标志（`/foo/y`）
- RegExp Unicode 标志（`/foo/u`）

## 警告

如果目标运行时不支持以下语法，Oxc transformer 会发出警告。

### ES2022

- 顶层 await（`await foo()`）
- 任意模块命名空间标识符（`import * as "f o o" from "bar"`）

### ES2020

- BigInt（`1n`）

## 编译器假设

你可以为编译器指定一些假设，以使输出更小。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.js", "const foo = a ?? b;", {
  target: ["chrome87", "es2022"],
  assumptions: {
    noDocumentAll: true,
  },
});
```

支持以下假设。

### `ignoreFunctionLength`

假设没有代码依赖函数对象的 `.length` 属性。

::: info 注意
此假设尚未完全实现。特别是，启用它并同时使用 object rest/spread 时，目前会产生转换错误。
:::

### `noDocumentAll`

假设不使用已弃用且具有特殊行为的 `document.all`。

### `objectRestNoSymbols`

假设 object rest/spread 属性不包含 Symbol 键。

::: info 注意
此假设尚未完全实现。特别是，启用它并同时使用 object rest/spread 时，目前会产生转换错误。
:::

### `pureGetters`

假设 getter 没有副作用。

### `setPublicClassFields`

在使用 public class fields 时，假设它们不会遮蔽当前类、其子类或其父类中的任何 getter。因此，直接赋值是安全的，而不是使用 `Object.defineProperty`。

::: tip 注意
对于 TypeScript，如果你希望的行为等同于 `useDefineForClassFields: false`，
你应该将 `setPublicClassFields` 和 `removeClassFieldsWithoutInitializer` 都设置为 `true`。
更多信息请参见 [TypeScript 页面](./typescript#useDefineForClassFields)。
:::

## 不支持的语法

以下语法不会被 Oxc transformer 降级。

- ESNext
  - 装饰器（跟踪于 [#9170](https://github.com/oxc-project/oxc/issues/9170)）（注意 [TypeScript 中的实验性装饰器是受支持的](./typescript#decorators)）
- ES2025
  - RegExp 修饰符（跟踪于 [#11826](https://github.com/oxc-project/oxc/issues/11826)）
  - 重复的命名捕获组（跟踪于 [#11827](https://github.com/oxc-project/oxc/issues/11827)）
