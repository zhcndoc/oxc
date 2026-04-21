---
title: "typescript/一致类型导入"
category: "样式"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_type_imports.rs`;
</script>

<RuleHeader />

### 它的作用

强制一致地使用类型导入。

#### 忽略的文件

此规则会完全忽略 `.astro`、`.svelte` 和 `.vue` 文件。由于 Oxlint 不支持解析模板语法，此规则无法判断 Vue / Svelte / Astro 文件中某个变量是否被使用。

### 这为什么不好？

类型导入使用不一致会使代码更难阅读和理解。

### 示例

以下是此规则的**错误**代码示例：

```ts
import { Foo } from "Foo";
type T = Foo;

type S = import("Foo");
```

以下是此规则的**正确**代码示例：

```ts
import type { Foo } from "Foo";
```

#### 带有 `"prefer": "type-imports"`（默认值）的示例

以下是**错误**代码示例：

```ts
import { Foo } from "foo";
let foo: Foo;
```

以下是**正确**代码示例：

```ts
import type { Foo } from "foo";
let foo: Foo;
```

#### 带有 `"prefer": "no-type-imports"` 的示例

以下是**错误**代码示例：

```ts
import type { Foo } from "foo";
let foo: Foo;
```

以下是**正确**代码示例：

```ts
import { Foo } from "foo";
let foo: Foo;
```

#### 带有 `"fixStyle": "inline-type-imports"` 的示例

修复类型导入时，此选项将使用内联的 `type` 修饰符：

```ts
// 修复前
import { A, B } from "foo";
type T = A;
const b = B;

// 修复后
import { type A, B } from "foo";
type T = A;
const b = B;
```

#### 带有 `"disallowTypeAnnotations": false"` 的示例

当设置为 `false` 时，允许使用 `import()` 类型注解：

```ts
type T = import("foo").Bar;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### disallowTypeAnnotations

type: `boolean`

default: `true`

禁止在类型注解中使用 `import()`，例如 `type T = import('foo')`

### fixStyle

type: `"separate-type-imports" | "inline-type-imports"`

default: `"separate-type-imports"`

控制自动修复时如何添加类型导入。

#### `"separate-type-imports"`

会在 `import` 关键字后添加 `type` 关键字：`import type { A } from '...'`

#### `"inline-type-imports"`

会内联 `type` 关键字：`import { type A } from '...'`（仅适用于 TypeScript 4.5+）

### prefer

type: `"type-imports" | "no-type-imports"`

default: `"type-imports"`

控制是强制使用类型导入还是值导入。

#### `"type-imports"`

会强制你始终使用 `import type Foo from '...'`，但装饰器的元数据引用除外。

#### `"no-type-imports"`

会强制你始终使用 `import Foo from '...'`

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
