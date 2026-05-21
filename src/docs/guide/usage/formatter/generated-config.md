---
search: false
---

# Oxfmt 的配置选项。

大多数选项与 Prettier 的选项相同，但并非全部。
此外，有些选项是我们自己的扩展。

## arrowParens

类型：`"always" | "avoid"`

在唯一的箭头函数参数周围包含括号。

- 默认：`"always"`

## bracketSameLine

类型：`boolean`

将多行 HTML（HTML、JSX、Vue、Angular）元素的 `>` 放在最后一行的末尾，
而不是单独放在下一行（不适用于自闭合元素）。

- 默认：`false`

## bracketSpacing

类型：`boolean`

在对象字面量的括号之间打印空格。

- 默认：`true`

## embeddedLanguageFormatting

类型：`"auto" | "off"`

控制是否格式化文件中嵌入的部分（例如，CSS-in-JS 或 JS-in-Vue 等）。

注意：XXX-in-JS 支持尚不完整。

- 默认：`auto`

## endOfLine

类型：`"lf" | "crlf" | "cr"`

应用哪种行尾字符。

注意：不支持 `"auto"`。

- 默认：`"lf"`
- 覆盖 `.editorconfig.end_of_line`

## htmlWhitespaceSensitivity

类型：`"css" | "strict" | "ignore"`

指定 HTML、Vue、Angular 和 Handlebars 的全局空白敏感度。

- 默认：`"css"`

## ignorePatterns

类型：`string[]`

忽略匹配这些 glob 模式的文件。
模式基于 Oxfmt 配置文件的位置。

- 默认：`[]`

## insertFinalNewline

类型：`boolean`

是否在文件末尾插入最终换行符。

- 默认：`true`
- 覆盖 `.editorconfig.insert_final_newline`

## jsdoc

类型：`object | boolean`

启用 JSDoc 注释格式化。

启用时，JSDoc 注释会被标准化和重新格式化：
标签别名被规范化，描述首字母大写，
长行被换行，短注释被折叠为单行。

传递 `true` 或对象以使用默认值启用，或省略/设置 `false` 以禁用。

- 默认：禁用

### jsdoc.addDefaultToDescription

类型：`boolean`

将默认值附加到 `@param` 描述中（例如“默认值是 `value`"）。

- 默认：`true`

### jsdoc.bracketSpacing

类型：`boolean`

在 JSDoc 类型大括号内添加空格：`{string}` → `{ string }`。

- 默认：`false`

### jsdoc.capitalizeDescriptions

类型：`boolean`

将标签描述的首字母大写。

- 默认：`true`

### jsdoc.commentLineStrategy

类型：`string`

如何格式化注释块。

- `"singleLine"` — 尽可能转换为单行 `/** content */`。
- `"multiline"` — 始终使用多行格式。
- `"keep"` — 保留原始格式。

- 默认：`"singleLine"`

### jsdoc.descriptionTag

类型：`boolean`

发出 `@description` 标签而不是内联描述。

- 默认：`false`

### jsdoc.descriptionWithDot

类型：`boolean`

在描述末尾添加尾随点。

- 默认：`false`

### jsdoc.keepUnparsableExampleIndent

类型：`boolean`

保留不可解析的 `@example` 代码中的缩进。

- 默认：`false`

### jsdoc.lineWrappingStyle

类型：`string`

在打印宽度处换行描述行的策略。

- `"greedy"` — 始终重新换行文本以适应打印宽度。
- `"balance"` — 如果所有行都适合打印宽度，则保留原始换行符。

- 默认：`"greedy"`

### jsdoc.preferCodeFences

类型：`boolean`

