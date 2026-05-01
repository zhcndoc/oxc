---
title: "eslint/no-return-assign"
category: "Style"
version: "0.9.10"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_return_assign.rs`;
</script>

<RuleHeader />

### 作用

禁止在 return 语句中使用赋值运算符。

### 为什么这不好？

在 return 表达式中，js 允许赋值，但通常只有一个等号的表达式本意是比较。
然而，由于缺少一个等号，它实际上变成了赋值，这在 js 中是合法代码。
因此，由于这种歧义，最佳实践是不在 return 语句中使用赋值。

### 示例

以下是此规则的**错误**代码示例：

```js
() => (a = b);
function x() {
  return (a = b);
}
```

以下是此规则的**正确**代码示例：

```js
() => (a = b);
function x() {
  var result = (a = b);
  return result;
}
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

禁止在 return 语句中使用所有赋值。

### `"except-parens"`

仅当赋值位于括号中时，才允许在 return 语句中使用赋值。
这是默认模式。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.10 中添加。

## 参考资料

<RuleReferences />
