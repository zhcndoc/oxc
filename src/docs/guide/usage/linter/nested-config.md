---
title: "嵌套配置文件 | Oxlint"
description: 使用多个配置文件，将不同的 Oxlint 设置应用于仓库的不同部分。
---

# 嵌套配置文件

Oxlint 可以在同一个仓库中使用多个配置文件。它会自动检测名为 `.oxlintrc.json` 或 `oxlint.config.ts` 的配置文件，并根据文件在目录树中的位置应用它们。

这在 monorepo 中非常有用，其中各个包需要自己的设置，同时仍保持共享基线。

如果您只需要排除文件或文件夹，请改用 [忽略文件](./ignore-files)。

## 工作原理

对于每个被 lint 的文件，Oxlint 会使用相对于该文件最近的配置文件（`.oxlintrc.json` 或 `oxlint.config.ts`）。

给定以下结构：

```
my-project/
├── .oxlintrc.json
├── src/
│   ├── index.js
├── package1/
│   ├── oxlint.config.ts
│   └── index.js
└── package2/
    ├── .oxlintrc.json
    └── index.js
```

配置解析工作如下：

- `src/index.js` 使用 `my-project/.oxlintrc.json`
- `package1/index.js` 使用 `my-project/package1/oxlint.config.ts`
- `package2/index.js` 使用 `my-project/package2/.oxlintrc.json`

## 预期行为

配置文件不会自动合并。子目录中的配置不会影响父级配置。

命令行选项会覆盖配置文件，无论它们来自父目录还是子目录。

使用 `-c` 或 `--config` 传递显式配置文件位置会禁用嵌套配置查找，Oxlint 将仅使用该单个配置文件。

您也可以使用 `--disable-nested-config` 标志禁用嵌套配置。

`options.typeAware` 和 `options.typeCheck` 仅限根配置。如果在嵌套配置文件中设置了其中任何一个，Oxlint 将报告错误。

## Monorepo 模式：使用 extends 共享基础配置

在 monorepo 中，您通常希望在根目录有一个共享基线，以及针对特定包的小调整。

您可以通过保留根配置文件（`.oxlintrc.json` 或 `oxlint.config.ts`），然后让包配置扩展它来实现这一点。

::: code-group

```json [my-project/.oxlintrc.json]
{
  "rules": {
    "no-debugger": "error"
  }
}
```

```ts [my-project/oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  rules: {
    "no-debugger": "error",
  },
});
```

:::

::: code-group

```json [my-project/package1/.oxlintrc.json]
{
  "extends": ["../.oxlintrc.json"],
  "rules": {
    "no-console": "off"
  }
}
```

```ts [my-project/package1/oxlint.config.ts]
import baseConfig from "../oxlint.config.ts";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [baseConfig],
  rules: {
    "no-console": "off",
  },
});
```

:::

这将共享基线保持在一个地方，并使包配置小而专注。

## 扩展配置文件

一个配置可以使用 `extends` 复用其他配置中的设置。

在 `.oxlintrc.json` 中，`extends` 是一个文件路径数组，相对于声明它们的配置文件解析。被扩展的文件可以有任意名称。只要它们是有效的 JSON 配置文件，就不需要命名为 `.oxlintrc.json`。`.oxlintrc.json` 格式不支持包导入。

在 `oxlint.config.ts` 中，导入您想要扩展的配置对象，并将它们传递给 `extends`。带有 `extends` 属性的文件必须命名为 `oxlint.config.ts`。在扩展从共享包导入的配置对象时，请使用 `oxlint.config.ts`。

示例：

::: code-group

```json [oxlint-typescript.json]
{
  "plugins": ["typescript"],
  "rules": {
    "typescript/no-explicit-any": "error"
  }
}
```

```ts [oxlint-typescript.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  rules: {
    "typescript/no-explicit-any": "error",
  },
});
```

:::

::: code-group

```json [.oxlintrc.json]
{
  "extends": ["oxlint-typescript.json"],
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

```ts [oxlint.config.ts]
import typescriptConfig from "./oxlint-typescript.config.ts";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [typescriptConfig],
  rules: {
    "no-unused-vars": "warn",
  },
});
```

:::

共享包在 `oxlint.config.ts` 中的工作方式相同：

```ts [oxlint.config.ts]
import sharedConfig from "@example-org/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [sharedConfig],
});
```

只有某些属性可以被扩展。支持的属性如下：

- `rules`
- `plugins`
- `overrides`