对于没有语言标签的代码，使用围栏代码块（` ``` `）而不是 4 空格缩进。

- 默认：`false`

### jsdoc.separateReturnsFromParam

类型：`boolean`

在最后一个 `@param` 和 `@returns` 之间添加空行。

- 默认：`false`

### jsdoc.separateTagGroups

类型：`boolean`

在不同标签组之间添加空行（例如在 `@param` 和 `@returns` 之间）。

- 默认：`false`

## jsxSingleQuote

类型：`boolean`

在 JSX 中使用单引号而不是双引号。

- 默认：`false`

## objectWrap

类型：`"preserve" | "collapse"`

当对象字面量可以适合一行或跨多行时，如何换行。

默认情况下，如果第一个属性之前有换行符，则将对象格式化为多行。
作者可以使用此启发式方法在上下文中提高可读性，尽管它有一些缺点。

- 默认：`"preserve"`

## overrides

类型：`array`

特定于文件的覆盖。
当文件匹配多个覆盖时，后面的覆盖优先（数组顺序很重要）。

- 默认：`[]`

### overrides[n]

类型：`object`

#### overrides[n].excludeFiles

类型：`string[]`

从此覆盖中排除的 Glob 模式。

一组 glob 模式。
这些模式会与相对于配置文件目录的路径进行匹配。

#### overrides[n].files

类型：`string[]`

Glob 模式，用于匹配此覆盖的文件。

一组 glob 模式。
模式会与相对于配置文件目录的路径进行匹配。

#### overrides[n].options

类型：`object`

应用于匹配文件的格式化选项。

##### overrides[n].options.arrowParens

类型：`"always" | "avoid"`

在唯一的箭头函数参数周围包含括号。

- 默认：`"always"`

##### overrides[n].options.bracketSameLine

类型：`boolean`

将多行 HTML（HTML、JSX、Vue、Angular）元素的 `>` 放在最后一行的末尾，
而不是单独放在下一行（不适用于自闭合元素）。

- 默认：`false`

##### overrides[n].options.bracketSpacing

类型：`boolean`

在对象字面量的括号之间打印空格。

- 默认：`true`

##### overrides[n].options.embeddedLanguageFormatting

类型：`"auto" | "off"`

控制是否格式化文件中嵌入的部分（例如，CSS-in-JS 或 JS-in-Vue 等）。

注意：XXX-in-JS 支持尚不完整。

- 默认：`"auto"`

##### overrides[n].options.endOfLine

类型：`"lf" | "crlf" | "cr"`

应用哪种行尾字符。

注意：不支持 `"auto"`。

- 默认：`"lf"`
- 覆盖 `.editorconfig.end_of_line`

##### overrides[n].options.htmlWhitespaceSensitivity

类型：`"css" | "strict" | "ignore"`

指定 HTML、Vue、Angular 和 Handlebars 的全局空白敏感度。

- 默认：`"css"`

##### overrides[n].options.insertFinalNewline

类型：`boolean`

是否在文件末尾插入最终换行符。

- 默认：`true`
- 覆盖 `.editorconfig.insert_final_newline`

##### overrides[n].options.jsdoc

类型：`object | boolean`

启用 JSDoc 注释格式化。

启用时，JSDoc 注释会被标准化和重新格式化：
标签别名被规范化，描述首字母大写，
长行被换行，短注释被折叠为单行。

传递 `true` 或对象以使用默认值启用，或省略/设置 `false` 以禁用。

- 默认：禁用

###### overrides[n].options.jsdoc.addDefaultToDescription

类型：`boolean`

将默认值附加到 `@param` 描述中（例如“默认值是 `value`"）。

- 默认：`true`

###### overrides[n].options.jsdoc.bracketSpacing

类型：`boolean`

在 JSDoc 类型大括号内添加空格：`{string}` → `{ string }`。

- 默认：`false`

###### overrides[n].options.jsdoc.capitalizeDescriptions

类型：`boolean`

将标签描述的首字母大写。

- 默认：`true`

###### overrides[n].options.jsdoc.commentLineStrategy

类型：`string`

如何格式化注释块。

- `"singleLine"` — 尽可能转换为单行 `/** content */`。
- `"multiline"` — 始终使用多行格式。
- `"keep"` — 保留原始格式。

- 默认：`"singleLine"`

###### overrides[n].options.jsdoc.descriptionTag

类型：`boolean`

发出 `@description` 标签而不是内联描述。

- 默认：`false`

###### overrides[n].options.jsdoc.descriptionWithDot

类型：`boolean`

在描述末尾添加尾随点。

- 默认：`false`

###### overrides[n].options.jsdoc.keepUnparsableExampleIndent

类型：`boolean`

保留不可解析的 `@example` 代码中的缩进。

- 默认：`false`

###### overrides[n].options.jsdoc.lineWrappingStyle

类型：`string`

在打印宽度处换行描述行的策略。

- `"greedy"` — 始终重新换行文本以适应打印宽度。
- `"balance"` — 如果所有行都适合打印宽度，则保留原始换行符。

- 默认：`"greedy"`

###### overrides[n].options.jsdoc.preferCodeFences

类型：`boolean`

对于没有语言标签的代码，使用围栏代码块（` ``` `）而不是 4 空格缩进。

