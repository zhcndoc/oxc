---
title: "eslint/no-array-constructor"
category: "Pedantic"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_array_constructor.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `Array` 构造函数创建数组。

### 为什么不好？

通常不推荐使用 `Array` 构造函数来构建新数组，而倾向于使用数组字面量表示法，这是因为单参数陷阱以及 `Array` 全局变量可能会被重新定义。
例外情况是当有意通过给构造函数传递单个数字参数来创建指定大小的稀疏数组时，会使用 `Array` 构造函数。

### 示例

此规则**不正确**的代码示例：

```javascript
let arr = new Array();
```

此规则**正确**的代码示例：

```javascript
let arr = [];
let arr2 = Array.from(iterable);
let arr3 = new Array(9);
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
