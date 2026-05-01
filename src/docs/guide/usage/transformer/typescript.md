# TypeScript

Oxc transformer 支持将 TypeScript 转换为 JavaScript。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    jsxPragma: "React.createElement",
    jsxPragmaFrag: "React.Fragment",
    onlyRemoveTypeImports: false,
    allowNamespaces: true,
    removeClassFieldsWithoutInitializer: false,
    rewriteImportExtensions: false,
    optimizeConstEnums: false,
    optimizeEnums: false,
  },
});
```

## `verbatimModuleSyntax`

默认情况下，TypeScript 会以不同于 JavaScript 规范的语义移除未使用的导入。
[`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax) 选项会告诉 TypeScript 与 JavaScript 规范保持一致。

如果你正在使用此选项，请确保将 `typescript.onlyRemoveTypeImports` 选项设置为 `true`。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    onlyRemoveTypeImports: true,
  },
});
```

## `useDefineForClassFields`

TypeScript 过去对类字段的语义与 JavaScript 规范不同。[`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields) 选项会告诉 TypeScript 与 JavaScript 规范保持一致。如果 tsconfig 中的 `target` 选项设置为 `es2022` 或更高版本，则默认启用此选项。

如果你要禁用此选项，请确保将 `typescript.removeClassFieldsWithoutInitializer` 选项和 `assumptions.setPublicClassFields` 设置为 `true`。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    removeClassFieldsWithoutInitializer: true,
  },
  assumptions: {
    setPublicClassFields: true,
  },
});
```

## 装饰器

Oxc transformer 支持转换旧版装饰器。这在 TypeScript 中称为实验性装饰器。

如果你在 tsconfig 中使用 [`experimentalDecorators`](https://www.typescriptlang.org/tsconfig/#experimentalDecorators) 选项，可以使用 `decorator.legacy` 选项。
如果你在 tsconfig 中使用 [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig/#emitDecoratorMetadata) 选项，可以使用 `decorator.emitDecoratorMetadata` 选项。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  decorator: {
    legacy: true,
    emitDecoratorMetadata: true,
  },
});
```

:::: warning 装饰器元数据：需要类型推断的类型将回退为 `Object`

由于缺少完整的类型推断功能，如果 Oxc transformer 无法计算装饰器元数据的类型，它将回退为 `Object` 类型。

例如，下面的代码将会被转换为以下代码：

::: code-group

```ts [input.ts]
import { Something1 } from "./somewhere";

type Something2 = Exclude<string | number, string>;

export class Foo {
  @test
  foo(input1: Something1, input2: Something2) {}
}
```

```js [output(oxc).js]
// omit helper functions
import { Something1 } from "./somewhere";
var _ref;
export class Foo {
  foo(input1, input2) {}
}
_decorate(
  [
    test,
    _decorateMetadata("design:type", Function),
    _decorateMetadata("design:paramtypes", [
      typeof (_ref = typeof Something1 !== "undefined" && Something1) === "function"
        ? _ref
        : Object,
      Object, // [!code highlight]
    ]),
    _decorateMetadata("design:returntype", void 0),
  ],
  Foo.prototype,
  "foo",
  null,
);
```

```js [output(typescript_compiler).js]
// omit helper functions
var _a;
import { Something1 } from "./somewhere";
export class Foo {
  foo(input1, input2) {}
}
__decorate(
  [
    test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      typeof (_a = typeof Something1 !== "undefined" && Something1) === "function" ? _a : Object,
      Number, // [!code highlight]
    ]),
    __metadata("design:returntype", void 0),
  ],
  Foo.prototype,
  "foo",
  null,
);
```

:::

此行为与 TypeScript 在使用外部类型时的行为一致。

你可以通过调用 `Reflect.metadata` 显式设置这些类型：

::: code-group

```ts [input.ts]
import { Something1 } from "./somewhere";

type Something2 = Exclude<string | number, string>;

export class Foo {
  @test
  @Reflect.metadata("design:paramtypes", [Something1, Number])
  foo(input1: Something1, input2: Something2) {}
}
```

