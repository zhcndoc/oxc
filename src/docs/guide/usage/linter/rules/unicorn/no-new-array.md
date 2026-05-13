---
title: "unicorn/no-new-array | Oxlint"
rule: "unicorn/no-new-array"
category: "Correctness"
version: "0.0.16"
default: true
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_new_array.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `new Array()`。

### 为什么这不好？

当使用 `Array` 构造函数并传入一个参数时，不清楚该参数是表示数组的长度，还是表示唯一的元素。

### 示例

此规则的**错误**代码示例：

```javascript
const array = new Array(1);
const array = new Array(42);
const array = new Array(foo);
```

此规则的**正确**代码示例：

```javascript
const array = Array.from({ length: 42 });
const array = [42];
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.16。

## 参考资料

<RuleReferences />
