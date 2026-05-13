---
title: "jsx-a11y/scope | Oxlint"
rule: "jsx-a11y/scope"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/scope.rs`;
</script>

<RuleHeader />

### 用途

scope 属性应仅用于 `<th>` 元素。

### 为什么这不好？

scope 属性使屏幕阅读器用户更容易浏览表格，前提是正确使用它。
如果使用不当，scope 会让表格导航变得困难得多，也更低效。
屏幕阅读器的工作方式是假设表格有一个标题，并且该标题指定了一个作用域。由于屏幕阅读器的工作原理，拥有准确的标题会让表格对使用该设备的人来说更易访问，也更高效。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div scope />
```

以下是此规则的**正确**代码示例：

```jsx
<th scope="col" />
<th scope={scope} />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
