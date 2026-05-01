---
title: "eslint/no-unused-vars"
category: "正确性"
version: "0.7.0"
default: true
type_aware: false
fix: "conditional_dangerous_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unused_vars/mod.rs`;
</script>

<RuleHeader />

### 作用

禁止未在代码中使用的变量声明、导入或类型声明。

### 为什么这很糟糕？

在代码中声明却未被使用的变量，通常是由于重构不完整而导致的错误。这类变量会占用代码空间，并可能让读者感到困惑。

```ts
// `b` 未被使用；这表明存在 bug。
function add(a: number, b: number) {
  return a;
}
console.log(add(1, 2));
```

如果满足以下任一条件，则变量 `foo` 会被视为已使用：

- 它被调用（`foo()`）或被构造（`new foo()`）
- 它被读取（`var bar = foo`）
- 它作为参数传入函数或构造函数（`doSomething(foo)`）
- 它在传给另一个函数的函数内部被读取
  （`doSomething(function() { foo(); })`）
- 它被导出（`export const foo = 42`）
- 它被用作 TypeScript `typeof` 运算符的操作数（`const bar:
typeof foo = 4`）

如果变量只被声明（`var foo = 5`）或只被赋值（`foo = 7`），则不会被视为已使用。

#### 类型

此规则对 TypeScript 类型、接口、枚举和命名空间提供完整支持。

如果类型或接口 `Foo` 以以下任一方式被使用，则会被视为已使用：

- 它用于另一个类型或接口的定义中。
- 它作为类型注解或函数签名的一部分被使用。
- 它用于类型断言或 `satisfies` 表达式中。

如果类型或接口只在自身定义中被使用，例如 `type Foo = Array<Foo>`，则不会被视为已使用。

枚举和命名空间的处理方式与变量、类、函数等相同。

#### 被忽略的文件

此规则会完全忽略 `.d.ts`、`.astro`、`.svelte` 和 `.vue` 文件。`.d.ts` 文件中声明的变量、类、接口和类型通常会被其他文件使用，而这些文件不会被 Oxlint 检查。由于 Oxlint 不支持解析模板语法，此规则无法判断 Vue / Svelte / Astro 文件中的变量是否被使用。

#### 导出

原始 ESLint 规则将 `/* exported variableName */` 注释识别为变量在另一个脚本中被使用、因此不应视为未使用的一种方式。由于 ES 模块现已成为 TC39 标准，Oxlint 不支持此特性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/* no-unused-vars: "error" */
/* 如果你在 .oxlintrc.json 中将 `some_unused_var` 定义为全局变量 */

// 它会检查你定义为全局变量的变量
some_unused_var = 42;

var x;

// 仅写入的变量不被视为已使用。
var y = 10;
y = 5;

// 对自身进行修改时的读取不被视为已使用。
var z = 0;
z = z + 1;

// 默认情况下，未使用的参数会导致警告。
(function (foo) {
  return 5;
})();

// 未使用的递归函数也会导致警告。
function fact(n) {
  if (n < 2) return 1;
  return n * fact(n - 1);
}

// 当函数定义对数组进行解构时，数组中未使用的项也会导致警告。
function getY([x, y]) {
  return y;
}
```

```ts
type A = Array<A>;

enum Color {
  Red,
  Green,
  Blue,
}
```

以下是此规则的**正确**代码示例：

```js
/* no-unused-vars: "error" */

var x = 10;
alert(x);

// 此处认为 foo 已被使用
myFunc(
  function foo() {
    // ...
  }.bind(this),
);

(function (foo) {
  return foo;
})();

var myFunc;
myFunc = setTimeout(function () {
  // myFunc 被视为已使用
  myFunc();
}, 50);

// 只使用了解构数组中的第二个参数。
function getY([, y]) {
  return y;
}
```

```ts
export const x = 1;
const y = 1;
export { y };

type A = Record<string, unknown>;
type B<T> = T extends Record<infer K, any> ? K : never;
const x = "foo" as B<A>;
console.log(x);
```

以下是 `/* exported variableName */` 操作的**错误**代码示例：

```js
/* exported global_var */