- 默认：`false`

###### overrides[n].options.jsdoc.separateReturnsFromParam

类型：`boolean`

在最后一个 `@param` 和 `@returns` 之间添加空行。

- 默认：`false`

###### overrides[n].options.jsdoc.separateTagGroups

类型：`boolean`

在不同标签组之间添加空行（例如在 `@param` 和 `@returns` 之间）。

- 默认：`false`

##### overrides[n].options.jsxSingleQuote

类型：`boolean`

在 JSX 中使用单引号而不是双引号。

- 默认：`false`

##### overrides[n].options.objectWrap

类型：`"preserve" | "collapse"`

当对象字面量可以适合一行或跨多行时，如何换行。

默认情况下，如果第一个属性之前有换行符，则将对象格式化为多行。
作者可以使用此启发式方法在上下文中提高可读性，尽管它有一些缺点。

- 默认：`"preserve"`

##### overrides[n].options.printWidth

类型：`integer`

指定打印机换行的行长度。

如果您不想在格式化 Markdown 时换行，可以将 `proseWrap` 选项设置为禁用它。

- 默认：`100`
- 覆盖 `.editorconfig.max_line_length`

##### overrides[n].options.proseWrap

类型：`"always" | "never" | "preserve"`

如何换行散文文本。

默认情况下，格式化程序不会更改 Markdown 文本中的换行，因为某些服务使用对换行敏感的渲染器，例如 GitHub 评论和 BitBucket。
要将散文文本换行到打印宽度，将此选项更改为 "always"。
如果您想强制所有散文块位于单行并依赖编辑器/查看器软换行，可以使用 "never"。

- 默认：`"preserve"`

##### overrides[n].options.quoteProps

类型：`"as-needed" | "consistent" | "preserve"`

更改对象中属性何时被引用。

- 默认：`"as-needed"`

##### overrides[n].options.semi

类型：`boolean`

在语句末尾打印分号。

- 默认：`true`

##### overrides[n].options.singleAttributePerLine

类型：`boolean`

在 HTML、Vue 和 JSX 中强制每行单个属性。

- 默认：`false`

##### overrides[n].options.singleQuote

类型：`boolean`

使用单引号而不是双引号。

对于 JSX，您可以设置 `jsxSingleQuote` 选项。

- 默认：`false`
- 覆盖 `.editorconfig.quote_type`

##### overrides[n].options.sortImports

类型：`object | boolean`

排序 import 语句。

