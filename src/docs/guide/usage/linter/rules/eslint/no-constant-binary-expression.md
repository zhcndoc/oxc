---
title: "eslint/no-constant-binary-expression"
category: "正确性"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_constant_binary_expression.rs`;
</script>

<RuleHeader />

### 作用

禁止操作不影响值的表达式。

### 为什么不好？

始终评估为 true 或 false 的比较，以及始终短路或从不短路的逻辑表达式（`||`、`&&`、`??`），都可能是程序员错误的迹象。

这些错误在复杂表达式中尤其常见，因为运算符优先级容易被误判。

此外，此规则还会检测与新构造的对象/数组/函数等的比较。
在 JavaScript 中，对象是按引用比较的，新构造的对象永远无法 `===` 任何其他值。
这对于来自按值比较对象的语言的程序员来说可能会感到惊讶。

### 示例

此规则 **不正确** 代码示例：

```javascript
// 有人可能会认为这将评估为 `a + (b ?? c)`:
const x = a + b ?? c;

// 但实际上它评估为 `(a + b) ?? c`。由于 `a + b` 永远不为 null，
// 因此 `?? c` 没有效果。

// 来自按值比较对象的语言的程序员可能会期望这样工作：
const isEmpty = x === [];

// 然而，这始终会导致 `isEmpty` 为 `false`。
```

此规则 **正确** 代码示例：

```javascript
const x = a + (b ?? c);

const isEmpty = x.length === 0;
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
