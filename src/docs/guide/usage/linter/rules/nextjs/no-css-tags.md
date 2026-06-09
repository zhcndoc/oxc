---
title: "nextjs/no-css-tags | Oxlint"
rule: "nextjs/no-css-tags"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-css-tags"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_css_tags.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 Next.js 应用中使用 `<link>` 标签手动引入样式表。
此规则会检查引用本地 CSS 文件且 `rel="stylesheet"` 的 `<link>` 标签。

### 为什么这很糟糕？

Next.js 通过其内置的 CSS 支持自动处理 CSS 导入。
手动引入样式表会绕过 Next.js 内置的 CSS 优化，
阻止样式的正确代码分割和优化，并可能导致
无样式内容闪烁（FOUC）。这还会破坏开发期间自动的 CSS 热重载。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// 手动引入本地 CSS 文件
<link href="/_next/static/css/styles.css" rel="stylesheet" />

// 在 pages/_document.js 中
<Head>
  <link href="css/my-styles.css" rel="stylesheet" />
</Head>
```

以下是此规则的**正确**代码示例：

```jsx
// 直接导入 CSS 文件
import '../styles/global.css'

// 使用 CSS Modules
import styles from './Button.module.css'

// 使用外部样式表（允许）
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans"
  rel="stylesheet"
/>

// 使用 styled-jsx
<style jsx>{`
  .button { color: blue; }
`}</style>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考资料

<RuleReferences />
