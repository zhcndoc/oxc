# 排序

Oxfmt 包含用于导入、Tailwind 类和 package.json 的排序功能。

- [排序导入](#sort-imports)
- [排序 Tailwind CSS 类](#sort-tailwind-css-classes)
- [排序 package.json 字段](#sort-package-json-fields)

详见 [配置文件参考](./config-file-reference)。

## 排序导入

基于 [eslint-plugin-perfectionist/sort-imports](https://perfectionist.dev/rules/sort-imports)。

默认禁用。

### 配置示例

与 `eslint-plugin-perfectionist/sort-imports` 默认顺序相同。

```json [.oxfmtrc.json]
{
  "sortImports": {
    "groups": [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown"
    ]
  }
}
```

在顶层使用 `"newlinesBetween": false` 禁用组之间的换行，然后在 `groups` 内使用 `{ "newlinesBetween": true }` 在特定点插入换行。

```json [.oxfmtrc.json]
{
  "sortImports": {
    "newlinesBetween": false,
    "groups": [
      ["value-builtin", "value-external"],
      ["value-internal", "value-parent", "value-sibling", "value-index"],
      { "newlinesBetween": true },
      "type-import",
      "unknown"
    ]
  }
}
```

使用 `customGroups` 定义你自己的组以匹配特定的导入。每个自定义组都有一个 `groupName`，可以在 `groups` 中引用。`elementNamePattern` 接受 glob 模式来匹配导入源。

```json [.oxfmtrc.json]
{
  "sortImports": {
    "customGroups": [
      {
        "groupName": "react-libs",
        "elementNamePattern": ["react", "react-**"]
      }
    ],
    "groups": [
      "react-libs",
      ["value-builtin", "value-external"],
      "value-internal",
      ["value-parent", "value-sibling", "value-index"],
      "unknown"
    ]
  }
}
```

## 排序 Tailwind CSS 类

排序 Tailwind 工具类。

基于 [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)。

默认禁用。

### 配置示例

```json [.oxfmtrc.json]
{
  "sortTailwindcss": {
    "stylesheet": "./path/to/stylesheet.css",
    "functions": ["clsx", "cn"],
    "preserveWhitespace": true
  }
}
```

不支持 `attributes` 和 `functions` 的正则模式。

## 排序 package.json 字段

使用预设的顺序排序 `package.json` 中的键。

详见 [字段顺序](https://github.com/oxc-project/sort-package-json?tab=readme-ov-file#field-ordering)。

默认启用。

### 配置示例

禁用：

```json [.oxfmtrc.json]
{
  "sortPackageJson": false
}
```

按字母顺序排序 `scripts`：

```json [.oxfmtrc.json]
{
  "sortPackageJson": {
    "sortScripts": true
  }
}
```
