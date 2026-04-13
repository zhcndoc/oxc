---
title: "eslint/no-dupe-keys"
category: "正确性"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_dupe_keys.rs`;
</script>

<RuleHeader />

### 作用

禁止在对象字面量中出现重复的键。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制进行此检查。

### 为什么不好？

对象字面量中具有相同键的多个属性会导致应用程序中出现意外行为。

### 示例

此规则**不正确**代码的示例：

```js
var foo = {
  bar: "baz",
  bar: "qux",
};

var foo = {
  bar: "baz",
  bar: "qux",
};

var foo = {
  0x1: "baz",
  1: "qux",
};
```

此规则**正确**代码的示例：

```js
var foo = {
  bar: "baz",
  qux: "qux",
};
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
