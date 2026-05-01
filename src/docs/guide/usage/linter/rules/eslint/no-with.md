---
title: "eslint/no-with"
category: "Correctness"
version: "0.2.14"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_with.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 [`with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with) 语句。

### 为什么这不好？

with 语句可能有问题，因为它会将对象的成员添加到当前作用域中，从而使得无法判断块内的变量实际指代什么。

通常认为这是一种不好的做法，并且在严格模式下是被禁止的。

如果启用了 `alwaysStrict`，那么在 TypeScript 代码中不需要此规则。

### 示例

以下是此规则的**错误**代码示例：

```javascript
with (point) {
  r = Math.sqrt(x * x + y * y); // r 是 point 的成员吗？
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.14 中添加的。

## 参考资料

<RuleReferences />
