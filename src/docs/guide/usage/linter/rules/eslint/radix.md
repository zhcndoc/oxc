---
title: "eslint/radix | Oxlint"
rule: "eslint/radix"
category: "Pedantic"
version: "0.3.3"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/radix.rs`;
</script>

<RuleHeader />

### 它的作用

在使用 `parseInt()` 时，强制一致地使用 radix 参数，
该参数用于指定解析数字时使用的进制。

### 为什么这不好？

在不指定
radix 的情况下使用 `parseInt()` 函数可能会导致意外结果。

有关 `parseInt()` 如何处理某些边缘情况的更多信息，
请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#radix)。

### 配置

请注意，向此规则传递选项不会影响其行为。
在 v1.49.0 中，此规则的配置选项已被移除，并变成无操作。
这与 ESLint v10 中所做的行为变更一致，并且该规则现在
始终强制要求向 `parseInt()` 提供 radix 参数。

如果由于此更改而收到新的违规提示，您可以选择
禁用此规则，或者在代码库中所有使用
`parseInt()` 的地方添加 radix 参数。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let num = parseInt("071"); // 57
```

以下是此规则的**正确**代码示例：

```javascript
let num = parseInt("071", 10); // 71
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.3.3 中添加。

## 参考

<RuleReferences />
