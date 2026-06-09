---
title: "nextjs/no-styled-jsx-in-document | Oxlint"
rule: "nextjs/no-styled-jsx-in-document"
category: "正确性"
version: "0.3.3"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-styled-jsx-in-document"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_styled_jsx_in_document.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `pages/_document.js` 中使用 styled-jsx。

### 为什么这不好？

像 styled-jsx 这样的自定义 CSS 不允许出现在 [Custom Document](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) 中。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx>{`
            body {
              background: hotpink;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}
```

以下是此规则的**正确**代码示例：

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
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
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.3 中添加。

## 参考资料

<RuleReferences />
