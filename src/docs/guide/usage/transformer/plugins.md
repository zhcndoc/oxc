# 内置插件

Oxc transformer 包含对热门转换插件的内置支持，以改善开发者体验和构建性能。

## Tagged Template Escape

启用后，标记模板字面量中的 `</script>` 序列会被转义，以防止浏览器过早关闭外层的 `<script>` 标签。这可以避免当 JavaScript 直接嵌入 HTML 时出现解析错误以及潜在的 XSS 漏洞。

::: tip 推荐
当转换后的输出可能直接嵌入 HTML `<script>` 标签时，请启用此选项。否则，包含 `</script>` 的标记模板字面量在嵌入 HTML `<script>` 标签时可能会出错。详情请参见 [oxc-project/oxc#15306](https://github.com/oxc-project/oxc/issues/15306)。
:::

```javascript
import { transform } from "oxc-transform";

const result = await transform("lib.js", sourceCode, {
  plugins: {
    taggedTemplateEscape: true,
  },
});
```

例如，`` foo`</script>` `` 会被转换为一个辅助函数调用，其中 `</script>` 序列会被转义为 `<\/script>`。

## Styled Components

styled-components 插件为 styled-components 提供了全面支持，包括服务器端渲染、样式压缩以及增强的调试能力。

### 基本用法

```javascript
import { transform } from "oxc-transform";

const result = await transform("Component.jsx", sourceCode, {
  plugins: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      minify: true,
    },
  },
});
```

### 示例

**输入：**

```jsx
import styled from "styled-components";

const Button = styled.div`
  color: blue;
  padding: 10px;
`;
```

**输出（使用默认选项）：**

```jsx
import styled from "styled-components";

const Button = styled.div.withConfig({
  displayName: "Button",
  componentId: "sc-1234567-0",
})(["color:blue;padding:10px;"]);
```

### 配置选项

#### 核心选项

| 选项          | 类型      | 默认值 | 描述                                                                         |
| ------------- | --------- | ------ | ---------------------------------------------------------------------------- |
| `displayName` | `boolean` | `true` | 使用组件名称增强附加的 CSS 类名，便于调试                                      |
| `ssr`         | `boolean` | `true` | 添加唯一的组件 ID，以避免服务端渲染期间的校验和不匹配                            |
| `fileName`    | `boolean` | `true` | 控制 displayName 是否以前缀文件名的形式显示                                   |

#### 模板字面量选项

| 选项                        | 类型      | 默认值 | 描述                                                                    |
| --------------------------- | --------- | ------ | ---------------------------------------------------------------------- |
| `transpileTemplateLiterals` | `boolean` | `true` | 将模板字面量转换为更小的表示形式，以减小包体积                           |
| `minify`                    | `boolean` | `true` | 通过移除空白字符和注释来压缩 CSS 内容                                     |

#### 高级选项

| 选项                   | 类型       | 默认值        | 描述                                                   |
| ---------------------- | ---------- | ------------ | ------------------------------------------------------ |
| `pure`                 | `boolean`  | `false`      | 添加 `/*#__PURE__*/` 注释，以获得更好的 tree-shaking 效果 |
| `namespace`            | `string`   | `undefined`  | 为组件 ID 添加命名空间前缀                              |
| `meaninglessFileNames` | `string[]` | `["index"]` | 被视为对组件命名无意义的文件名列表                        |

#### 尚未实现

| 选项                 | 类型       | 默认值 | 描述                           |
| ---------------------- | ---------- | ------ | -------------------------------- |
| `cssProp`             | `boolean`  | `true` | JSX css prop 转换（计划中）       |
| `topLevelImportPaths` | `string[]` | `[]`   | 自定义导入路径处理（计划中）      |

### 支持的导入模式

该插件支持多种 styled-components 导入模式：

```javascript
// 默认导入
import styled from "styled-components";

// 命名空间导入
import * as styled from "styled-components";

// 命名导入
import { createGlobalStyle, css, keyframes } from "styled-components";

// 原生组件和基础组件
import styled from "styled-components/native";
import styled from "styled-components/primitives";
```

### 功能

**✅ 完全支持：**

- 用于调试的 display name
- display name 中的文件名前缀
- 服务端渲染支持
- 模板字面量转换
- CSS 压缩
- 命名空间前缀
- 函数调用表达式的纯注解

**⚠️ 部分支持：**

- 纯注解（仅限函数调用表达式，不支持标记模板，因打包器限制）

**❌ 尚未实现：**

- JSX css prop 转换
- 自定义导入路径处理
