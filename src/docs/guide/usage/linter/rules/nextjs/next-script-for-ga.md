---
title: "nextjs/next-script-for-ga"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/next_script_for_ga.rs`;
</script>

<RuleHeader />

### 作用

在 Next.js 应用中实现 Google Analytics 时，强制使用 `next/script` 组件，
而不是使用普通的 `<script>` 标签。

### 为什么这不好？

为 Google Analytics 使用普通的 `<script>` 标签可能会导致若干问题：

- 脚本可能以阻塞方式加载，影响页面性能
- 没有 Next.js 提供的内置优化或加载策略
- 缺少 Next.js 提供的自动资源处理

### 示例

以下是此规则的 **错误** 代码示例：

```jsx
// 使用普通 script 标签加载 GA 源
<script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

// 使用内联脚本初始化 GA
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `
}} />
```

以下是此规则的 **正确** 代码示例：

```jsx
import Script from 'next/script'

// 使用 next/script 加载 GA 源
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="lazyOnload"
/>

// 使用 next/script 初始化 GA
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考资料

<RuleReferences />
