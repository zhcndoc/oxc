---
title: "eslint/use-isnan"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/use_isnan.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在不使用 `isNaN()` 调用的情况下检查 `NaN`。

### 为什么这不好？

在 JavaScript 中，`NaN` 是 Number 类型的一个特殊值。  
它用于表示 IEEE 浮点算术标准所定义的双精度 64 位格式所表示的任何“不是数字”的值。

由于 `NaN` 在 JavaScript 中是独一无二的，不会等于任何值，包括它自身，  
因此与 `NaN` 比较的结果会令人困惑：

- `NaN === NaN` 或 `NaN == NaN` 的结果为 false
- `NaN !== NaN` 或 `NaN != NaN` 的结果为 true

因此，请使用 `Number.isNaN()` 或全局 `isNaN()` 函数来测试某个值是否为 `NaN`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
foo == NaN;
foo === NaN;
foo <= NaN;
foo > NaN;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### enforceForIndexOf

type: `boolean`

default: `false`

是否禁止将 NaN 作为 `indexOf` 和 `lastIndexOf` 的参数

### enforceForSwitchCase

type: `boolean`

default: `true`

是否禁止在 switch case 和判别式中使用 NaN

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
