# 嵌入式格式化

格式化嵌入在 JS/TS 文件中的代码（模板字面量中的 CSS、模板字面量中的 GraphQL、Markdown 中的 JavaScript/TypeScript/CSS 等）。

## 配置

::: code-group

```json [.oxfmtrc.json]
{
  "embeddedLanguageFormatting": "auto"
}
```

```ts [oxfmt.config.ts]
import { defineConfig } from "oxfmt";

export default defineConfig({
  embeddedLanguageFormatting: "auto",
});
```

:::

### 取值

- `"auto"` —（默认）格式化嵌入部分
- `"off"` — 跳过嵌入式格式化

## 示例

标签模板字面量中的 CSS：

```js
const styles = css`
  .container {
    background: blue;
    color: ${theme.color};
  }
`;
```

Styled-components：

```js
const Button = styled.button`
  background: ${(props) => props.primary};
  color: white;
`;
```

Styled JSX：

```jsx
<style jsx>{`
  .container {
    background: blue;
    color: red;
  }
`}</style>
```

标签模板字面量中的 GraphQL：

```js
const query = gql`
  query {
    user {
      id
      name
    }
  }
`;

const query2 = graphql(`
  query {
    user {
      id
      name
    }
  }
  ${fragments.all}
`);
```

标签模板字面量中的 HTML：

```js
const template = html`
  <div class="container">
    <h1>Hello</h1>
    <p>${world}</p>
  </div>
`;
```

Markdown 文件中的 JavaScript 代码块：

````md
This is an example Markdown file with JavaScript code blocks:

```js
const x = 1; // 如果启用了嵌入式格式化，这将被格式化。
```

Wow!
````

Vue 文件中的 JavaScript 和 CSS：

```vue
<script setup>
import { ref } from "vue";
import MyComponent from "./MyComponent.vue";
</script>

<style>
.container {
  background: blue;
  color: red;
}
</style>
```
