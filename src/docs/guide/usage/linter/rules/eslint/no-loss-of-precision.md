---
title: "eslint/no-loss-of-precision | Oxlint"
rule: "eslint/no-loss-of-precision"
category: "正确性"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-loss-of-precision"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_loss_of_precision.rs`;
</script>

<RuleHeader />

### 作用

禁止数字字面量中的精度丢失。

### 为什么这不好？

这可能会在某些情况下导致意外结果。
例如，在执行数学运算时。

在 JavaScript 中，数字根据 IEEE 754 标准以双精度浮点数存储。
因此，数字只能在一定数量的位数内保持精度。
如果程序员输入更多位数，这些位数在转换为 Number 类型时会丢失，并导致意外/不正确的行为。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var x = 2e999;
```

```javascript
var x = 9007199254740993;
```

```javascript
var x = 5123000000000000000000000000001;
```

```javascript
var x = 1230000000000000000000000.0;
```

```javascript
var x = 0x200000_0000000_1;
```

以下是此规则的**正确**代码示例：

```javascript
var x = 12345;
```

```javascript
var x = 123.456;
```

```javascript
var x = 123.0;
```

```javascript
var x = 123e34;
```

```javascript
var x = 0x1fff_ffff_fff_fff;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.7 中添加。

## 参考

<RuleReferences />
