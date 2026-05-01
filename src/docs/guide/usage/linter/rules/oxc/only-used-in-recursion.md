---
title: "oxc/only-used-in-recursion"
category: "正确性"
version: "0.1.1"
default: true
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/only_used_in_recursion.rs`;
</script>

<RuleHeader />

### 作用

检查仅在递归中使用且没有副作用的参数。

灵感来源于 [Clippy 中的 `only_used_in_recursion` 规则](https://rust-lang.github.io/rust-clippy/master/#only_used_in_recursion)。

### 这为什么不好？

传入一个只在递归调用中使用的参数很可能是个错误。

它会增加认知复杂度，并且可能影响性能。

### 示例

以下是此规则的**错误**代码示例：

```ts
function test(onlyUsedInRecursion) {
  return test(onlyUsedInRecursion);
}
```

以下是此规则的**正确**代码示例：

```ts
function f(a: number): number {
  if (a == 0) {
    return 1;
  } else {
    return f(a - 1);
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.1.1。

## 参考资料

<RuleReferences />
