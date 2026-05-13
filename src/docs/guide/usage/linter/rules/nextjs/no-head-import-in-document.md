---
title: "nextjs/no-head-import-in-document | Oxlint"
rule: "nextjs/no-head-import-in-document"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_head_import_in_document.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 Next.js 文档中使用 `next/head`。

### 为什么这不好？

在 `pages/_document.js` 中导入 `next/head` 可能会在你的 Next.js 应用程序中导致
意外问题。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import Document, { Html, Main, NextScript } from "next/document";
import Head from "next/head";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
      <Html>
        <Head></Head>
      </Html>
    );
  }
}

export default MyDocument;
```

以下是此规则的**正确**代码示例：

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
      <Html>
        <Head></Head>
      </Html>
    );
  }
}

export default MyDocument;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
