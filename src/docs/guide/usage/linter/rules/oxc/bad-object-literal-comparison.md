---
title: "oxc/bad-object-literal-comparison | Oxlint"
rule: "oxc/bad-object-literal-comparison"
category: "正确性"
version: "0.1.1"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_object_literal_comparison.rs`;
</script>

<RuleHeader />

### 它的作用

检查对象字面量和数组字面量之间的比较。

### 为什么这不好？

将变量与对象或数组字面量进行比较，结果总是 false，因为对象和数组字面量彼此之间永远不相等。

如果你想检查对象或数组是否为空，请使用 `Object.entries()` 或 `Object.keys()` 及其长度。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (x === {}) {
}
if (arr !== []) {
}
```

以下是此规则的**正确**代码示例：

```javascript
if (typeof x === "object" && Object.keys(x).length === 0) {
}
if (Array.isArray(x) && x.length === 0) {
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考资料

<RuleReferences />