```js [output.js]
// omit helper functions
import { Something1 } from "./somewhere";
var _ref;
export class Foo {
  foo(input1, input2) {}
}
_decorate(
  [
    test,
    Reflect.metadata("design:paramtypes", [Something1, Number]),
    _decorateMetadata("design:type", Function),
    _decorateMetadata("design:paramtypes", [
      typeof (_ref = typeof Something1 !== "undefined" && Something1) === "function"
        ? _ref
        : Object,
      Object,
    ]),
    _decorateMetadata("design:returntype", void 0),
  ],
  Foo.prototype,
  "foo",
  null,
);
```

:::

::::

## TSX

也支持转换 TSX 文件。
更多信息请参见 [JSX transform](./jsx)。

## 重写导入扩展名

如果你在 tsconfig 中使用 [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions) 选项，可以使用 `typescript.rewriteImportExtensions` 选项。

- `"rewrite"` 或 `true`：将 `.ts` 和 `.tsx` 重写为 `.js`，将 `.mts` 重写为 `.mjs`，将 `.cts` 重写为 `.cjs`。
- `"remove"`：完全移除 `.ts`/`.tsx`/`.mts`/`.cts` 扩展名。
- `false`（默认）：不做任何更改。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    rewriteImportExtensions: "rewrite", // 或 "remove", true, false
  },
});
```

## 优化枚举

Oxc transformer 可以通过在使用位置内联枚举成员值来优化枚举。

- `optimizeConstEnums`：内联 `const enum` 的值并移除其声明。
- `optimizeEnums`：当所有成员都满足 const enum 约束（即其值可以静态求值）时，内联普通（非 const）枚举成员的访问。若非导出的枚举声明的所有成员都可求值，且不存在将该枚举作为运行时值的引用，也会将其移除。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    optimizeConstEnums: true,
    optimizeEnums: true,
  },
});
```

## 声明

在转换输出旁边生成 `.d.ts` 声明文件。源文件必须符合所有 [`isolatedDeclarations`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations) 要求。

```js
import { transform } from "oxc-transform";

const result = await transform("lib.ts", sourceCode, {
  typescript: {
    declaration: {
      stripInternal: false,
    },
  },
});

console.log(result.declaration); // .d.ts 内容
console.log(result.declarationMap); // 声明源映射（如果启用了 sourcemap）
```

## 注意事项

### 独立模块

由于 Oxc transformer 会独立转换每个文件，因此某些 TypeScript 特性不受支持。
为避免使用不受支持的特性，你应该在 `tsconfig.json` 文件中启用 [`isolatedModules`](https://www.typescriptlang.org/tsconfig/#isolatedModules) 选项。

### 部分命名空间支持

TypeScript 有一个称为 [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html) 的旧特性。虽然[新项目推荐使用 ES 模块](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-modules)，但 Oxc transformer 对命名空间提供了部分支持。

#### 不支持使用 `var` 或 `let` 导出变量

不支持使用 `var` 或 `let` 导出变量。

```ts
namespace Foo {
  export let bar = 1; // [!code highlight]
}
console.log(Foo.bar);
```

一种解决方法是使用 `const`。如果你需要变量可变，请使用带内部可变性的对象：

```ts
namespace Foo {
  export const bar = { value: 1 }; // [!code highlight]
}
console.log(Foo.bar.value);
```

#### 命名空间不会在同名命名空间之间共享作用域

::: code-group

```ts [input.ts]
namespace Foo {
  export const bar = 1;
}
namespace Foo {
  export const baz = bar;
}
```

```js [output(oxc).js]
let foo;
(function (_Foo) {
  const bar = (_Foo.bar = 1);
})(Foo || (Foo = {}));
(function (_Foo2) {
  const baz = (_Foo2.baz = bar); // [!code highlight]
})(Foo || (Foo = {}));
```

```js [output(typescript_compiler).js]
var Foo;
(function (Foo) {
  Foo.bar = 1;
})(Foo || (Foo = {}));
(function (Foo) {
  Foo.baz = Foo.bar; // [!code highlight]
})(Foo || (Foo = {}));
```

:::

在这个示例中，TypeScript 编译器输出中第二个命名空间里的 `bar` 引用指向第一个命名空间中的 `bar` 变量，但 Oxc transformer 的输出中不是这样。

一种解决方法是通过命名空间对象显式引用：

```ts
namespace Foo {
  export const bar = 1;
}
namespace Foo {
  export const baz = Foo.bar; // [!code highlight]
}
```
