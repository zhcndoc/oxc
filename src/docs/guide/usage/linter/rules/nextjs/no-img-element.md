---
title: "nextjs/no-img-element | Oxlint"
rule: "nextjs/no-img-element"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://nextjs.org/docs/messages/no-img-element"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_img_element.rs`;
</script>

<RuleHeader />

### 作用

由于更慢的
[LCP](https://nextjs.org/learn/seo/lcp) 和更高的带宽，禁止使用 `<img>` 元素。

### 为什么这不好？

`<img>` 元素未针对性能进行优化，可能会导致
更慢的 LCP 和更高的带宽。使用来自
`next/image` 的 [`<Image />`](https://nextjs.org/docs/pages/api-reference/components/image)
会自动优化图像并将其作为静态资源提供。

### 示例

此规则的**错误**代码示例：

```javascript
export function MyComponent() {
  return (
    <div>
      <img src="/test.png" alt="测试图片" />
    </div>
  );
}
```

此规则的**正确**代码示例：

```javascript
import Image from "next/image";
import testImage from "./test.png";
export function MyComponent() {
  return (
    <div>
      <Image src={testImage} alt="Test picture" />
    </div>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中新增。

## 参考资料

<RuleReferences />
