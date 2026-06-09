---
title: "jsx-a11y/no-access-key | Oxlint"
rule: "jsx-a11y/no-access-key"
category: "Correctness"
version: "0.0.21"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_access_key.rs`;
</script>

<RuleHeader />

### 功能说明

强制不在任何元素上使用 `accessKey` 属性，以避免与屏幕阅读器使用的键盘命令产生冲突。

### 为什么这不好？

Access key 是一种 HTML 属性，允许网页开发者为元素分配键盘快捷键。
键盘快捷键与屏幕阅读器和仅键盘用户使用的键盘命令之间的不一致会带来可访问性方面的复杂问题，因此为了避免这些问题，不应使用 access key。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div accessKey="h" />
```

以下是此规则的**正确**代码示例：

```jsx
<div />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.21 中添加。

## 参考资料

<RuleReferences />
