---
title: "nextjs/no-title-in-document-head | Oxlint"
rule: "nextjs/no-title-in-document-head"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/no-title-in-document-head"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_title_in_document_head.rs`;
</script>

<RuleHeader />

### 作用

阻止在来自 `next/document` 的 `Head` 组件中使用 `<title>`。

### 为什么这不好？

`<title>` 元素应仅用于所有页面通用的任何 `<head>` 代码。
标题标签应改为在页面级别使用 `next/head` 定义。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { Head } from "next/document";

export function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
    </div>
  );
}
```

以下是此规则的**正确**代码示例：

```javascript
import Head from "next/head";

export function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
    </div>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考资料

<RuleReferences />
