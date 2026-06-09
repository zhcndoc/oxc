---
title: "node/no-exports-assign | Oxlint"
rule: "node/no-exports-assign"
category: "Style"
version: "0.9.3"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-exports-assign.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_exports_assign.rs`;
</script>

<RuleHeader />

### 作用

不允许对 `exports` 赋值。

### 为什么这不好？

直接使用 `exports = {}` 可能会导致混淆和潜在的错误，
因为它会重新赋值 `exports` 对象，这可能会破坏模块导出。
更可预测且更清晰的做法是直接使用 `module.exports`
，或者与 `exports` 结合使用。

此规则旨在禁止 `exports = {}`，但允许
`module.exports = exports = {}`，以避免与 `n/exports-style`
规则的 `allowBatchAssign` 选项冲突。

### 示例

以下是此规则的**错误**代码示例：

```js
exports = {};
```

以下是此规则的**正确**代码示例：

```js
module.exports.foo = 1;
exports.bar = 2;
module.exports = {};

// 如果与 `module.exports =` 一起使用，则允许 `exports = {}`
module.exports = exports = {};
exports = module.exports = {};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.3 中添加。

## 参考资料

<RuleReferences />
