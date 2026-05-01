---
title: "nextjs/no-script-component-in-head"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_script_component_in_head.rs`;
</script>

<RuleHeader />

### 它的作用

阻止在 `next/head` 组件中使用 `next/script`。

### 为什么这不好？

`next/script` 组件不应在 `next/head` 组件中使用。
请将 `<Script />` 组件移到 `<Head>` 外部。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import Script from "next/script";
import Head from "next/head";

export default function Index() {
  return (
    <Head>
      <title>Next.js</title>
      <Script src="/my-script.js" />
    </Head>
  );
}
```

以下是此规则的**正确**代码示例：

```jsx
import Script from "next/script";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
      </Head>
      <Script src="/my-script.js" />
    </>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
