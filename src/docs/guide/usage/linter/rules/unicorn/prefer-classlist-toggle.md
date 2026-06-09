---
title: "unicorn/prefer-classlist-toggle | Oxlint"
rule: "unicorn/prefer-classlist-toggle"
category: "Style"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-classlist-toggle.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_classlist_toggle.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `element.classList.toggle(className, condition)`，而不是
通过条件逻辑进行添加/移除的模式。

### 为什么不好

与使用条件逻辑在 `add()` 和 `remove()` 之间切换相比，`toggle()` 方法更简洁，也更具表达力。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (condition) {
  element.classList.add("className");
} else {
  element.classList.remove("className");
}

condition ? element.classList.add("className") : element.classList.remove("className");

element.classList[condition ? "add" : "remove"]("className");
```

以下是此规则的**正确**代码示例：

```javascript
element.classList.toggle("className", condition);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.20.0 中添加。

## 参考资料

<RuleReferences />
