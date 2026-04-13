---
title: 配置
description: 使用 .oxlintrc.json 或 oxlint.config.ts 配置 Oxlint。
---

# 配置

Oxlint 开箱即用，但大多数团队会提交一个配置文件（`.oxlintrc.json` 或 `oxlint.config.ts`），以保持本地运行、编辑器和 CI 中的 lint 检查一致。

本页重点介绍项目配置：规则、类别、插件、覆盖和共享设置。

## 创建配置文件

要在当前目录生成初始配置（JSON）：

```sh
oxlint --init
```

Oxlint 会自动在当前工作目录中查找 `.oxlintrc.json` 或 `oxlint.config.ts`。你也可以显式传递配置（注意这将禁用嵌套配置查找）：

```sh
oxlint -c ./oxlintrc.json
# 或
oxlint --config ./oxlintrc.json
```

注意：

- `.oxlintrc.json` 支持注释（类似 jsonc）。
- 配置格式旨在与 ESLint v8 的格式（`eslintrc.json`）兼容。
- 你可以在目录中使用 `.oxlintrc.json` 或 `oxlint.config.ts`，但不能同时使用。

最小配置如下所示：

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "categories": {
    "correctness": "warn"
  },
  "rules": {
    "eslint/no-unused-vars": "error"
  }
}
```

### TypeScript 配置文件（`oxlint.config.ts`）

Oxlint 还支持名为 `oxlint.config.ts` 的 TypeScript 配置文件。

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "error",
  },
});
```

注意：

- 文件必须命名为 `oxlint.config.ts`（即使通过 `--config` 传递时也是如此）。
- 默认导出必须是一个对象，并且应该用 `defineConfig` 包装以获得类型支持。
- TypeScript 配置需要基于 Node 的 `oxlint` 包（JS 运行时）。如果你使用的是独立二进制文件，请改用 `.oxlintrc.json`。
- TypeScript 配置需要能够执行 TypeScript 的 Node 运行时（Node v22.18+ 或 v24+）。

## 配置文件格式

配置文件可以是 JSON 对象（`.oxlintrc.json`）或默认导出配置对象的 TypeScript 模块（`oxlint.config.ts`）。最常见的顶层字段包括：

- `rules`：启用或禁用规则，设置严重程度，并配置规则选项。
- `categories`：启用具有相似意图的规则组。
- `plugins`：启用提供额外规则的内置插件。
- `jsPlugins`：配置 JavaScript 插件（alpha）。
- `overrides`：将不同的配置应用于不同的文件模式。
- `extends`：从其他文件继承配置。
- `ignorePatterns`：在配置文件中忽略额外的文件。
- `env`：为常见环境启用预定义的全局变量。
- `globals`：声明自定义全局变量为只读或可写。
- `settings`：多个规则共享的插件级配置。
- `options`：Linter 级选项（例如 `options.typeAware` 和 `options.typeCheck`）。

有关字段的完整列表，请参阅 [配置文件参考](/docs/guide/usage/linter/config-file-reference.html)。

## 配置 Linter 选项

