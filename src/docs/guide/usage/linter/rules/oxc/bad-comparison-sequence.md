---
title: "oxc/bad-comparison-sequence"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_comparison_sequence.rs`;
</script>

<RuleHeader />

### 它的作用

当比较运算符连续使用两次或更多次时，此规则会生效。

### 为什么这不好？

因为比较运算符是二元运算符，所以不可能一次比较三个或更多操作数。
如果使用比较运算符来比较三个或更多操作数，那么只有前两个操作数会被比较，其余部分会与其布尔类型结果进行比较。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if ((a == b) == c) {
  console.log("a, b, and c are the same");
}
```

以下是此规则的**正确**代码示例：

```javascript
if (a == b && b == c) {
  console.log("a, b, and c are the same");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
