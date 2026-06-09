---
title: "eslint/no-caller | Oxlint"
rule: "eslint/no-caller"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-caller"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_caller.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `arguments.caller` 或 `arguments.callee`。

### 为什么不好？

使用 `arguments.caller` 和 `arguments.callee` 会使多种代码优化变得不可能。它们在 JavaScript 中已被弃用，并且在严格模式下禁止使用。

```js
function foo() {
  var callee = arguments.callee;
}
```

本规则旨在通过禁止使用 `arguments.caller` 和 `arguments.callee` 来不鼓励使用已弃用和次优的代码。因此，当使用 `arguments.caller` 和 `arguments.callee` 时，它会发出警告。

请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee) 以获取更多信息。

### 示例

本规则 **错误** 代码示例：

```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  arguments.callee(n - 1);
}

[1, 2, 3, 4, 5].map(function (n) {
  return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

本规则 **正确** 代码示例：

```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  foo(n - 1);
}

[1, 2, 3, 4, 5].map(function factorial(n) {
  return !(n > 1) ? 1 : factorial(n - 1) * n;
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中添加。

## 参考资料

<RuleReferences />
