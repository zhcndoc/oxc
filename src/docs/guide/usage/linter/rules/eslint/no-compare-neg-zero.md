---
title: "eslint/no-compare-neg-zero | Oxlint"
rule: "eslint/no-compare-neg-zero"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
upstream: "https://eslint.org/docs/latest/rules/no-compare-neg-zero"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_compare_neg_zero.rs`;
</script>

<RuleHeader />

### 作用

禁止与 `-0` 进行比较

### 为什么不好？

该规则应当警告那些试图与 `-0` 进行比较的代码，因为这不会按预期工作。也就是说，像 `x === -0` 这样的代码对于 `+0` 和 `-0` 都会返回 true。作者可能本意是想使用 `Object.is(x, -0)`。

### 示例

此规则 **错误** 代码的示例：

```javascript
if (x === -0) {
  // 执行某些操作...
}
```

```javascript
if (-0 > x) {
  // 执行某些操作...
}
```

此规则 **正确** 代码的示例：

```javascript
if (x === 0) {
  // 执行某些操作...
}
```

```javascript
if (Object.is(x, -0)) {
  // 执行某些操作...
}
```

```javascript
if (0 > x) {
  // 执行某些操作...
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
