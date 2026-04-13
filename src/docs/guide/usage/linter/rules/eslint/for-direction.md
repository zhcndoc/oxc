---
title: "eslint/for-direction"
category: "Correctness"
default: true
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/for_direction.rs`;
</script>

<RuleHeader />

### 作用

禁止 `for` 循环中更新子句将计数器向错误方向移动，从而阻止循环达到停止条件。

### 为什么不好？

停止条件永远无法达到的 `for` 循环将无限运行。虽然无限循环可能是有意的，但它们通常编写为 `while` 循环。更多情况下，无限 `for` 循环是一个 bug。

### 示例

此规则**不正确**代码的示例：

```js
/* for-direction: "error" */

for (var i = 0; i < 10; i--) {}

for (var i = 10; i >= 0; i++) {}

for (var i = 0; i > 10; i++) {}

for (var i = 0; 10 > i; i--) {}

const n = -2;
for (let i = 0; i < 10; i += n) {}
```

此规则**正确**代码的示例：

```js
/* for-direction: "error" */

for (var i = 0; i < 10; i++) {}

for (var i = 0; 10 > i; i++) {
  // 计数器 "i" 在右侧
}

for (let i = 10; i >= 0; i += this.step) {
  // 方向未知
}

for (let i = MIN; i <= MAX; i -= 0) {
  // 未增加或减少
}
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
