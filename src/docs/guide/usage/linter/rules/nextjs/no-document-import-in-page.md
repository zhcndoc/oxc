---
title: "nextjs/no-document-import-in-page | Oxlint"
rule: "nextjs/no-document-import-in-page"
category: "Correctness"
version: "0.2.1"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-document-import-in-page"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_document_import_in_page.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 `pages/_document.js` 之外导入 `next/document`。

### 为什么这不好？

在 `pages/_document.js` 之外导入 `next/document` 可能会导致
Next.js 应用程序中出现意外问题。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// `components/MyDocument.jsx`
import Document from "next/document";

class MyDocument extends Document {
  //...
}

export default MyDocument;
```

以下是此规则的**正确**代码示例：

```jsx
// `pages/_document.jsx`
import Document from "next/document";

class MyDocument extends Document {
  //...
}

export default MyDocument;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.1 中添加。

## 参考资料

<RuleReferences />
