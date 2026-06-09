---
title: "nextjs/no-duplicate-head | Oxlint"
rule: "nextjs/no-duplicate-head"
category: "Correctness"
version: "0.3.3"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-duplicate-head"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_duplicate_head.rs`;
</script>

<RuleHeader />

### 它的作用

防止在 `pages/_document.js` 中重复使用 `<Head>`。

### 为什么这有问题？

这可能会导致你的应用中出现意外行为。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {}
  render() {
    return (
      <Html>
        <Head />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
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
  static async getInitialProps(ctx) {}
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.3.3 中添加。

## 参考资料

<RuleReferences />
