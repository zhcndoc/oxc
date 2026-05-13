---
title: "unicorn/no-useless-length-check | Oxlint"
rule: "unicorn/no-useless-length-check"
category: "正确性"
version: "0.0.19"
default: true
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_length_check.rs`;
</script>

<RuleHeader />

### 它的作用

它会检查逻辑表达式中是否存在不必要的数组长度检查。

情况包括：

- `array.length === 0 || array.every(Boolean)`（如果数组有元素，`array.every` 返回 `true`）
- `array.length > 0 && array.some(Boolean)`（如果数组为空，`array.some` 返回 `false`）

### 为什么这不好？

会额外执行一次不必要的长度检查。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (array.length === 0 || array.every(Boolean)) {
  // 执行一些操作！
}
```

以下是此规则的**正确**代码示例：

```javascript
if (array.every(Boolean)) {
  // 执行一些操作！
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.19。

## 参考资料

<RuleReferences />
