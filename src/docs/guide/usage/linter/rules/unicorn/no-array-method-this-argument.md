---
title: "unicorn/no-array-method-this-argument | Oxlint"
rule: "unicorn/no-array-method-this-argument"
category: "Style"
version: "0.16.12"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_method_this_argument.rs`;
</script>

<RuleHeader />

### 作用

禁止在数组迭代方法中使用 `thisArg` 参数，例如
`map`、`filter`、`some`、`every` 等。

### 为什么这不好？

`thisArg` 参数会让代码更难理解和推理。相反，
应优先使用箭头函数，或者以更清晰的方式显式绑定。箭头函数会从词法作用域继承 `this`，这更直观，也更不容易出错。

### 示例

以下是此规则的**错误**代码示例：

```js
array.map(function (x) {
  return x + this.y;
}, this);
array.filter(function (x) {
  return x !== this.value;
}, this);
```

以下是此规则的**正确**代码示例：

```js
array.map((x) => x + this.y);
array.filter((x) => x !== this.value);
const self = this;
array.map(function (x) {
  return x + self.y;
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.12 中添加。

## 参考资料

<RuleReferences />
