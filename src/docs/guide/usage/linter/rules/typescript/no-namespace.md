---
title: "typescript/no-namespace"
category: "Restriction"
version: "0.0.8"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_namespace.rs`;
</script>

<RuleHeader />

### 它的作用

不允许 TypeScript 命名空间。

### 为什么这不好？

TypeScript 历史上允许一种称为“自定义模块”的代码组织形式（module Example {}），后来改名为“命名空间”（namespace Example）。命名空间是组织 TypeScript 代码的一种过时方式。现在更推荐使用 ES2015 模块语法（`import`/`export`）。

### 示例

此规则的**错误**代码示例：

```typescript
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

此规则的**正确**代码示例：

```typescript
declare module "foo" {}
// d.ts 文件中的任何内容
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowDeclarations

type: `boolean`

default: `false`

是否允许对自定义 TypeScript 命名空间使用 declare。

当 `{ "allowDeclarations": true }` 时，此规则的**错误**代码示例

```typescript
module foo {}
namespace foo {}
```

当 `{ "allowDeclarations": true }` 时，此规则的**正确**代码示例

```typescript
declare module "foo" {}
declare module foo {}
declare namespace foo {}

declare global {
  namespace foo {}
}

declare module foo {
  namespace foo {}
}
```

当 `{ "allowDeclarations": false }` 时，此规则的**错误**代码示例

```typescript
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

当 `{ "allowDeclarations": false }` 时，此规则的**正确**代码示例

```typescript
declare module "foo" {}
```

### allowDefinitionFiles

type: `boolean`

default: `true`

当 `{ "allowDefinitionFiles": true }` 时，此规则的**错误**代码示例

```typescript
// 如果在 d.ts 文件之外
module foo {}
namespace foo {}

// 如果在 d.ts 文件之外
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

当 `{ "allowDefinitionFiles": true }` 时，此规则的**正确**代码示例

```typescript
declare module "foo" {}
// d.ts 文件中的任何内容
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
