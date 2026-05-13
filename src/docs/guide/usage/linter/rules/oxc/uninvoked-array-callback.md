---
title: "oxc/uninvoked-array-callback | Oxlint"
rule: "oxc/uninvoked-array-callback"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/uninvoked_array_callback.rs`;
</script>

<RuleHeader />

### 它的作用

当 Array 函数带有用于空槽数组的回调参数时，此规则会生效。

### 为什么这不好？

当使用单个数字参数调用 Array 构造函数时，会构造一个具有指定数量空槽的数组（而不是真正的 `undefined` 值）。
如果将回调函数传递给此数组的方法，由于数组没有实际元素，回调函数将永远不会被调用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const list = new Array(5).map((_) => createElement());
```

以下是此规则的**正确**代码示例：

```javascript
const list = new Array(5).fill().map((_) => createElement());
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
