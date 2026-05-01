---
title: "react/jsx-filename-extension"
category: "Restriction"
version: "0.15.14"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_filename_extension.rs`;
</script>

<RuleHeader />

### 它的作用

强制一致地使用 `.jsx` 文件扩展名。

### 为什么这很糟糕？

某些打包器或解析器需要通过文件扩展名知道其中包含 JSX，
才能正确处理这些文件。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// 文件名: MyComponent.js
function MyComponent() {
  return <div />;
}
```

以下是此规则的**正确**代码示例：

```jsx
// 文件名: MyComponent.jsx
function MyComponent() {
  return <div />;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `"always" | "as-needed"`

default: `"always"`

何时允许使用 JSX 文件扩展名。默认情况下，所有文件都可以使用 JSX 扩展名。
将其设置为 `as-needed`，则只允许在包含 JSX 语法的文件中使用 JSX 文件扩展名。

#### `"always"`

始终允许使用 `.jsx` 文件扩展名。

#### `"as-needed"`

仅允许在包含 JSX 语法的文件中使用 `.jsx` 文件扩展名。

### extensions

type: `string[]`

default: `["jsx"]`

允许的文件扩展名集合。
可以包含或省略前导点（例如，"jsx" 和 ".jsx" 都是有效的）。

### ignoreFilesWithoutCode

type: `boolean`

default: `false`

如果启用，不包含代码的文件（即为空、仅包含空白字符或注释）不会被拒绝。

## 如何使用

<RuleHowToUse />

## Version

This rule was added in v0.15.14.

## References

<RuleReferences />
