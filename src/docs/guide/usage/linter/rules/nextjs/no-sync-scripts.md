---
title: "nextjs/no-sync-scripts | Oxlint"
rule: "nextjs/no-sync-scripts"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_sync_scripts.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会禁止在 Next.js 应用中使用同步的 `<script>` 标签。
它要求任何带有 `src` 属性的 `<script>` 标签同时也必须具有
`async` 或 `defer` 属性。

### 这为什么不好？

同步脚本会阻塞页面渲染并对性能产生负面影响。
在 Next.js 应用中，建议使用 `async` 或 `defer` 属性
以异步方式加载脚本，从而提升页面加载时间和用户体验。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 没有 async/defer 的同步脚本
<script src="https://example.com/script.js"></script>

// 没有 async/defer 的动态 src
<script src={dynamicSrc}></script>
```

以下是此规则的**正确**代码示例：

```javascript
// 带有 async 属性的脚本
<script src="https://example.com/script.js" async></script>

// 带有 defer 属性的脚本
<script src="https://example.com/script.js" defer></script>

// 带有展开属性的脚本（允许，因为其中可能包含 async/defer）
<script {...props}></script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.0 中添加的。

## 参考资料

<RuleReferences />
