---
title: "react/jsx-curly-brace-presence | Oxlint"
rule: "react/jsx-curly-brace-presence"
category: "Style"
version: "0.7.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_curly_brace_presence.rs`;
</script>

<RuleHeader />

### 它的作用

当仅使用字面量就足够时，禁止不必要的 JSX 表达式；或者在 JSX 子元素或属性中的字面量上强制使用 JSX 表达式。

此规则允许你强制使用大括号，或者禁止在 JSX props 和/或子元素中使用不必要的大括号。

对于 JSX 表达式不必要的情况，请参阅
[React 文档](https://react.dev/learn/writing-markup-with-jsx)
以及[这篇关于 JSX
陷阱的页面](https://github.com/facebook/react/blob/v15.4.0-rc.3/docs/docs/02.3-jsx-gotchas.md#html-entities)。

### 为什么这不好？

在 JSX 代码中使用不同的风格会让它更难阅读，
也不够一致。

代码一致性可以提升可读性。通过强制或禁止在 JSX props 和/或子元素中使用大括号，此规则有助于在你的应用中保持一致的模式。

### 规则详情

默认情况下，此规则会检查并警告 JSX props 和子元素中不必要的大括号。出于向后兼容的考虑，默认不会考虑 JSX 元素类型的 prop 值。

你可以传入选项，强制 JSX props、子元素、作为 JSX 元素的 JSX prop 值，或者这三者的任意组合中使用大括号。对于禁止不必要的大括号以及忽略检查，同样提供了相同的选项。

**注意**：强烈建议你使用对象来配置此规则，并将 "propElementValues" 设置为 "always"。允许省略 JSX 元素类型 prop 值周围大括号的能力非常隐晦，而且是刻意不文档化的，不应依赖它。

#### 配置示例

```jsonc
{
  "rules": {
    "react/jsx-curly-brace-presence": ["error", { "props": <string>, "children": <string>, "propElementValues": <string> }]
  }
}
```

或者也可以

```jsonc
{
  "rules": {
    "react/jsx-curly-brace-presence": ["error", "always"], // 或 "never" 或 "ignore"
  },
}
```

### 修复详情

如果传入了用于修复的选项，样式违规将按以下方式修复

- `always`：将 JSX 属性用大括号/JSX 表达式包裹，并且/或者以相同方式处理 JSX 子元素，但也会使用双引号
- `never`：去掉 JSX 属性和/或者 JSX 子元素中的大括号

- 所有修复操作都使用双引号。

### 示例

以下是此规则配置为 `{ props: "always", children: "always" }` 时，**错误**代码的示例：

```jsx
<App>Hello world</App>;
<App prop="Hello world">{"Hello world"}</App>;
```

它们可以被修复为：

```jsx
<App>{"Hello world"}</App>;
<App prop={"Hello world"}>{"Hello world"}</App>;
```

以下是此规则配置为 `{ props: "never", children: "never" }` 时，**错误**代码的示例：

```jsx
<App>{"Hello world"}</App>;
<App prop={"Hello world"} attr={"foo"} />;
```

它们可以被修复为：

```jsx
<App>Hello world</App>;
<App prop="Hello world" attr="foo" />;
```

以下是此规则配置为 `{ props: "always", children: "always", "propElementValues": "always" }` 时，**错误**代码的示例：

```jsx
<App prop=<div /> />
```

它们可以被修复为：

```jsx
<App prop={<div />} />
```

以下是此规则配置为 `{ props: "never", children: "never", "propElementValues": "never" }` 时，**错误**代码的示例：

```jsx
<App prop={<div />} />
```

它们可以被修复为：

```jsx
<App prop=<div /> />
```

以下是此规则配置为 `"always"` 时，**错误**代码的示例：

```jsx
<App>Hello world</App>;
<App prop="Hello world" attr="foo">
  Hello world
</App>;
```

它们可以被修复为：

```jsx
<App>{"Hello world"}</App>;
<App prop={"Hello world"} attr={"foo"}>
  {"Hello world"}
</App>;
```

以下是此规则配置为 `"never"` 时，**错误**代码的示例：

```jsx
<App prop={"foo"} attr={"bar"}>
  {"Hello world"}
</App>
```

它可以被修复为：

```jsx
<App prop="foo" attr="bar">
  Hello world
</App>
```

### 边界情况

修复也会处理模板字面量、带引号的字符串，以及带转义字符的字符串。

- 如果规则设置为去掉不必要的大括号，而 JSX 表达式中的模板字面量没有表达式，它会发出警告并使用双引号修复。例如：

```jsx
<App prop={`Hello world`}>{`Hello world`}</App>
```

会被警告并修复为：

```jsx
<App prop="Hello world">Hello world</App>
```

- 如果规则设置为强制使用大括号，并且字符串中包含引号，JSX 子元素会使用双引号修复，而 JSX 属性会按常规方式修复。另外，在修复中，双引号也会被转义。

例如：

```jsx
<App prop='Hello "foo" world'>Hello 'foo' "bar" world</App>
```

会被警告并修复为：

```jsx
<App prop={'Hello "foo" world'}>{"Hello 'foo' \"bar\" world"}</App>
```

- 如果规则设置为去掉不必要的大括号（JSX 表达式），而其 JSX 形式中存在需要转义的字符，例如引号字符、[禁止的 JSX 文本字符](https://facebook.github.io/jsx/)、转义字符以及任何看起来像 HTML 实体名称的内容，代码将不会被警告，因为修复可能会降低代码的可读性。

以下是此规则配置为 `"never"` 时，**正确**代码的示例：

```jsx
<Color text={"\u00a0"} />
<App>{"Hello \u00b7 world"}</App>;
<style type="text/css">{'.main { margin-top: 0; }'}</style>;
/**
 * 无法在没有容器的情况下将空白注入 jsx，因此这
 * 始终是允许的。
 */
<App>{' '}</App>
<App>{'     '}</App>
<App>{/* 注释使容器变得必要 */ <Bpp />}</App>
```

### 何时不使用

如果你不关心在 JSX props 和/或子元素中保持大括号使用的一致性，以及不必要的 JSX 表达式的使用，就应该关闭此规则。

## 配置

### children

type: `"always" | "never" | "ignore"`

default: `"never"`

是否对 JSX 元素的子内容强制使用或禁止大括号。

- `never` 将禁止不必要的大括号，例如以下写法会被优先采用：`<Foo>I love oxlint</Foo>`
- `always` 将在所有情况下强制使用大括号，例如：`<Foo>{'I love oxlint'}</Foo>`
- `ignore` 将允许子内容使用任意一种风格。

### propElementValues

type: `"always" | "never" | "ignore"`

default: `"ignore"`

当设置为 `ignore` 或 `never` 时，允许（或强制）以下 JSX 代码：
`<App prop=<div /> />;`

当设置为 `always` 时，JSX 元素类型的 prop 值必须使用大括号：`<App prop={<div />} />;`

**注意**：强烈建议你将 `propElementValues` 设置为 `always`。
允许省略 JSX 元素类型 prop 值周围大括号的能力非常隐晦，而且是刻意不文档化的，不应依赖它。

### props

type: `"always" | "never" | "ignore"`

default: `"never"`

是否对 JSX 元素上的 props 强制使用或禁止大括号。

- `never` 将禁止不必要的大括号，例如以下写法会被优先采用：`<Foo foo="bar" />`
- `always` 将在所有情况下强制使用大括号，例如：`<Foo foo={'bar'} />`
- `ignore` 将允许 prop 值使用任意一种风格。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中加入。

## 参考资料

<RuleReferences />
