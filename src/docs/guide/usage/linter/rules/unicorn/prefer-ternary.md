---
title: "unicorn/prefer-ternary | Oxlint"
rule: "unicorn/prefer-ternary"
category: "Style"
version: "1.50.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_ternary.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用三元表达式，而不是简单的 `if`/`else` 语句。

### 这有什么问题？

对于同样的操作，简单的 `if`/`else` 分支用三元表达式表示时，通常更简短，也更清晰。

### 示例

此规则的**错误**代码示例：

```js
if (test) {
  return a;
} else {
  return b;
}
```

此规则的**正确**代码示例：

```js
return test ? a : b;
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

当各分支可以安全合并时，始终强制使用三元表达式。

### `"only-single-line"`

仅当条件以及两个分支都是单行时，才强制使用三元表达式。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.50.0 中添加。

## 参考资料

<RuleReferences />