使用与 [eslint-plugin-perfectionist/sort-imports](https://perfectionist.dev/rules/sort-imports) 类似的算法。
详细信息请参阅每个字段的文档。

传递 `true` 或对象以使用默认值启用，或省略/设置 `false` 以禁用。

- 默认：禁用

###### overrides[n].options.sortImports.customGroups

类型：`array`

定义您自己的组以匹配非常具体的导入。

`customGroups` 列表是有序的：第一个匹配元素的定义将被使用。
自定义组比任何预定义组具有更高的优先级。

如果您希望预定义组优先于自定义组，
您必须编写一个与预定义组作用相同的自定义组定义，并将其放在列表首位。

如果您指定多个条件，如 `elementNamePattern`、`selector` 和 `modifiers`，
所有条件都必须满足才能匹配自定义组（与逻辑）。

- 默认：`[]`

####### overrides[n].options.sortImports.customGroups[n]

类型：`object`

######## overrides[n].options.sortImports.customGroups[n].elementNamePattern

类型：`string[]`

默认：`[]`

用于匹配此组导入源的 glob 模式列表。

######## overrides[n].options.sortImports.customGroups[n].groupName

类型：`string`

默认：`""`

自定义组的名称，用于 `groups` 选项。

######## overrides[n].options.sortImports.customGroups[n].modifiers

类型：`string[]`

匹配导入特征的修饰符。
所有指定的修饰符必须存在（与逻辑）。

可能的值：`"side_effect"`、`"type"`、`"value"`、`"default"`、`"wildcard"`、`"named"`

######## overrides[n].options.sortImports.customGroups[n].selector

类型：`string`

选择器以匹配导入种类。

可能的值：`"type"`、`"side_effect_style"`、`"side_effect"`、`"style"`、`"index"`、
`"sibling"`、`"parent"`、`"subpath"`、`"internal"`、`"builtin"`、`"external"`、`"import"`

###### overrides[n].options.sortImports.groups

类型：`array`

指定用于排序的预定义导入组列表。

每个导入将被分配 `groups` 选项中指定的单个组（如果未找到匹配项，则为 `unknown` 组）。
`groups` 选项中项目的顺序决定了组的排序方式。

在给定组内，成员将根据 type、order、ignoreCase 等选项进行排序。

可以通过将它们放在数组中来组合各个组。
该数组中组的顺序无关紧要。
数组中组的所有成员将一起排序，仿佛它们是单个组的一部分。

预定义组由单个选择器和潜在多个修饰符表征。
您可以按任何顺序输入修饰符，但选择器必须始终放在末尾。

选择器列表按重要性从高到低排序：

- `type` — TypeScript 类型导入。
- `side_effect_style` — 副作用样式导入。
- `side_effect` — 副作用导入。
- `style` — 样式导入。
- `index` — 当前目录的主文件。
- `sibling` — 同一目录的模块。
- `parent` — 父目录的模块。
- `subpath` — Node.js 子路径导入。
- `internal` — 您的内部模块。
- `builtin` — Node.js 内置模块。
- `external` — 项目中安装的外部模块。
- `import` — 任何导入。

修饰符列表按重要性从高到低排序：

- `side_effect` — 副作用导入。
- `type` — TypeScript 类型导入。
- `value` — 值导入。
- `default` — 包含默认说明符的导入。
- `wildcard` — 包含通配符（`* as`）说明符的导入。
- `named` — 包含至少一个命名说明符的导入。

- 默认：见下文

```json
["builtin", "external", ["internal", "subpath"], ["parent", "sibling", "index"], "style", "unknown"]
```

此外，您可以通过在 `groups` 列表中的所需位置包含 `{ "newlinesBetween": boolean }` 标记对象，来覆盖特定组边界的全局 `newlinesBetween` 设置。

####### overrides[n].options.sortImports.groups[n]

类型：`object | array | string`

######## overrides[n].options.sortImports.groups[n].newlinesBetween

类型：`boolean`

###### overrides[n].options.sortImports.ignoreCase

类型：`boolean`

指定排序是否区分大小写。

- 默认：`true`

###### overrides[n].options.sortImports.internalPattern

类型：`string[]`

指定用于识别内部导入的前缀。

这有助于区分您自己的模块与外部依赖项。

- 默认：`["~/", "@/", "#"]`

###### overrides[n].options.sortImports.newlinesBetween

类型：`boolean`

指定是否在组之间添加换行符。

当为 `false` 时，组之间不添加换行符。

- 默认：`true`

###### overrides[n].options.sortImports.order

类型：`"asc" | "desc"`

指定是按升序还是降序排序项目。

- 默认：`"asc"`

###### overrides[n].options.sortImports.partitionByComment

类型：`boolean`

启用使用注释将导入分隔为逻辑组。

当为 `true` 时，所有注释将被视为分隔符，创建分区。

```js
import { b1, b2 } from "b";
// 分区
import { a } from "a";
import { c } from "c";
```

- 默认：`false`

###### overrides[n].options.sortImports.partitionByNewline

类型：`boolean`

启用空行将导入分隔为逻辑组。

当为 `true` 时，如果导入之间有空行，格式化程序将不会对导入进行排序。
这有助于保持逻辑分离的成员组的定义顺序。

```js
import { b1, b2 } from "b";

import { a } from "a";
import { c } from "c";
```

- 默认：`false`

###### overrides[n].options.sortImports.sortSideEffects

类型：`boolean`

指定是否应对副作用导入进行排序。

默认情况下，出于安全原因，禁用副作用导入的排序。

- 默认：`false`

##### overrides[n].options.sortPackageJson

类型：`object | boolean`

排序 `package.json` 键。

该算法与 [prettier-plugin-sort-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) 不兼容。
但我们认为它更清晰且更易于导航。
详细信息请参阅每个字段的文档。

- 默认：`true`

###### overrides[n].options.sortPackageJson.sortScripts

类型：`boolean`

按字母顺序排序 `scripts` 字段。

- 默认：`false`

##### overrides[n].options.sortTailwindcss

类型：`object | boolean`

排序 Tailwind CSS 类。

使用与 [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 相同的算法。
选项名称省略了原始插件中使用的 `tailwind` 前缀（例如，`config` 而不是 `tailwindConfig`）。
详细信息请参阅每个字段的文档。

传递 `true` 或对象以使用默认值启用，或省略/设置 `false` 以禁用。

- 默认：禁用

###### overrides[n].options.sortTailwindcss.attributes

类型：`string[]`

除了 `class` 和 `className` 之外要排序的附加属性列表（精确匹配）。

注意：尚不支持正则表达式模式。

- 默认：`[]`
- 示例：`["myClassProp", ":class"]`

###### overrides[n].options.sortTailwindcss.config

类型：`string`

您的 Tailwind CSS 配置文件 (v3) 的路径。

注意：路径是相对于 Oxfmt 配置文件解析的。

- 默认：自动查找 `"tailwind.config.js"`

###### overrides[n].options.sortTailwindcss.functions

类型：`string[]`

应排序其参数的自定义函数名称列表（精确匹配）。

注意：尚不支持正则表达式模式。

- 默认：`[]`
- 示例：`["clsx", "cn", "cva", "tw"]`

###### overrides[n].options.sortTailwindcss.preserveDuplicates

类型：`boolean`

保留重复的类。

- 默认：`false`

###### overrides[n].options.sortTailwindcss.preserveWhitespace

类型：`boolean`

保留类周围的空白。

- 默认：`false`

###### overrides[n].options.sortTailwindcss.stylesheet

类型：`string`

您的 Tailwind CSS 样式表 (v4) 的路径。

注意：路径是相对于 Oxfmt 配置文件解析的。

- 默认：已安装 Tailwind CSS 的 `theme.css`

##### overrides[n].options.svelte

类型：`object | boolean`

`prettier-plugin-svelte` 的选项。

传递 `true` 或对象以启用 `.svelte` 文件格式化，
或传递 `false`（在覆盖中很方便）/省略以禁用。
设置 `true` 会重置为默认值——任何从父作用域继承的选项都会被丢弃。

注意：`prettier-plugin-svelte` 在运行时需要 `svelte` 包（`svelte/compiler`），
但 Oxfmt 不会捆绑或自动安装它。
您必须在项目中自行安装 `svelte`，否则格式化将在运行时失败。

- 默认：禁用

###### overrides[n].options.svelte.allowShorthand

类型：`boolean`

当属性名和表达式相同时，是否允许使用属性简写。

- 默认：`true`

###### overrides[n].options.svelte.indentScriptAndStyle

类型：`boolean`

是否缩进 `<script>` 和 `<style>` 标签内的代码。

- 默认：`true`

###### overrides[n].options.svelte.sortOrder

类型：`string`

Svelte 组件各部分的打印顺序。
格式：按您想要的顺序用 `-` 连接关键字 `options`、`scripts`、`markup`、`styles`；
如果您不想重新排序任何内容，则使用 `none`。

- 默认：`"options-scripts-markup-styles"`

##### overrides[n].options.tabWidth

类型：`integer`

指定每个缩进级别的空格数。

- 默认：`2`
- 覆盖 `.editorconfig.indent_size`（回退到 `.editorconfig.tab_width`）

##### overrides[n].options.trailingComma

类型：`"all" | "es5" | "none"`

在多行逗号分隔的语法结构中尽可能打印尾随逗号。

例如，单行数组永远不会获得尾随逗号。

- 默认：`"all"`

##### overrides[n].options.useTabs

类型：`boolean`

使用制表符而不是空格缩进行。

- 默认：`false`
- 覆盖 `.editorconfig.indent_style`

##### overrides[n].options.vueIndentScriptAndStyle

类型：`boolean`

是否缩进 Vue 文件中 `<script>` 和 `<style>` 标签内的代码。

- 默认：`false`

## printWidth

类型：`integer`

指定打印时的行长度。

如果您不想在格式化 Markdown 时进行换行，可以将 `proseWrap` 选项设为禁用来关闭它。

- 默认值：`100`
- 覆盖 `.editorconfig.max_line_length`

## proseWrap

类型：`"always" | "never" | "preserve"`

如何包裹文本。

默认情况下，格式化器不会更改 Markdown 文本中的换行，因为某些服务使用对换行敏感的渲染器，例如 GitHub 评论和 BitBucket。
要将文本换行到打印宽度，请将此选项更改为 `"always"`。
如果您希望强制所有文本块位于单行，并依赖编辑器/查看器的软换行，可以使用 `"never"`。

- 默认值：`"preserve"`

## quoteProps

类型：`"as-needed" | "consistent" | "preserve"`

更改对象中属性何时加引号。

- 默认值：`"as-needed"`

## semi

类型：`boolean`

在语句末尾打印分号。

- 默认值：`true`

## singleAttributePerLine

类型：`boolean`

在 HTML、Vue 和 JSX 中强制每行单个属性。

- 默认值：`false`

## singleQuote

类型：`boolean`

使用单引号代替双引号。

对于 JSX，您可以设置 `jsxSingleQuote` 选项。

- 默认值：`false`
- 覆盖 `.editorconfig.quote_type`

## sortImports

类型：`object | boolean`

排序 import 语句。

使用与 [eslint-plugin-perfectionist/sort-imports](https://perfectionist.dev/rules/sort-imports) 类似的算法。
详细信息，请参阅每个字段的文档。

传递 `true` 或对象以启用并使用默认值，或省略/设置为 `false` 以禁用。

- 默认值：禁用

### sortImports.customGroups

类型：`array`

定义您自己的组以匹配非常具体的导入。

`customGroups` 列表是有序的：将使用第一个匹配元素的定义。
自定义组比任何预定义组具有更高的优先级。

如果您希望预定义组优先于自定义组，
您必须编写一个与预定义组作用相同的自定义组定义，并将其放在列表的最前面。

如果您指定了多个条件，如 `elementNamePattern`、`selector` 和 `modifiers`，
则所有条件都必须满足才能匹配自定义组（与逻辑）。

- 默认值：`[]`

#### sortImports.customGroups[n]

类型：`object`

##### sortImports.customGroups[n].elementNamePattern

类型：`string[]`

默认值：`[]`

用于匹配此组导入源的 glob 模式列表。

##### sortImports.customGroups[n].groupName

类型：`string`

默认值：`""`

自定义组的名称，在 `groups` 选项中使用。

##### sortImports.customGroups[n].modifiers

类型：`string[]`

用于匹配导入特征的修饰符。
所有指定的修饰符都必须存在（与逻辑）。

可能的值：`"side_effect"`、`"type"`、`"value"`、`"default"`、`"wildcard"`、`"named"`

##### sortImports.customGroups[n].selector

类型：`string`

用于匹配导入种类的选择器。

可能的值：`"type"`、`"side_effect_style"`、`"side_effect"`、`"style"`、`"index"`、
`"sibling"`、`"parent"`、`"subpath"`、`"internal"`、`"builtin"`、`"external"`、`"import"`

### sortImports.groups

类型：`array`

指定用于排序的预定义导入组列表。

每个导入将被分配一个在 groups 选项中指定的单一组（如果未找到匹配项，则为 `unknown` 组）。
`groups` 选项中项目的顺序决定了组的排序方式。

在给定组内，成员将根据 type、order、ignoreCase 等选项进行排序。

可以通过将单个组放在数组中将它们组合在一起。
该数组中组的顺序无关紧要。
数组中组的所有成员将一起排序，就像它们是单个组的一部分一样。

预定义组的特征在于单个选择器和潜在多个修饰符。
您可以按任何顺序输入修饰符，但选择器必须始终放在最后。

选择器列表按重要性从高到低排序：

- `type` — TypeScript 类型导入。
- `side_effect_style` — 副作用样式导入。
- `side_effect` — 副作用导入。
- `style` — 样式导入。
- `index` — 当前目录的主文件。
- `sibling` — 同一目录的模块。
- `parent` — 父目录的模块。
- `subpath` — Node.js 子路径导入。
- `internal` — 您的内部模块。
- `builtin` — Node.js 内置模块。
- `external` — 项目中安装的外部模块。
- `import` — 任何导入。

修饰符列表按重要性从高到低排序：

- `side_effect` — 副作用导入。
- `type` — TypeScript 类型导入。
- `value` — 值导入。
- `default` — 包含默认说明符的导入。
- `wildcard` — 包含通配符（`* as`）说明符的导入。
- `named` — 包含至少一个命名说明符的导入。

- 默认值：见下文

```json
["builtin", "external", ["internal", "subpath"], ["parent", "sibling", "index"], "style", "unknown"]
```

此外，您可以通过在 `groups` 列表中的所需位置包含 `{ "newlinesBetween": boolean }` 标记对象，
来覆盖特定组边界的全局 `newlinesBetween` 设置。

#### sortImports.groups[n]

类型：`object | array | string`

##### sortImports.groups[n].newlinesBetween

类型：`boolean`

### sortImports.ignoreCase

类型：`boolean`

指定排序是否区分大小写。

- 默认值：`true`

### sortImports.internalPattern

类型：`string[]`

指定用于识别内部导入的前缀。

这对于区分您自己的模块和外部依赖项很有用。

- 默认值：`["~/", "@/", "#"]`

### sortImports.newlinesBetween

类型：`boolean`

指定是否在组之间添加空行。

当为 `false` 时，组之间不添加空行。

- 默认值：`true`

### sortImports.order

类型：`"asc" | "desc"`

指定按升序还是降序排序项目。

- 默认值：`"asc"`

### sortImports.partitionByComment

类型：`boolean`

启用使用注释将导入分隔为逻辑组。

当为 `true` 时，所有注释都将被视为分隔符，创建分区。

```js
import { b1, b2 } from "b";
// 分区
import { a } from "a";
import { c } from "c";
```

- 默认值：`false`

### sortImports.partitionByNewline

类型：`boolean`

启用空行将导入分隔为逻辑组。

当为 `true` 时，如果导入之间有空行，格式化器将不会排序导入。
这有助于保持逻辑上分离的成员组的定义顺序。

```js
import { b1, b2 } from "b";

import { a } from "a";
import { c } from "c";
```

- 默认值：`false`

### sortImports.sortSideEffects

类型：`boolean`

指定是否应对副作用导入进行排序。

默认情况下，出于安全原因，排序副作用导入是禁用的。

- 默认值：`false`

## sortPackageJson

类型：`object | boolean`

排序 `package.json` 键。

该算法与 [prettier-plugin-sort-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) 不兼容。
但我们认为它更清晰且更易于导航。
详细信息，请参阅每个字段的文档。

- 默认值：`true`

### sortPackageJson.sortScripts

类型：`boolean`

按字母顺序排序 `scripts` 字段。

- 默认值：`false`

## sortTailwindcss

类型：`object | boolean`

排序 Tailwind CSS 类。

使用与 [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 相同的算法。
选项名称省略了原始插件中使用的 `tailwind` 前缀（例如，`config` 而不是 `tailwindConfig`）。
详细信息，请参阅每个字段的文档。

传递 `true` 或对象以启用并使用默认值，或省略/设置为 `false` 以禁用。

- 默认值：禁用

### sortTailwindcss.attributes

类型：`string[]`

除了 `class` 和 `className`（精确匹配）之外，要排序的附加属性列表。

注意：尚不支持正则表达式模式。

- 默认值：`[]`
- 示例：`["myClassProp", ":class"]`

### sortTailwindcss.config

类型：`string`

您的 Tailwind CSS 配置文件（v3）的路径。

注意：路径是相对于 Oxfmt 配置文件解析的。

- 默认值：自动查找 `"tailwind.config.js"`

### sortTailwindcss.functions

类型：`string[]`

应排序其参数的自定义函数名称列表（精确匹配）。

注意：尚不支持正则表达式模式。

- 默认值：`[]`
- 示例：`["clsx", "cn", "cva", "tw"]`

### sortTailwindcss.preserveDuplicates

类型：`boolean`

保留重复的类。

- 默认值：`false`

### sortTailwindcss.preserveWhitespace

类型：`boolean`

保留类周围的空白。

- 默认值：`false`

### sortTailwindcss.stylesheet

类型：`string`

您的 Tailwind CSS 样式表（v4）的路径。

注意：路径是相对于 Oxfmt 配置文件解析的。

- 默认值：已安装 Tailwind CSS 的 `theme.css`

## svelte

类型：`object | boolean`

prettier-plugin-svelte 的选项。

传递 `true` 或对象可启用 `.svelte` 文件格式化，
或传递 `false`（在覆盖中很方便）/省略以禁用。
设置为 `true` 会重置为默认值——从父作用域继承的任何选项都会被丢弃。

注意：`prettier-plugin-svelte` 在运行时需要 `svelte` 包（`svelte/compiler`），
但 Oxfmt 不会捆绑或自动安装它。
您必须在项目中自行安装 `svelte`，否则格式化将在运行时失败。

- 默认值：已禁用

### svelte.allowShorthand

类型：`boolean`

当属性名称和表达式相同时，是否允许使用属性简写。

- 默认值：`true`

### svelte.indentScriptAndStyle

类型：`boolean`

是否缩进 `<script>` 和 `<style>` 标签内的代码。

- 默认值：`true`

### svelte.sortOrder

类型：`string`

Svelte 组件各部分的打印顺序。
格式：按您希望的顺序用 `-` 连接关键字 `options`、`scripts`、`markup`、`styles`；
如果您不想重新排序任何内容，则使用 `none`。

- 默认值：`"options-scripts-markup-styles"`

## tabWidth

类型：`integer`

指定每个缩进级别的空格数。

- 默认值：`2`
- 覆盖 `.editorconfig.indent_size`（回退到 `.editorconfig.tab_width`）

## trailingComma

类型：`"all" | "es5" | "none"`

在多行逗号分隔的语法结构中，尽可能打印尾随逗号。

例如，单行数组永远不会带有尾随逗号。

- 默认值：`"all"`

## useTabs

类型：`boolean`

使用制表符而不是空格进行缩进。

- 默认值：`false`
- 覆盖 `.editorconfig.indent_style`

## vueIndentScriptAndStyle

类型：`boolean`

是否缩进 Vue 文件中 `<script>` 和 `<style>` 标签内的代码。

- 默认值：`false`
