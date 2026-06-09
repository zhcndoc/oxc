---
title: "nextjs/no-page-custom-font | Oxlint"
rule: "nextjs/no-page-custom-font"
category: "正确性"
version: "0.3.3"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-page-custom-font"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_page_custom_font.rs`;
</script>

<RuleHeader />

### 它的作用

防止仅在页面中使用自定义字体。

### 为什么这不好？

- 你添加的自定义字体是添加到某个页面中的——这只会将字体添加到特定页面，而不会作用于整个应用程序。
- 你添加的自定义字体是添加到 `pages/_document.js` 中的一个单独组件里的——这会禁用自动字体优化。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// pages/index.jsx
import Head from "next/head";
function IndexPage() {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
export default IndexPage;
```

以下是此规则的**正确**代码示例：

```jsx
// pages/_document.jsx
import NextDocument, { Html, Head } from "next/document";
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
            rel="stylesheet"
          />
        </Head>
      </Html>
    );
  }
}
export default Document;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.3.3 中添加的。

## 参考资料

<RuleReferences />
