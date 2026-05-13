---
title: "nextjs/no-html-link-for-pages | Oxlint"
rule: "nextjs/no-html-link-for-pages"
category: "Correctness"
version: "1.7.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_html_link_for_pages.rs`;
</script>

<RuleHeader />

### 它的作用

阻止使用 `<a>` 元素在 Next.js 页面之间导航。

### 为什么这不好？

在 Next.js 应用程序中，使用 `<a>` 元素进行内部导航可能会导致：

- 完整页面重新加载，而不是客户端导航
- 丢失应用状态
- 导航性能更慢
- 预取能力失效

Next.js 提供了来自 `next/link` 的 `<Link />` 组件用于页面之间的客户端导航，
它能提供更好的性能和用户体验。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function HomePage() {
  return (
    <div>
      <a href="/about">关于我们</a>
      <a href="/contact">联系</a>
    </div>
  );
}
```

以下是此规则的**正确**代码示例：

```jsx
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <Link href="/about">关于我们</Link>
      <Link href="/contact">联系</Link>
    </div>
  );
}
```

允许外部链接：

```jsx
function HomePage() {
  return (
    <div>
      <a href="https://example.com">外部链接</a>
      <a href="mailto:contact@example.com">电子邮件</a>
      <a href="tel:+1234567890">电话</a>
    </div>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.7.0。

## 参考资料

<RuleReferences />
