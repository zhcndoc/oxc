---
title: "unicorn/no-useless-fallback-in-spread | Oxlint"
rule: "unicorn/no-useless-fallback-in-spread"
category: "Correctness"
version: "0.0.16"
default: true
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_fallback_in_spread.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在对象字面量展开时使用无用的回退值。

### 为什么这不好？

在对象字面量中展开 [falsy 值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 不会添加任何意外属性，因此没有必要添加一个空对象作为回退。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const object = { ...(foo || {}) };
```

以下是此规则的**正确**代码示例：

```javascript
const object = { ...foo };
const object = { ...(foo || { not: "empty" }) };
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
