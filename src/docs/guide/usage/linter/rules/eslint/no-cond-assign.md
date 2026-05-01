---
title: "eslint/no-cond-assign"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_cond_assign.rs`;
</script>

<RuleHeader />

### 作用

禁止在条件表达式中使用赋值运算符。

### 为什么不好？

在条件语句中，很容易将比较运算符（如 `==`）误写为赋值运算符（如 `=`）。

在条件语句中使用赋值运算符是有合理理由的。然而，很难判断特定的赋值是否是故意的。

### 示例

此规则 **不正确** 的代码示例：

```js
// 检查用户的职位头衔
if ((user.jobTitle = "manager")) {
  // user.jobTitle 现在不正确了
}
```

此规则 **正确** 的代码示例：

```js
// 检查用户的职位头衔
if (user.jobTitle === "manager") {
  // 正确比较了 `jobTitle`
}
```

## 配置

此规则接受以下字符串值之一：

### `"except-parens"`

仅允许在条件表达式中使用被括号包围的赋值。

### `"always"`

禁止条件表达式中的所有赋值。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.5 中添加。

## 参考资料

<RuleReferences />
