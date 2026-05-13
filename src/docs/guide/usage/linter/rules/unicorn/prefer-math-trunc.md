---
title: "unicorn/prefer-math-trunc | Oxlint"
rule: "unicorn/prefer-math-trunc"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_math_trunc.rs`;
</script>

<RuleHeader />

### 作用

倾向于使用 [`Math.trunc()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) 而不是位运算，以获得更清晰且更可靠的结果。

它会禁止使用以下位运算：

- `x | 0` ([`bitwise OR`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) 与 0)
- `~~x`（两个 [`bitwise NOT`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT)）
- `x >> 0` ([`Signed Right Shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift) 与 0)
- `x << 0` ([`Left Shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift) 与 0)
- `x ^ 0` ([`bitwise XOR Shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) 与 0)

### 为什么这不好？

使用位运算来截断数字并不清晰，而且在[某些情况下](https://stackoverflow.com/a/34706108/11687747)并不起作用。

### 示例

此规则的**错误**代码示例：

```javascript
const foo = 1.1 | 0;
```

此规则的**正确**代码示例：

```javascript
const foo = Math.trunc(1.1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考

<RuleReferences />