// 不受支持，请改用 ES 模块。
var global_var = 42;
```

## 配置

此规则接受一个具有以下属性的配置对象：

### args

type: `"after-used" | "all" | "none"`

default: `"after-used"`

控制如何检查未使用的参数。

#### `"after-used"`

出现在最后一个已使用参数之前的未使用位置参数不会被检查，但所有命名参数以及最后一个已使用参数之后的所有位置参数都会被检查。

#### `"all"`

所有命名参数都必须被使用

#### `"none"`

不检查参数

### argsIgnorePattern

为未使用的参数指定此规则的例外。名称匹配此模式的参数将被忽略。

默认情况下，此模式为 `^_`，除非选项配置为对象。在这种情况下，其默认值为 [`None`]。请注意，此行为与 ESLint 和 TypeScript-ESLint 都不同，后两者从不提供默认模式。

#### 示例

当模式为 `^_` 时，此选项的**正确**代码示例：

```javascript
function foo(_a, b) {
  console.log(b);
}
foo(1, 2);
```

### caughtErrors

type: `"all" | "none"`

用于 `catch` 块验证。

#### `"all"`

所有命名参数都必须被使用。

#### `"none"`

不检查错误对象。

### caughtErrorsIgnorePattern

为 `catch` 块中捕获的错误指定此规则的例外。`catch` 块中声明且名称匹配此模式的变量将被忽略。

#### 示例

当模式为 `^ignore` 时，**正确**代码示例：

```javascript
try {
  // ...
} catch (ignoreErr) {
  console.error("Error caught in catch block");
}
```

### destructuredArrayIgnorePattern

此选项指定解构模式中的例外，这些变量不会被检查是否使用。数组解构中声明且名称匹配此模式的变量将被忽略。

默认情况下，此模式未设置。

#### 示例

当模式为 `^_` 时，此选项的**正确**代码示例：

```javascript
const [a, _b, c] = ["a", "b", "c"];
console.log(a + c);

const {
  x: [_a, foo],
} = bar;
console.log(foo);

let _m, n;
foo.forEach((item) => {
  [_m, n] = item;
  console.log(n);
});
```

### fix

type: `object`

default: `{"imports":"suggestion", "variables":"suggestion"}`

对 `no-unused-vars` 的细粒度自动修复控制。

#### fix.imports

type: `"off" | "suggestion" | "fix" | "safe-fix"`

##### `"off"`

禁用此符号类型的自动修复。

##### `"suggestion"`

发出建议式修复（当前行为）。

##### `"fix"`

发出修复式修复。

##### `"safe-fix"`

类似于 `Fix`，但不会将其标记为危险。
仅适用于导入，不适用于变量。

#### fix.variables

type: `"off" | "suggestion" | "fix" | "safe-fix"`

##### `"off"`

禁用此符号类型的自动修复。

##### `"suggestion"`

发出建议式修复（当前行为）。

##### `"fix"`

发出修复式修复。

##### `"safe-fix"`

类似于 `Fix`，但不会将其标记为危险。
仅适用于导入，不适用于变量。

### ignoreClassWithStaticInitBlock

type: `boolean`

default: `false`

`ignoreClassWithStaticInitBlock` 选项是一个布尔值。静态初始化块允许你初始化静态变量，并在类定义求值期间执行代码，这意味着静态块中的代码会在不创建类的新实例的情况下执行。设为 `true` 时，此选项会忽略包含静态初始化块的类。

#### 示例

当使用 `{ "ignoreClassWithStaticInitBlock": true }` 选项时，以下是**错误**代码示例

```javascript
/* no-unused-vars: ["error", { "ignoreClassWithStaticInitBlock": true }]*/

class Foo {
  static myProperty = "some string";
  static mymethod() {
    return "some string";
  }
}

class Bar {
  static {
    let baz; // 未使用的变量
  }
}
```

当使用 `{ "ignoreClassWithStaticInitBlock": true }` 选项时，以下是**正确**代码示例

```javascript
/* no-unused-vars: ["error", { "ignoreClassWithStaticInitBlock": true }]*/

