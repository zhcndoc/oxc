---
search: false
---

# Oxlint 配置文件

此配置与 ESLint v8 的配置模式（`eslintrc.json`）保持一致。

用法：`oxlint -c oxlintrc.json`

示例

`.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["import", "typescript", "unicorn"],
  "env": {
    "browser": true
  },
  "globals": {
    "foo": "readonly"
  },
  "settings": {
    "react": {
      "version": "18.2.0"
    },
    "custom": {
      "option": true
    }
  },
  "rules": {
    "eqeqeq": "warn",
    "import/no-cycle": "error",
    "react/self-closing-comp": [
      "error",
      {
        "html": false
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.spec.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

`oxlint.config.ts`

```ts
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import", "typescript", "unicorn"],
  env: {
    browser: true,
  },
  globals: {
    foo: "readonly",
  },
  settings: {
    react: {
      version: "18.2.0",
    },
    custom: { option: true },
  },
  rules: {
    eqeqeq: "warn",
    "import/no-cycle": "error",
    "react/self-closing-comp": ["error", { html: false }],
  },
  overrides: [
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
});
```

## $schema

类型：`string`

用于编辑器工具的 Schema URI。

## categories

类型：`object`

一次性配置整个规则类别。

以此方式启用或禁用的规则将被 `rules` 字段中的单个规则覆盖。

示例

```json
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

### categories.correctness

### categories.nursery

### categories.pedantic

### categories.perf

### categories.restriction

### categories.style

### categories.suspicious

## env

类型：`Record<string, boolean>`

环境用于启用和禁用全局变量集合。

预定义全局变量。

环境用于指定哪些全局变量是预定义的。
可用的环境：

- amd - `require()` 和 `define()` 全局变量。
- applescript - AppleScript 全局变量。
- astro - Astro 全局变量。
- atomtest - Atom 测试全局变量。
- audioworklet - AudioWorklet 全局变量。
- browser - 浏览器全局变量。
- builtin - 最新的 ECMAScript 全局变量，相当于 es2026。
- commonjs - CommonJS 全局变量和作用域。
- embertest - Ember 测试全局变量。
- es2015 - ECMAScript 2015 全局变量。
- es2016 - ECMAScript 2016 全局变量。
- es2017 - ECMAScript 2017 全局变量。
- es2018 - ECMAScript 2018 全局变量。
- es2019 - ECMAScript 2019 全局变量。
- es2020 - ECMAScript 2020 全局变量。
- es2021 - ECMAScript 2021 全局变量。
- es2022 - ECMAScript 2022 全局变量。
- es2023 - ECMAScript 2023 全局变量。
- es2024 - ECMAScript 2024 全局变量。
- es2025 - ECMAScript 2025 全局变量。
- es2026 - ECMAScript 2026 全局变量。
- es6 - 除模块外的 ECMAScript 6 全局变量。
- greasemonkey - GreaseMonkey 全局变量。
- jasmine - Jasmine 全局变量。
- jest - Jest 全局变量。
- jquery - jQuery 全局变量。
- meteor - Meteor 全局变量。
- mocha - Mocha 全局变量。
- mongo - MongoDB 全局变量。
- nashorn - Java 8 Nashorn 全局变量。
- node - Node.js 全局变量和作用域。
- phantomjs - PhantomJS 全局变量。
- prototypejs - Prototype.js 全局变量。
- protractor - Protractor 全局变量。
- qunit - QUnit 全局变量。
- serviceworker - Service Worker 全局变量。
- shared-node-browser - Node.js 和浏览器共用全局变量。
- shelljs - ShellJS 全局变量。
- svelte - Svelte 全局变量。
- vitest - Vitest 全局变量。
- vue - Vue 全局变量。
- webextensions - WebExtensions 全局变量。
- worker - Web Workers 全局变量。

## extends

类型：`string[]`

此配置文件扩展（继承自）的配置文件路径。文件路径是相对于包含 `extends` 属性的配置文件的位置解析的。配置文件从第一个到最后一个合并，最后一个文件覆盖之前的文件。

## globals

类型：`Record<string, string>`

启用或禁用特定全局变量。

添加或移除全局变量。

对于每个全局变量，将相应的值设置为 `"writable"` 以允许变量被覆盖，或设置为 `"readonly"` 以禁止覆盖。

