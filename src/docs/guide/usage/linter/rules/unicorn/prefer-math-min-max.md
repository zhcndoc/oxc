---
title: "unicorn/prefer-math-min-max"
category: "Pedantic"
version: "0.10.1"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_math_min_max.rs`;
</script>

<RuleHeader />

### 作用

在进行简单比较时，优先使用 `Math.min()` 和 `Math.max()`，而不是三元表达式。

### 为什么这不好？

对于简单比较来说，使用 `Math.min()` 和 `Math.max()` 比三元表达式更简洁、更易理解，也更不容易出错。它们能清楚地表达出寻找最小值或最大值的意图。

### 示例

以下是此规则的**错误**代码示例：

```javascript
height > 50 ? 50 : height;
height > 50 ? height : 50;
```

以下是此规则的**正确**代码示例：

```javascript
Math.min(height, 50);
Math.max(height, 50);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.10.1 中添加。

## 参考资料

<RuleReferences />
