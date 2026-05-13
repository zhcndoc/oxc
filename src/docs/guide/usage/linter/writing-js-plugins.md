---
title: "编写 JS 插件 | Oxlint"
outline: deep
---

# 编写 JS 插件

:::info
JS 插件目前处于 alpha 阶段，并且仍在积极开发中。

所有 API 的行为都应与 ESLint 完全一致。如果你发现任何行为差异，
那就是一个 bug - 请 [报告它](https://github.com/oxc-project/oxc/issues/new?template=linter_bug_report.yaml)。
:::

## 兼容 ESLint 的 API

Oxlint 提供了与 ESLint 完全一致的插件 API。请参阅 ESLint 关于
[创建插件](https://eslint.org/docs/latest/extend/plugins) 和
[自定义规则](https://eslint.org/docs/latest/extend/custom-rules) 的文档。

一个会标记包含超过 5 个类声明的文件的简单插件：

```js
// plugin.js
const rule = {
  create(context) {
    let classCount = 0;

    return {
      ClassDeclaration(node) {
        classCount++;
        if (classCount === 6) {
          context.report({ message: "类太多了", node });
        }
      },
    };
  },
};

const plugin = {
  meta: {
    name: "best-plugin-ever",
  },
  rules: {
    "max-classes": rule,
  },
};

export default plugin;
```

::: code-group

```json [.oxlintrc.json]
{
  "jsPlugins": ["./plugin.js"],
  "rules": {
    "best-plugin-ever/max-classes": "error"
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: ["./plugin.js"],
  rules: {
    "best-plugin-ever/max-classes": "error",
  },
});
```

:::

## 替代 API

Oxlint 还提供了一种略有不同的替代 API，它的性能更高。

使用此 API 创建的规则 **仍然与 ESLint 兼容**（见 [下文](#what-does-eslintcompatplugin-do)）。

与上面相同的规则，使用替代 API：

```js
import { eslintCompatPlugin } from "@oxlint/plugins";

const rule = {
  createOnce(context) {
    // 定义计数器变量
    let classCount;

    return {
      before() {
        // 在遍历每个文件的 AST 之前重置计数器
        classCount = 0;
      },
      // 与之前相同
      ClassDeclaration(node) {
        classCount++;
        if (classCount === 6) {
          context.report({ message: "类太多了", node });
        }
      },
    };
  },
};

const plugin = eslintCompatPlugin({
  meta: {
    name: "best-plugin-ever",
  },
  rules: {
    "max-classes": rule,
  },
});

export default plugin;
```

差异如下：

1. 将插件对象包装在 `eslintCompatPlugin(...)` 中。

```diff
- const plugin = {
+ const plugin = eslintCompatPlugin({
```

2. 使用 `createOnce` 代替 `create`。

```diff
-   create(context) {
+   createOnce(context) {
```

3. `create`（ESLint 的 API）会针对 _每个文件_ 重复调用，而 `createOnce` 只会调用一次。
   任何按文件进行的初始化都应放在 `before` 钩子中。

```diff
-     let classCount = 0;
+     let classCount;

      return {
+       before() {
+         classCount = 0; // 重置计数器
+       },
        ClassDeclaration(node) {
          classCount++;
          if (classCount === 6) {
            context.report({ message: "类太多了", node });
          }
        },
      };
```

### `eslintCompatPlugin` 是做什么的？

`eslintCompatPlugin` 会给插件中的每条规则添加一个 `create` 方法，而该方法会委托给 `createOnce`。

**这意味着该插件可以同时用于 Oxlint 或 ESLint。**

- 在 Oxlint 中，它会因为更快的 `createOnce` API 而获得性能提升。
- 在 ESLint 中，它的工作方式与使用原始 ESLint `create` API 编写时完全相同。

如果你要将插件发布到 NPM，请将 `@oxlint/plugins` 作为 _运行时_ 依赖（而不是开发依赖）。

### 跳过 AST 遍历

在 `before` 钩子中返回 `false` 会使规则跳过当前文件。

```js
// 该规则不会在以 `// @skip-me` 注释开头的文件上运行
const rule = {
  createOnce(context) {
    return {
      before() {
        if (context.sourceCode.text.startsWith("// @skip-me")) {
          return false;
        }
      },
      FunctionDeclaration(node) {
        // 执行一些操作
      },
    };
  },
};
```

这等价于 ESLint 中的以下模式：

```js
const rule = {
  create(context) {
    if (context.sourceCode.text.startsWith("// @skip-me")) {
      return {};
    }

    return {
      FunctionDeclaration(node) {
        // 执行一些操作
      },
    };
  },
};
```

### `before` 钩子

`before` 钩子会在 AST 被访问之前运行。

重要：不能保证 `before` 钩子会在每个文件上都运行。

目前它确实会运行，但未来我们打算在 Rust 端添加逻辑，用于根据规则“感兴趣”的 AST 节点以及 AST 的实际内容来判断该规则是否需要运行。
这将通过跳过 Rust 到 JS 的冗余调用来提升性能。

在上面的示例中，如果某个文件不包含任何 `FunctionDeclaration`，那么在该文件上运行规则会被完全跳过，
_包括_ 跳过 `before` 钩子。

如果你需要某段代码对每个文件都始终运行一次，请改为实现一个 `Program` 访问器：

```js
const rule = {
  createOnce(context) {
    return {
      Program(node) {
        // 这始终会对每个文件运行，即使它
        // 不包含任何 `FunctionDeclaration`
      },
      FunctionDeclaration(node) {
        /* 执行一些操作 */
      },
    };
  },
};
```

### `after` 钩子

还有一个 `after` 钩子。它会在整个 AST 遍历完成后、每个文件运行一次（在 `Program:exit` 之后）。

可用它来清理规则在 AST 遍历过程中使用的任何昂贵资源。

如果 `before` 钩子返回 `false` 以跳过对该文件运行规则，那么 `after` 钩子也会被跳过。

与 `before` 钩子一样，不能保证 `after` 钩子会在每个文件上都运行（见 [上文](#when-before-hook-runs)）。

## 为什么替代 API 更快？

简短答案：目前还不是。但它 _很快就会是_。

在 JS 插件最初的技术预览版发布之前，我们经历了漫长的“研发”过程。我们
识别出了许多优化机会，并为 Oxlint 插件的 _下一_ 版本做了原型，它具有
_极其_ 出色的性能。

其中很多优化尚未包含在当前版本中，但我们会在接下来的几个月里逐步打磨并将它们整合进 Oxlint。

替代 API 的设计目标就是为了启用并充分利用这些优化。现在就采用替代 API，
插件作者将来只需升级 `oxlint` 版本，而无需修改任何代码，就能“免费”获得显著的速度提升。

### 那些优化是什么？

回到上面“类不超过 5 个”的规则示例：

```js
const rule = {
  create(context) {
    let classCount = 0;

    return {
      ClassDeclaration(node) {
        classCount++;
        if (classCount === 6) {
          context.report({ message: "类太多了", node });
        }
      },
    };
  },
};
```

`create` 方法会对每个文件调用一次，每次都会传入一个新的 `context` 对象。

这为什么是个问题？

为了获得最大性能，理想情况下我们希望静态地知道规则“感兴趣”的 AST 节点是什么。掌握这些信息后，我们可以执行 2 种优化：

1. 不在 JS 端遍历 AST。相反，在 Rust 端遍历 AST 时，编译出一个与相关 AST 节点对应的“指针”列表。将该列表发送给 JS，JS 就可以直接“跳转”到相关 AST 节点，而不是搜索整个 AST。

2. 如果 AST 不包含任何符合规则感兴趣条件的 AST 节点（在上面的示例中，如果文件
   不包含任何类声明），则该文件完全跳过对 JS 的调用。

但 JS 是一门动态语言，`create` 可以做 _任何事情_。它每次被调用时都可能返回完全不同的访问器。所以我们必须先调用 `create` 才能知道是否需要调用 `create`！

相比之下，使用替代 API 时，`createOnce` 只会调用一次，然后我们就知道规则会做什么。
这使得上述优化成为可能。

需要说明的是，ESLint 方面的 `create` API _并不是_ 一个糟糕的设计决定。只是当 Rust-JS 互操作介入时，它会带来一些困难。

## 下一步

请参阅 [API 支持](./js-plugins#api-support) 部分，了解在 Oxlint 插件中支持使用的 ESLint API。