可以通过将全局变量的值设置为 `"off"` 来禁用它们。例如，在一个大多数 ECMAScript 2015 全局变量可用但 `Promise` 不可用的环境中，你可以使用此配置：

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "env": {
    "es6": true
  },
  "globals": {
    "Promise": "off"
  }
}
```

你也可以使用 `"readable"` 或 `false` 来表示 `"readonly"`，使用 `"writeable"` 或 `true` 来表示 `"writable"`。

## ignorePatterns

类型：`string[]`

默认值：`[]`

lint 检查期间要忽略的 Glob 模式。这些模式是从配置文件路径解析的。

## jsPlugins

类型：`array`

JS 插件，允许在 Oxlint 中使用 ESLint 插件。

在 [文档](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) 中了解更多关于 JS 插件的信息。

注意：JS 插件处于 alpha 阶段，不受语义版本控制约束。

示例：

使用本地插件路径的基本用法。

```json
{
  "jsPlugins": ["./custom-plugin.js"],
  "rules": {
    "custom/rule-name": "warn"
  }
}
```

使用 TypeScript 插件和本地插件路径的基本用法。

TypeScript 插件文件在以下环境中受支持：

- Deno 和 Bun：原生支持 TypeScript 文件。
- Node.js >=22.18.0 和 Node.js ^20.19.0：原生支持 TypeScript 文件，默认启用内置的类型剥离功能。

对于较旧版本的 Node.js，不支持 TypeScript 插件。请使用 JavaScript 插件或升级你的 Node 版本。

```json
{
  "jsPlugins": ["./custom-plugin.ts"],
  "rules": {
    "custom/rule-name": "warn"
  }
}
```

通过给 JS 插件设置别名，将内置的 Rust 插件与同名的 JS 插件一起使用。

```json
{
  "plugins": ["import"],
  "jsPlugins": [
    {
      "name": "import-js",
      "specifier": "eslint-plugin-import"
    }
  ],
  "rules": {
    "import/no-cycle": "error",
    "import-js/no-unresolved": "warn"
  }
}
```

### jsPlugins[n]

类型：`object | string`

#### jsPlugins[n].name

类型：`string`

插件的自定义名称/别名。

注意：以下插件名称被保留，因为它们在 oxlint 中是以 Rust 原生实现的，不能用于 JS 插件：

- react (includes react-hooks)
- unicorn
- typescript (includes @typescript-eslint)
- oxc
- import (includes import-x)
- jsdoc
- jest
- vitest
- jsx-a11y (includes jsx-a11y-x)
- nextjs
- react-perf
- promise
- node
- vue
- eslint

如果你需要使用其中任何插件的 JavaScript 版本，请提供自定义别名以避免冲突。

#### jsPlugins[n].specifier

类型：`string`

插件的路径或包名

## options

类型：`object`

Oxlint 配置选项。

供 lint 工具使用的选项。

### options.denyWarnings

类型：`boolean`

确保警告产生非零退出代码。

等同于在 CLI 上传递 `--deny-warnings`。

### options.maxWarnings

类型：`integer`

指定警告阈值。如果警告超过此值，则以错误状态退出。

等同于在 CLI 上传递 `--max-warnings`。

### options.reportUnusedDisableDirectives

类型：`"allow" | "off" | "warn" | "error" | "deny" | integer`

报告未使用的禁用指令（例如 `// oxlint-disable-line` 或 `// eslint-disable-line`）。

等同于在 CLI 上传递 `--report-unused-disable-directives-severity`。
当两者都设置时，CLI 标志优先于此值。
仅在根配置文件中支持。

### options.respectEslintDisableDirectives

类型：`boolean`

除了其原生 `oxlint-*` 指令外，oxlint 是否应遵守 `eslint-disable*` 和 `eslint-enable*`
指令。

默认值为 `true`。
仅在根配置文件中支持。

### options.typeAware

类型：`boolean`

启用需要类型信息的规则。

等同于在 CLI 上传递 `--type-aware`。

注意，这需要安装 `oxlint-tsgolint` 包。

### options.typeCheck

类型：`boolean`

启用实验性类型检查（包括 TypeScript 编译器诊断）。

等同于在 CLI 上传递 `--type-check`。

注意，这需要安装 `oxlint-tsgolint` 包。

## overrides

类型：`array`

为特定文件或文件组添加、移除或以其他方式重新配置规则。

### overrides[n]

类型：`object`

#### overrides[n].env

类型：`object`

环境用于启用和禁用全局变量集合。

#### overrides[n].files

类型：`string[]`

要覆盖的一组 glob 模式。

## 示例

`[ "*.test.ts", "*.spec.ts" ]`

一组 glob 模式。
模式会与相对于配置文件目录的路径进行匹配。

#### overrides[n].globals

类型：`object`

启用或禁用特定的全局变量。

#### overrides[n].jsPlugins

类型：`array`

此覆盖的 JS 插件，允许在 Oxlint 中使用 ESLint 插件。

