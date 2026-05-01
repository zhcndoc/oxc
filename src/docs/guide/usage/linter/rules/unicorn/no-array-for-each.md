---
title: "unicorn/no-array-for-each"
category: "限制"
version: "0.0.19"
default: false
type_aware: false
fix: "待定"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_for_each.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `Array#forEach`，而推荐使用 for 循环。

### 为什么这不好？

与 `forEach` 方法相比，[`for…of` 语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 的优点包括：

- 更快
- 更好的可读性
- 能够通过 `break` 或 `return` 早退

此外，如果你正在使用 TypeScript，使用 `for…of` 有很大好处，因为它不会导致跨越函数边界。这意味着，在当前作用域中更早进行的类型缩窄，在循环内部也能正常工作（无需重新进行类型缩窄）。此外，循环内任何被修改的变量都会被捕获，用于判断某个变量是否正在被使用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = [1, 2, 3];
foo.forEach((element) => {
  /* ... */
});
```

以下是此规则的**正确**代码示例：

```javascript
const foo = [1, 2, 3];
for (const element of foo) {
  /* ... */
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
