---
title: "unicorn/no-nested-ternary"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_nested_ternary.rs`;
</script>

<RuleHeader />

### 它的作用

此规则不允许深度嵌套的三元表达式。
仅嵌套一层且用括号包裹的三元表达式是允许的。

### 为什么这不好？

嵌套三元表达式会使代码更难理解。

### 示例

此规则的**错误**代码示例：

```javascript
const foo = i > 5 ? (i < 100 ? true : false) : true;
const foo = i > 5 ? true : i < 100 ? true : i < 1000 ? true : false;
```

此规则的**正确**代码示例：

```javascript
const foo = i > 5 ? (i < 100 ? true : false) : true;
const foo = i > 5 ? (i < 100 ? true : false) : i < 100 ? true : false;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.18 中添加的。

## 参考资料

<RuleReferences />