使用 `options` 控制 Linter 级行为。有关完整列表，请参阅 [配置文件参考](/docs/guide/usage/linter/config-file-reference.html#options)。

示例：

::: code-group

```json [.oxlintrc.json]
{
  "options": {
    "typeAware": true,
    "typeCheck": true,
    "maxWarnings": 10
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
    maxWarnings: 10,
  },
});
```

:::

- `options.typeAware` 等同于在 CLI 上传递 `--type-aware`。
- `options.typeCheck`（实验性）等同于在 CLI 上传递 `--type-check`。
- `options.maxWarnings` 等同于在 CLI 上传递 `--max-warnings`。

当 CLI 和配置值同时存在时，CLI 标志优先。

`options.typeAware` 和 `options.typeCheck` 仅在根配置文件中受支持。

## 配置规则

规则在 `rules` 下配置。

规则值可以是：

- 严重程度（`"off"`、`"warn"`、`"error"`），或
- `[severity, options]` 数组

如果规则来自 ESLint 核心且其名称唯一，你可以配置它而不带插件前缀。例如，`no-console` 与 `eslint/no-console` 相同。

::: code-group

```json [.oxlintrc.json]
{
  "rules": {
    "no-alert": "error",
    "oxc/approx-constant": "warn",
    "no-plusplus": "off",
    "eslint/prefer-const": ["error", { "destructuring": "any" }]
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  rules: {
    "no-alert": "error",
    "oxc/approx-constant": "warn",
    "no-plusplus": "off",
    "eslint/prefer-const": ["error", { destructuring: "any" }],
  },
});
```

:::

### 严重程度值

Oxlint 接受 ESLint 风格的严重程度：

- 禁用规则：`"off"` 或 `"allow"`
- 规则警告：`"warn"`
- 规则错误：`"error"` 或 `"deny"`

### 规则选项

要配置规则选项，请使用数组：

::: code-group

```json [.oxlintrc.json]
{
  "rules": {
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  rules: {
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
  },
});
```

:::

所有可用规则及其配置选项列在 [规则参考](/docs/guide/usage/linter/rules) 中。

### 从 CLI 覆盖严重程度

为了快速实验，你可以使用以下命令从命令行调整严重程度：

- `-A` / `--allow`
- `-W` / `--warn`
- `-D` / `--deny`

参数从左到右应用：

```sh
oxlint -D no-alert -W oxc/approx-constant -A no-plusplus
```

## 使用类别启用规则组

类别允许你启用或禁用具有相似意图的规则集。默认情况下，Oxlint 启用 `correctness` 类别中的规则。

使用 `categories` 配置类别：

::: code-group

```json [.oxlintrc.json]
{
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "pedantic": "off"
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "off",
  },
});
```

:::

可用类别包括：

- `correctness`：肯定错误或无用的代码
- `suspicious`：可能错误或无用的代码
- `pedantic`：可能产生误报的额外严格规则
- `perf`：旨在提高运行时性能的规则
- `style`：习惯用法且一致的风格规则
- `restriction`：禁止特定模式或功能的规则
- `nursery`：正在开发中且可能会更改的规则

你也可以使用相同的 `-A`、`-W` 和 `-D` 选项从 CLI 更改类别：

```sh
oxlint -D correctness -D suspicious
```

## 配置插件

插件扩展了可用规则集。

Oxlint 原生支持许多流行插件（使用 Rust）。这提供了广泛的规则覆盖，而无需庞大的 JavaScript 依赖树。请参阅 [原生插件](/docs/guide/usage/linter/plugins)。

使用 `plugins` 配置插件。设置 `plugins` 会覆盖默认插件集，因此数组应包含所有你想启用的内容：

::: code-group

```json [.oxlintrc.json]
{
  "plugins": ["unicorn", "typescript", "oxc"]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["unicorn", "typescript", "oxc"],
});
```

:::

要禁用所有默认插件：

::: code-group

```json [.oxlintrc.json]
{
  "plugins": []
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [],
});
```

:::

有关插件详细信息和 CLI 标志（如 `--import-plugin`），请参阅 [原生插件](/docs/guide/usage/linter/plugins)。

## 配置 JS 插件（alpha）

Oxlint 还通过 `jsPlugins` 支持 JavaScript 插件。这旨在与现有 ESLint 插件和高级集成兼容。

注意：

- JS 插件处于 alpha 阶段，不受语义版本控制约束。

JS 插件可以声明为字符串，或带有别名的对象：

::: code-group

```json [.oxlintrc.json]
{
  "jsPlugins": [
    "eslint-plugin-playwright",
    { "name": "my-eslint-react", "specifier": "eslint-plugin-react" }
  ]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: [
    "eslint-plugin-playwright",
    { name: "my-eslint-react", specifier: "eslint-plugin-react" },
  ],
});
```

:::

某些插件名称是保留的，因为它们是在 Rust 中本地实现的（例如 `react`、`unicorn`、`typescript`、`oxc`、`import`、`jest`、`vitest`、`jsx-a11y`、`nextjs`）。如果你需要保留插件的 JavaScript 版本，请给它一个自定义 `name` 以避免冲突。

有关详细信息，请参阅 [JS 插件](/docs/guide/usage/linter/js-plugins)。

## 按文件模式应用配置

使用 `overrides` 将不同的配置应用于不同的文件，例如测试、脚本或仅限 TypeScript 的路径。

`overrides` 是对象数组。每个覆盖可以包括：

- `files`：glob 模式
- `rules`：规则配置（与顶层 `rules` 形状相同）
- `env`：环境配置（与顶层 `env` 形状相同）
- `globals`：全局变量配置（与顶层 `globals` 形状相同）
- `plugins`：可选地更改为此覆盖启用的插件
- `jsPlugins`：此覆盖的 JS 插件（alpha）

示例：

::: code-group

```json [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "rules": {
    "no-console": "error"
  },
  "overrides": [
    {
      "files": ["scripts/*.js"],
      "rules": {
        "no-console": "off"
      }
    },
    {
      "files": ["**/*.{ts,tsx}"],
      "plugins": ["typescript"],
      "rules": {
        "typescript/no-explicit-any": "error"
      }
    },
    {
      "files": ["**/test/**"],
      "plugins": ["jest"],
      "env": {
        "jest": true
      },
      "rules": {
        "jest/no-disabled-tests": "off"
      }
    }
  ]
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  rules: {
    "no-console": "error",
  },
  overrides: [
    {
      files: ["scripts/*.js"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["typescript"],
      rules: {
        "typescript/no-explicit-any": "error",
      },
    },
    {
      files: ["**/test/**"],
      plugins: ["jest"],
      env: {
        jest: true,
      },
      rules: {
        "jest/no-disabled-tests": "off",
      },
    },
  ],
});
```

:::

## 扩展共享配置

使用 `extends` 从其他配置文件继承。

`extends` 中的路径是相对于声明 `extends` 的配置文件进行解析的。配置从第一个到最后一个合并，后面的条目会覆盖前面的条目。

::: code-group

```json [.oxlintrc.json]
{
  "extends": ["./configs/base.json", "./configs/frontend.json"]
}
```

```ts [oxlint.config.ts]
import baseConfig from "./configs/base.ts";
import frontendConfig from "./configs/frontend.ts";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [baseConfig, frontendConfig],
});
```

:::

## 配置环境和全局变量

使用 `env` 为常见环境（如 browser 或 node）启用预定义的全局变量。

使用 `globals` 声明项目特定的全局变量，将它们标记为可写或只读，或者禁用原本存在的全局变量。

::: code-group

```json [.oxlintrc.json]
{
  "env": {
    "es6": true
  },
  "globals": {
    "MY_GLOBAL": "readonly",
    "Promise": "off"
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    es6: true,
  },
  globals: {
    MY_GLOBAL: "readonly",
    Promise: "off",
  },
});
```

:::

`globals` 接受：

- `"readonly"` 或 `"readable"` 或 `false`
- `"writable"` 或 `"writeable"` 或 `true`
- `"off"` 用于禁用全局变量

## 插件设置

使用 `settings` 进行多个规则共享的插件级配置。

示例（monorepo + React + jsx-a11y）：

::: code-group

```json [.oxlintrc.json]
{
  "settings": {
    "next": {
      "rootDir": "apps/dashboard/"
    },
    "react": {
      "linkComponents": [{ "name": "Link", "linkAttribute": "to" }]
    },
    "jsx-a11y": {
      "components": {
        "Link": "a",
        "Button": "button"
      }
    }
  }
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  settings: {
    next: {
      rootDir: "apps/dashboard/",
    },
    react: {
      linkComponents: [{ name: "Link", linkAttribute: "to" }],
    },
    "jsx-a11y": {
      components: {
        Link: "a",
        Button: "button",
      },
    },
  },
});
```

:::

## 下一步

- [忽略文件](/docs/guide/usage/linter/ignore-files)：忽略文件和模式，`.gitignore` 和 `.eslintignore` 工作流，以及符号链接行为。
- [内联忽略注释](/docs/guide/usage/linter/ignore-comments)：内联抑制和作用域例外。
- [嵌套配置](/docs/guide/usage/linter/nested-config)：Monorepo 和每个包的配置。
- [配置文件参考](/docs/guide/usage/linter/config-file-reference.html)：完整的 schema 和字段文档。
- [CLI 参考](/docs/guide/usage/linter/cli.html)：完整的标志和输出格式列表。
