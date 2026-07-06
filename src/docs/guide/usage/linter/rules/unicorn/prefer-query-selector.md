---
title: "unicorn/prefer-query-selector | Oxlint"
rule: "unicorn/prefer-query-selector"
category: "Pedantic"
version: "0.0.15"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_query_selector.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `.querySelector()` 而不是 `.getElementById()`。并且优先使用 `.querySelectorAll()`
而不是 `.getElementsByClassName()`、`.getElementsByTagName()` 和 `.getElementsByName()`。

### 为什么这不好？

- 使用 `.querySelector()` 和 `.querySelectorAll()` 更灵活，并且允许使用更具体的选择器。
- 使用相同的方法查询 DOM 元素会更好。这有助于保持一致性，并且便于未来改进（例如更具体的选择器）。

### 示例

以下是此规则的**错误**代码示例：

```javascript
document.getElementById("foo");
document.getElementsByClassName("foo bar");
document.getElementsByTagName("main");
document.getElementsByClassName(fn());
document.getElementsByName("foo");
```

以下是此规则的**正确**代码示例：

```javascript
document.querySelector("#foo");
document.querySelector(".bar");
document.querySelector("main #foo .bar");
document.querySelectorAll(".foo.bar");
document.querySelectorAll("li a");
document.querySelector("li").querySelectorAll("a");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.15 中加入。

## 参考资料

<RuleReferences />
