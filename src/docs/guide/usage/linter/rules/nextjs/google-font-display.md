---
title: "nextjs/google-font-display | Oxlint"
rule: "nextjs/google-font-display"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/google-font-display"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/google_font_display.rs`;
</script>

<RuleHeader />

### 它的作用

强制对 Google Fonts 使用 font-display 行为。

### 为什么这不好？

指定 display=optional 可将不可见文本或布局偏移的风险降到最低。  
如果在字体加载完成后切换到自定义字体对你很重要，那么请改用 `display=swap``。

### 示例

以下是此规则的**错误**代码示例：

```jsx
import Head from "next/head";

export default Test = () => {
  return (
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Krona+One" rel="stylesheet" />
    </Head>
  );
};
```

以下是此规则的**正确**代码示例：

```jsx
import Head from "next/head";

export default Test = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
        rel="stylesheet"
      />
    </Head>
  );
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.2.0。

## 参考资料

<RuleReferences />
