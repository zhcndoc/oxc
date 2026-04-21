---
title: "unicorn/一致的模板字面量转义"
category: "样式"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_template_literal_escape.rs`;
</script>

<RuleHeader />

### 它的作用

强制在模板字面量中对 ${ 采用一致的转义风格。

### 为什么这不好？

使用 `\${` 而不是 `${` 可以提升可读性，并避免混淆。

### 示例

以下是此规则下**不正确**的代码示例：

```js
const foo = `$\{a}`;
```

```js
const foo = `\$\{a}`;
```

以下是此规则下**正确**的代码示例：

```js
const foo = `\${a}`;
```

## 如何使用

<RuleHowToUse />

## 参考资料

<RuleReferences />
