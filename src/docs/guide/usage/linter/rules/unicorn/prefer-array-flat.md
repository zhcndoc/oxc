---
title: "unicorn/prefer-array-flat"
category: "Pedantic"
version: "0.0.20"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_flat.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 `Array#flat()`，而不是使用旧式技术来展平数组。

### 为什么这不好？

ES2019 引入了一个新方法 [`Array#flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)，用于展平数组。

此规则旨在将展平数组的方式统一为使用 `Array#flat()`，而不是旧式技术。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = array.flatMap((x) => x);
const foo = array.reduce((a, b) => a.concat(b), []);
const foo = array.reduce((a, b) => [...a, ...b], []);
const foo = [].concat(maybeArray);
const foo = [].concat(...array);
const foo = [].concat.apply([], array);
const foo = Array.prototype.concat.apply([], array);
const foo = Array.prototype.concat.call([], maybeArray);
const foo = Array.prototype.concat.call([], ...array);
```

以下是此规则的**正确**代码示例：

```javascript
const foo = array.flat();
const foo = [maybeArray].flat();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.20 中添加。

## 参考资料

<RuleReferences />
