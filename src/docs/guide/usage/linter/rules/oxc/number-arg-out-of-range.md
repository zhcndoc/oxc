---
title: "oxc/number-arg-out-of-range | Oxlint"
rule: "oxc/number-arg-out-of-range"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/number_arg_out_of_range.rs`;
</script>

<RuleHeader />

### 它的作用

检查数字相关函数的基数或精度参数是否超出限制。

### 为什么这不好？

`Number.prototype.toString` 的基数参数应在 2 到 36 之间。
`Number.prototype.toFixed` 和 `Number.prototype.toExponential` 的精度参数应在 0 到 20 之间。
`Number.prototype.toPrecision` 的精度参数应在 1 到 21 之间。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var x = 42;
var s_radix_64 = x.toString(64);
var s = x.toString(1);
```

以下是此规则的**正确**代码示例：

```javascript
var x = 42;
var s_radix_16 = x.toString(16);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.3。

## 参考资料

<RuleReferences />
