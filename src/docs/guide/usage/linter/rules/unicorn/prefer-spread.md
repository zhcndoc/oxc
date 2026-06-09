---
title: "unicorn/prefer-spread | Oxlint"
rule: "unicorn/prefer-spread"
category: "Style"
version: "0.0.17"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_spread.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用 [展开运算符 (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 代替过时的模式。

### 为什么这不好？

使用展开运算符更加简洁且易读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = Array.from(set);
const foo = Array.from(new Set([1, 2]));
```

以下是此规则的**正确**代码示例：

```javascript
[...set].map(() => {});
Array.from(...argumentsArray);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.17 中加入。

## 参考资料

<RuleReferences />
