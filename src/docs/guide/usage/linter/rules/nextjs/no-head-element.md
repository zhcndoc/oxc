---
title: "nextjs/no-head-element | Oxlint"
rule: "nextjs/no-head-element"
category: "正确性"
version: "0.2.1"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-head-element"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_head_element.rs`;
</script>

<RuleHeader />

### 作用

禁止在 Next.js 应用中使用原生的 `<head>` 元素。

### 为什么这不好？

`<head>` 元素可能会在 Next.js 应用中引发意外行为。
请改用 Next.js 内置的 `next/head` 组件。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Index() {
  return (
    <>
      <head>
        <title>我的页面标题</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
    </>
  );
}

export default Index;
```

以下是此规则的**正确**代码示例：

```jsx
import Head from "next/head";

function Index() {
  return (
    <>
      <Head>
        <title>我的页面标题</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  );
}

export default Index;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.1 中添加。

## 参考

<RuleReferences />