在 [文档](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) 中了解更多关于 JS 插件的信息。

注意：JS 插件处于 alpha 阶段，不受语义版本控制约束。

##### overrides[n].jsPlugins[n]

类型：`object | string`

###### overrides[n].jsPlugins[n].name

类型：`string`

插件的自定义名称/别名。

注意：以下插件名称被保留，因为它们在 oxlint 中是以 Rust 原生实现的，不能用于 JS 插件：

- react (includes react-hooks)
- unicorn
- typescript (includes @typescript-eslint)
- oxc
- import (includes import-x)
- jsdoc
- jest
- vitest
- jsx-a11y (includes jsx-a11y-x)
- nextjs
- react-perf
- promise
- node
- vue
- eslint

如果你需要使用其中任何插件的 JavaScript 版本，请提供自定义别名以避免冲突。

###### overrides[n].jsPlugins[n].specifier

类型：`string`

插件的路径或包名

#### overrides[n].plugins

类型：`array`

默认值：`null`

可选地更改为此覆盖启用的插件。省略时，使用基础配置的插件。

##### overrides[n].plugins[n]

类型：`"eslint" | "react" | "unicorn" | "typescript" | "oxc" | "import" | "jsdoc" | "jest" | "vitest" | "jsx-a11y" | "nextjs" | "react-perf" | "promise" | "node" | "vue"`

#### overrides[n].rules

类型：`object`

