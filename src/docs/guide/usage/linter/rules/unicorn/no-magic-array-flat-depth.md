---
title: "unicorn/no-magic-array-flat-depth | Oxlint"
rule: "unicorn/no-magic-array-flat-depth"
category: "Restriction"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_magic_array_flat_depth.rs`;
</script>

<RuleHeader />

### 它的作用

禁止为 [`Array.prototype.flat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
的深度使用魔法数字。

### 为什么这不好？

魔法数字很难理解和维护。
在调用 `Array.prototype.flat` 时，通常会使用
`1` 或 `Infinity`。如果你使用的是其他数字，
最好添加注释来解释所提供深度的原因。

### 示例

以下是此规则的**错误**代码示例：

```javascript
array.flat(2);
array.flat(20);
```

以下是此规则的**正确**代码示例：

```javascript
array.flat(2 /* 说明 */);
array.flat(1);
array.flat();
array.flat(Infinity);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.4.2。

## 参考资料

<RuleReferences />
