---
title: "react/iframe-missing-sandbox | Oxlint"
rule: "react/iframe-missing-sandbox"
category: "Suspicious"
version: "0.10.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/iframe_missing_sandbox.rs`;
</script>

<RuleHeader />

### 作用

强制 `iframe` 元素使用 `sandbox` 属性。

### 为什么这很糟糕？

sandbox 属性为 iframe 中的内容启用一组额外的限制。使用 sandbox 属性被认为是一种良好的安全实践。要了解更多关于沙箱化的信息，请参阅 [MDN 关于 `sandbox`
属性的文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox)。

此规则会检查所有 React `<iframe>` 元素，并验证是否存在 `sandbox` 属性以及其值是否有效。除此之外，它还会报告属性同时包含 `allow-scripts` 和 `allow-same-origin` 的情况，因为这种组合允许嵌入的文档移除 sandbox 属性并绕过限制。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<iframe />;
<iframe sandbox="invalid-value" />;
<iframe sandbox="allow-same-origin allow-scripts" />;
```

以下是此规则的**正确**代码示例：

```jsx
<iframe sandbox="" />;
<iframe sandbox="allow-origin" />;
```

## How to Use

<RuleHowToUse />

## 版本

此规则已在 v0.10.0 中添加。

## 参考资料

<RuleReferences />
