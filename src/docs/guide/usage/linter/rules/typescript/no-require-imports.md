---
title: "typescript/no-require-imports | Oxlint"
rule: "typescript/no-require-imports"
category: "Restriction"
version: "0.13.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_require_imports.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 CommonJS 的 `require` 调用。

### 为什么这很糟糕？

`require` 导入虽然在 Node.js 和旧版 JavaScript 环境中可用，但在现代 JavaScript 开发中，通常被认为不如 ES 模块（`import`）理想，原因主要有以下几点：

1. **静态 vs. 动态**：`require` 是一个 **运行时** 函数。它在代码运行时执行，这意味着与缺失模块或路径错误相关的错误，只有在运行时才会被发现。ES 模块（`import`）是静态导入。它们的解析和潜在错误会在编译或打包过程中被检查，因此更容易在开发阶段捕获。

2. **代码组织与可读性**：`require` 语句分散在代码各处，这可能会使快速识别某个模块的依赖变得更困难。`import` 语句通常会集中放在文件顶部，从而改善代码组织和可读性。

3. **Tree Shaking 和优化**：Webpack 和 Rollup 等现代打包工具会使用 tree-shaking 从最终 bundle 中移除未使用的代码。Tree-shaking 与 ES 模块配合得明显更好，因为它们的依赖是静态且显式声明的。`require` 会使打包工具更难准确识别并移除未使用的代码，导致 bundle 更大、加载更慢。

4. **循环依赖**：处理循环依赖（即模块 A 导入 B，而 B 又导入 A）时，`require` 的处理难度要高得多。ES 模块通过其声明式特性以及动态导入（`import()`）的使用，提供了更好的机制来处理循环导入和管理异步加载。

5. **可维护性与重构**：使用 ES 模块时，修改模块名称或路径更简单，因为这些变更是直接声明的，编译器或打包工具会捕获任何错误。而使用 `require` 时，你可能需要追踪某个特定模块的所有 `require` 语句实例，使重构更容易出错。

6. 现代 JavaScript 标准：`import` 是现代 JavaScript 中导入模块的标准方式，与当前最佳实践和语言规范保持一致。使用 `require` 则需要额外的构建步骤或工具，将其转换为浏览器或现代 JavaScript 环境可以理解的格式。

7. 错误处理：ES 模块通过在动态导入中使用 `try...catch` 块，为模块加载期间的错误提供了更结构化的处理方式，从而增强错误管理。`require` 的错误则可能不那么可预测。

总之，虽然 `require` 可以工作，但 ES 模块在静态分析、更好的打包、改进的代码组织以及更易维护性方面的优势，使其成为现代 JavaScript 项目中导入模块的首选方式。

### 示例

此规则的**错误**代码示例：

```ts
const lib1 = require("lib1");
const { lib2 } = require("lib2");
import lib3 = require("lib3");
```

此规则的**正确**代码示例：

```ts
import * as lib1 from "lib1";
import { lib2 } from "lib2";
import * as lib3 from "lib3";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

这些字符串将使用 u 标志编译为正则表达式，并用于针对导入路径进行测试。
一个常见用例是允许导入 `package.json`。这是因为 `package.json` 通常位于 TS 根目录之外，
所以静态导入它会导致根目录冲突，尤其是在启用 `resolveJsonModule` 的情况下。
如果你的环境不支持 JSON 模块，你也可以用它来允许导入任何 JSON，或者在其他 `import` 语句无法工作的情况下使用它。

使用 `{ allow: ['/package\\.json$'] }` 时：

此规则的**正确**代码示例：

```ts
console.log(require("../package.json").version);
```

### allowAsImport

type: `boolean`

default: `false`

当设置为 `true` 时，`import ... = require(...)` 声明不会被报告。
如果你使用某些需要严格 CommonJS 互操作语义的模块选项，这会很有用。

当设置为 `true` 时：

此规则的**错误**代码示例：

```ts
var foo = require("foo");
const foo = require("foo");
let foo = require("foo");
```

此规则的**正确**代码示例：

```ts
import foo = require("foo");
import foo from "foo";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.13.0 中添加。

## 参考资料

<RuleReferences />
