---
title: "unicorn/no-array-reverse"
category: "Suspicious"
version: "1.15.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_reverse.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `Array#toReversed()` 而不是 `Array#reverse()`。

### 为什么这不好？

`Array#reverse()` 会原地修改原始数组，这可能会导致意外的副作用——尤其是当原始数组在代码的其他地方被使用时。

### 示例

以下是此规则的**错误**代码示例：

```js
const reversed = [...array].reverse();
```

以下是此规则的**正确**代码示例：

```js
const reversed = [...array].toReversed();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowExpressionStatement

类型：`boolean`

默认值：`true`

默认情况下，此规则允许将 `array.reverse()` 作为表达式语句。
将其设置为 `false` 可禁止 `Array#reverse()`，即使它是一个表达式语句。

以下是将此选项设为 `false` 时，此规则的**错误**代码示例：

```js
array.reverse();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.15.0 中添加。

## 参考资料

<RuleReferences />
