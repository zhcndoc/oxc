# 不支持的功能

:::info
这些功能已在计划中。请关注我们的 [里程碑](https://github.com/oxc-project/oxc/milestone/19)。
:::

## 配置限制

目前不支持：

- `package.json` 中的 `prettier` 字段
- 子目录中的嵌套配置
- 子目录中的嵌套 `.editorconfig`
- `experimentalTernaries` 和 `experimentalOperatorPosition` 选项

注意：默认 `printWidth` 为 `100`（Prettier 使用 `80`）。

## Prettier 插件

不支持。但是，Oxfmt 提供了内置的替代方案：

- `sortImports`
  - 基于 `eslint-plugin-perfectionist/sort-imports`
  - 默认禁用
- `sortTailwindcss`
  - 基于 `prettier-plugin-tailwindcss`
  - 默认禁用
- `sortPackageJson`
  - 基于 `prettier-plugin-packagejson`
  - 默认启用
- `jsdoc`
  - 基于 `prettier-plugin-jsdoc`
  - 默认禁用

详见 [配置文件参考](./config-file-reference)。

关于 Oxfmt 在不同框架和文件类型中支持的内容，请参阅 [兼容性矩阵](/compatibility)。
