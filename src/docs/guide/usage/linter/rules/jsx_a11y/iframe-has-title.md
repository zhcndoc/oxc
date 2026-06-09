---
title: "jsx-a11y/iframe-has-title | Oxlint"
rule: "jsx-a11y/iframe-has-title"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/iframe_has_title.rs`;
</script>

<RuleHeader />

### 它的作用

强制 iframe 元素具有 title 属性。

### 为什么这不好？

屏幕阅读器用户依赖 iframe 的 title 来描述 iframe 的内容。
如果标记中不包含 title 属性，对于这类技术的用户来说，快速在 iframe 和 iframe 元素之间导航会变得困难且令人困惑。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<iframe />
<iframe {...props} />
<iframe title="" />
<iframe title={''} />
<iframe title={``} />
<iframe title={undefined} />
<iframe title={false} />
<iframe title={true} />
<iframe title={42} />
```

以下是此规则的**正确**代码示例：

```jsx
<iframe title="This is a unique title" />
<iframe title={uniqueTitle} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.19。

## 参考资料

<RuleReferences />
