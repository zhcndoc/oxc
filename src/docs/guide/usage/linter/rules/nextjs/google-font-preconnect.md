---
title: "nextjs/google-font-preconnect | Oxlint"
rule: "nextjs/google-font-preconnect"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/google_font_preconnect.rs`;
</script>

<RuleHeader />

### 它的作用

在通过 `<link>` 标签使用 Google Fonts 时，强制包含 `rel="preconnect"`。

### 为什么这不好？

在使用 Google Fonts 时，建议包含 preconnect 资源提示，以便尽早与所需来源建立连接。
如果没有 preconnect，浏览器在下载字体文件之前需要执行 DNS 查询、TCP 握手和 TLS 协商，
这会延迟字体加载并影响性能。

### 示例

以下是此规则的**错误**代码示例：

```javascript
<link href="https://fonts.gstatic.com" />
<link rel="preload" href="https://fonts.gstatic.com" />
```

以下是此规则的**正确**代码示例：

```javascript
<link rel="preconnect" href="https://fonts.gstatic.com" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.0 中添加的。

## 参考资料

<RuleReferences />
