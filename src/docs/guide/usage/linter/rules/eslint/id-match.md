---
title: "eslint/id-match | Oxlint"
rule: "eslint/id-match"
category: "Style"
version: "1.66.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/id-match"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/id_match.rs`;
</script>

<RuleHeader />

### 它的作用

通过要求每个被检查的名称匹配配置的正则表达式，来强制执行标识符的命名约定。

### 为什么这不好？

不一致的标识符名称会使代码更难阅读和维护。

此规则最常用于强制执行整个项目范围内的约定，例如 `camelCase`、`snake_case`，或不带下划线的名称。

配置的模式会使用 Rust 正则表达式语法进行编译。大多数常见的命名模式与 JavaScript 正则表达式的工作方式相同，但不支持 JavaScript 特有的功能，例如前瞻/后顾断言和回溯引用。Unicode 转义也使用 Rust 语法，因此 `\uXXXX` 应写作 `\u{XXXX}`。

### 与 ESLint 的已知差异

- 计算属性解构键在绑定和赋值模式中都会被检查，例如 `const { [bad_name]: x } = obj` 和 `({ [bad_name]: x } = obj)`。即使启用了 `ignoreDestructuring`，这种情况仍然适用，因为计算键是普通的引用表达式，而不是由解构引入的绑定。
- 启用 `properties` 时，动态导入选项中的普通顶层键也会被检查，例如 `import("x", { bad_option: true })`。`with { ... }` 中的导入属性仍会被忽略。

这些情况是故意比 ESLint 更严格的，因为它们仍然包含参与正常代码执行的、由用户控制的标识符名称。

对于通过相同已访问 AST 节点类型和透明包装器传递的标识符，本规则以尽力而为的方式支持 TypeScript 语法。本规则有意不尝试覆盖完整的 TypeScript 命名范围。

### 示例

以下是此规则的**错误**代码示例：

```js
/* id-match: ["error", "^[^_]+$"] */
var first_name = "John";

/* id-match: ["error", "^[^_]+$", { "properties": true }] */
obj.first_name = "John";
```

以下是此规则的**正确**代码示例：

```js
/* id-match: ["error", "^[^_]+$"] */
var firstName = "John";

/* id-match: ["error", "^[^_]+$", { "ignoreDestructuring": true }] */
const { first_name } = user;
```

## 配置

### 第 1 个选项

type: `string`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### classFields

type: `boolean`

default: `false`

是否检查类字段名称，包括公共字段、访问器属性和私有字段名称。

#### ignoreDestructuring

type: `boolean`

default: `false`

是否忽略对象解构中引入的简写绑定和别名绑定，例如 `const { foo } = obj` 中的 `foo`，以及 `const { foo: alias } = obj` 中的 `alias`。这不会抑制计算键引用，例如 `const { [key]: value } = obj`。

#### onlyDeclarations

type: `boolean`

default: `false`

是否只检查变量和函数声明名称。引用、成员名称、标签、类名称、TypeScript 声明，以及函数或箭头函数参数会被跳过。

#### properties

type: `boolean`

default: `false`

是否检查对象字面量属性名称、类方法名称，以及已赋值的成员名称，例如 `obj.prop = value`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.66.0 中加入。

## 参考资料

<RuleReferences />
