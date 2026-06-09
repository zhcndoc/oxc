---
title: "unicorn/throw-new-error | Oxlint"
rule: "unicorn/throw-new-error"
category: "样式"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/throw_new_error.rs`;
</script>

<RuleHeader />

### 它的作用

此规则确保在抛出错误时始终使用 `new`。

### 为什么这不好？

在 JavaScript 中，省略 `new`（例如，`throw Error('message')`）是允许的，
但它不会正确初始化错误对象。这可能导致缺少
堆栈跟踪或原型链不正确。使用 `new` 可以让意图更清晰，
确保行为一致，并有助于避免一些微妙的 bug。

### 示例

以下是此规则的**错误**代码示例：

```javascript
throw Error("🦄");
throw TypeError("unicorn");
throw lib.TypeError("unicorn");
```

以下是此规则的**正确**代码示例：

```javascript
throw new Error("🦄");
throw new TypeError("unicorn");
throw new lib.TypeError("unicorn");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
