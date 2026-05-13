---
title: "unicorn/consistent-empty-array-spread | Oxlint"
rule: "unicorn/consistent-empty-array-spread"
category: "Pedantic"
version: "0.10.1"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_empty_array_spread.rs`;
</script>

<RuleHeader />

### 作用

在数组中展开三元表达式时，我们既可以使用 `[]` 也可以使用 `''` 作为回退值，
但最好让两个分支中的类型保持一致。

### 这有什么问题？

让两个分支中的类型保持一致会使代码更易于阅读和理解。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const array = [a, ...(foo ? [b, c] : "")];

const array = [a, ...(foo ? "bc" : [])];
```

以下是此规则的**正确**代码示例：

```javascript
const array = [a, ...(foo ? [b, c] : [])];

const array = [a, ...(foo ? "bc" : "")];
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.10.1 中添加。

## 参考资料

<RuleReferences />
