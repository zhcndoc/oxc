---
title: "oxc/approx-constant | Oxlint"
rule: "oxc/approx-constant"
category: "Suspicious"
version: "0.1.1"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/approx_constant.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用近似常量，而是优先使用
`Math` 对象中的常量。

### 这有什么问题？

近似常量不如 `Math` 对象中的常量准确。
使用 `Math` 常量可以提高代码可读性和准确性。
更多信息请参见 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let log10e = 0.434294;
```

以下是此规则的**正确**代码示例：

```javascript
let log10e = Math.LOG10E;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考

<RuleReferences />