请参阅 [Oxlint 规则](https://oxc.rs/docs/guide/usage/linter/rules.html)

## plugins

类型：`array`

默认值：`null`

为 Oxlint 启用的内置插件。
你可以在 [网站](https://oxc.rs/docs/guide/usage/linter/plugins.html#supported-plugins) 上查看可用插件列表。

注意：设置 `plugins` 字段将覆盖基础插件集。`plugins` 数组应反映你想要使用的所有插件。

### plugins[n]

类型：`"eslint" | "react" | "unicorn" | "typescript" | "oxc" | "import" | "jsdoc" | "jest" | "vitest" | "jsx-a11y" | "nextjs" | "react-perf" | "promise" | "node" | "vue"`

## rules

类型：`object`

示例

`.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "rules": {
    "eqeqeq": "warn",
    "import/no-cycle": "error",
    "prefer-const": [
      "error",
      {
        "ignoreReadBeforeAssign": true
      }
    ]
  }
}
```

请参阅 [Oxlint 规则](https://oxc.rs/docs/guide/usage/linter/rules.html) 获取规则列表。

请参阅 [Oxlint 规则](https://oxc.rs/docs/guide/usage/linter/rules.html)

## settings

类型：`object`

适用于内置和自定义插件的特定插件配置。
这包括 `react` 和 `jsdoc` 等内置插件的设置，
以及通过 `jsPlugins` 加载的 JS 自定义插件的设置。

配置 lint 工具插件的行为。

如果你在 monorepo 中使用 Next.js，这是一个示例：

```json
{
  "settings": {
    "next": {
      "rootDir": "apps/dashboard/"
    },
    "react": {
      "linkComponents": [
        {
          "name": "Link",
          "linkAttribute": "to"
        }
      ]
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

### settings.jest

类型：`object`

配置 Jest 插件规则。

请参阅 [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) 的配置以获取完整参考。

#### settings.jest.version

类型：`integer | string`

默认值：`null`

Jest 版本——接受数字（`29`）或 semver 字符串（`"29.1.0"` 或 `"v29.1.0"`），只保存主版本号。
::: warning
使用此配置将覆盖已设置的 `no-deprecated-functions` 配置集。
:::

### settings.jsdoc

类型：`object`

#### settings.jsdoc.augmentsExtendsReplacesDocs

类型：`boolean`

默认值：`false`

仅适用于 `require-(yields|returns|description|example|param|throws)` 规则

#### settings.jsdoc.exemptDestructuredRootsFromChecks

类型：`boolean`

默认值：`false`

仅适用于 `require-param-type` 和 `require-param-description` 规则

#### settings.jsdoc.ignoreInternal

类型：`boolean`

默认值：`false`

适用于所有规则，但不适用于 `empty-tags` 规则

#### settings.jsdoc.ignorePrivate

类型：`boolean`

默认值：`false`

适用于所有规则，但不适用于 `check-access` 和 `empty-tags` 规则

#### settings.jsdoc.ignoreReplacesDocs

类型：`boolean`

默认值：`true`

仅适用于 `require-(yields|returns|description|example|param|throws)` 规则

#### settings.jsdoc.implementsReplacesDocs

类型：`boolean`

默认值：`false`

仅适用于 `require-(yields|returns|description|example|param|throws)` 规则

#### settings.jsdoc.overrideReplacesDocs

类型：`boolean`

默认值：`true`

仅适用于 `require-(yields|returns|description|example|param|throws)` 规则

#### settings.jsdoc.tagNamePreference

类型：`object`

默认值：`{}`

### settings.jsx-a11y

类型：`object`

配置 JSX A11y 插件规则。

请参阅 [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#configurations) 的配置以获取完整参考。

#### settings.jsx-a11y.attributes

类型：`Record<string, array>`

默认值：`{}`

属性名称到其 DOM 等效项的映射。这对于使用不同属性名称的非 React 框架很有用。

示例：

```json
{
  "settings": {
    "jsx-a11y": {
      "attributes": {
        "for": ["htmlFor", "for"]
      }
    }
  }
}
```

#### settings.jsx-a11y.components

类型：`Record<string, string>`

默认值：`{}`

为了让你的自定义组件作为 DOM 元素进行检查，你可以提供组件名称到 DOM 元素名称的映射。

示例：

```json
{
  "settings": {
    "jsx-a11y": {
      "components": {
        "Link": "a",
        "IconButton": "button"
      }
    }
  }
}
```

#### settings.jsx-a11y.polymorphicPropName

类型：`string`

一个可选设置，定义你的代码用于创建多态组件的属性。此设置将用于确定需要语义上下文的规则中的元素类型。

例如，如果你将 `polymorphicPropName` 设置为 `as`，则此元素：

```jsx
<Box as="h3">Hello</Box>
```

将被视为 `h3`。如果未设置，此组件将被视为 `Box`。

### settings.next

类型：`object`

配置 Next.js 插件规则。

#### settings.next.rootDir

类型：`array | string`

Next.js 项目的根目录。

当你的 monorepo 中的 Next.js 项目位于子文件夹时，这一点尤其有用。

示例：

```json
{
  "settings": {
    "next": {
      "rootDir": "apps/dashboard/"
    }
  }
}
```

##### settings.next.rootDir[n]

类型：`string`

### settings.react

类型：`object`

配置 React 插件规则。

源自 [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc-)

#### settings.react.componentWrapperFunctions

类型：`string[]`

默认值：`[]`

包装 React 组件并应被视为 HOC 的函数。

示例：

```jsonc
{
  "settings": {
    "react": {
      "componentWrapperFunctions": ["observer", "withRouter"],
    },
  },
}
```

#### settings.react.formComponents

类型：`array`

默认值：`[]`

用作 `<form>` 替代方案的表单组件，例如 `<Formik>`。

示例：

```jsonc
{
  "settings": {
    "react": {
      "formComponents": [
        "CustomForm",
        // 其他表单被视为表单组件并具有一个 endpoint 属性
        { "name": "OtherForm", "formAttribute": "endpoint" },
        // 允许在必要时指定多个属性
        { "name": "Form", "formAttribute": ["registerEndpoint", "loginEndpoint"] },
      ],
    },
  },
}
```

##### settings.react.formComponents[n]

类型：`object | string`

###### settings.react.formComponents[n].attribute

类型：`string`

###### settings.react.formComponents[n].name

类型：`string`

#### settings.react.linkComponents

类型：`array`

默认值：`[]`

用作 `<a>` 替代方案的链接组件，例如 `<Link>`。

示例：

```jsonc
{
  "settings": {
    "react": {
      "linkComponents": [
        "HyperLink",
        // 对于使用与 `href` 不同属性名称的组件，使用 `linkAttribute`。
        { "name": "MyLink", "linkAttribute": "to" },
        // 允许在必要时指定多个属性
        { "name": "Link", "linkAttribute": ["to", "href"] },
      ],
    },
  },
}
```

##### settings.react.linkComponents[n]

类型：`object | string`

###### settings.react.linkComponents[n].attribute

类型：`string`

###### settings.react.linkComponents[n].name

类型：`string`

#### settings.react.version

类型：`string`

默认值：`null`

用于特定版本规则的 React 版本。

接受语义化版本（例如，"18.2.0", "17.0"）。

示例：

```jsonc
{
  "settings": {
    "react": {
      "version": "18.2.0",
    },
  },
}
```

### settings.vitest

类型：`object`

配置 Vitest 插件规则。

请参阅 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest) 的配置以获取完整参考。

#### settings.vitest.typecheck

类型：`boolean`

默认值：`false`

是否为 Vitest 规则启用 typecheck 模式。启用后，某些规则将跳过对 describe 块的某些检查，以适应 TypeScript 类型检查场景。