class Foo {
  static {
    let bar = "some string";

    console.log(bar);
  }
}
```

### ignoreRestSiblings

type: `boolean`

default: `false`

使用 Rest 属性可以从对象中“省略”某些属性，但默认情况下，同级属性会被标记为“未使用”。启用此选项后，将忽略 rest 属性的同级属性。

#### 示例

当此选项设为 `true` 时，以下是**正确**代码示例：

```js
// 'foo' 和 'bar' 被忽略，因为它们有一个 rest 属性同级项。
var { foo, ...coords } = data;

var bar;
({ bar, ...coords } = data);
```

### ignoreUsingDeclarations

type: `boolean`

default: `false`

当设为 `true` 时，即使通过 `using` 或 `await using` 声明的变量未被使用，规则也会忽略它们。

当处理需要通过显式资源管理提案来释放的资源时，这很有用，因为其主要目的在于释放时的副作用，而不是使用该资源本身。

#### 示例

当使用 `{ "ignoreUsingDeclarations": true }` 选项时，以下是**正确**代码示例：

```javascript
/* no-unused-vars: ["error", { "ignoreUsingDeclarations": true }]*/

using resource = getResource();
await using anotherResource = getAnotherResource();
```

### reportUsedIgnorePattern

type: `boolean`

default: `false`

`reportUsedIgnorePattern` 选项是一个布尔值。
使用此选项时，如果变量匹配任何有效的忽略模式选项（`varsIgnorePattern`、`argsIgnorePattern`、
`caughtErrorsIgnorePattern` 或 `destructuredArrayIgnorePattern`），并且这些变量已经被使用，则会报告它们。

#### 示例

当使用 `{ "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }` 选项时，以下是**错误**代码示例：

```javascript
/* no-unused-vars: ["error", { "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }]*/

var firstVarIgnored = 1;
var secondVar = 2;
console.log(firstVarIgnored, secondVar);
```

当使用 `{ "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }` 选项时，以下是**正确**代码示例：

```javascript
/* no-unused-vars: ["error", { "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }]*/

var firstVar = 1;
var secondVar = 2;
console.log(firstVar, secondVar);
```

### reportVarsOnlyUsedAsTypes

type: `boolean`

default: `false`

`reportVarsOnlyUsedAsTypes` 选项是一个布尔值。

如果为 `true`，规则也会报告仅作为类型使用的变量。

#### 示例

当使用 `{ "reportVarsOnlyUsedAsTypes": true }` 选项时，以下是**错误**代码示例：

```javascript
/*  no-unused-vars: ["error", { "reportVarsOnlyUsedAsTypes": true }] */

const myNumber: number = 4;
export type MyNumber = typeof myNumber
```

当使用 `{ "reportVarsOnlyUsedAsTypes": true }` 选项时，以下是**正确**代码示例：

```javascript
export type MyNumber = number;
```

注意：即使使用 `{ "reportVarsOnlyUsedAsTypes": false }`，值仅在自身内部作为类型使用的情况仍然会被报告：

```javascript
function foo(): typeof foo {}
```

### vars

type: `"all" | "local"`

default: `"all"`

控制如何检查全局作用域中变量的使用情况。

#### `"all"`

所有变量都会被检查是否使用，包括全局作用域中的变量。

#### `"local"`

只检查本地声明的变量是否被使用，但允许全局变量未被使用。

### varsIgnorePattern

为未使用的变量指定此规则的例外。名称匹配此模式的变量将被忽略。

默认情况下，此模式为 `^_`，除非选项配置为对象。在这种情况下，其默认值为 [`None`]。请注意，此行为与 ESLint 和 TypeScript-ESLint 都不同，后两者从不提供默认模式。

#### 示例

当模式为 `^_` 时，此选项的**正确**代码示例：

```javascript
var _a = 10;
var b = 10;
console.log(b);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中添加。

## 参考

<RuleReferences />
