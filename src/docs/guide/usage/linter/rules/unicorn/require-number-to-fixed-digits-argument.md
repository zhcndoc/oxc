---
title: "unicorn/require-number-to-fixed-digits-argument"
category: "Pedantic"
version: "0.0.15"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/require_number_to_fixed_digits_argument.rs`;
</script>

<RuleHeader />

### 它的作用

强制在使用 `Number#toFixed()` 时提供 digits 参数。

### 为什么这不好？

在调用 `Number#toFixed()` 时明确 digits 参数的值，比依赖默认值 `0` 更好。

### 示例

以下是此规则的**错误**代码示例：

```javascript
number.toFixed();
```

以下是此规则的**正确**代码示例：

```javascript
number.toFixed(0);
number.toFixed(2);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.15 中添加。

## 参考资料

<RuleReferences />
