---
title: "unicorn/no-instanceof-array"
category: "Pedantic"
version: "0.0.8"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_instanceof_array.rs`;
</script>

<RuleHeader />

### 它的作用

要求使用 `Array.isArray()`，而不是 `instanceof Array`。

### 为什么这不好？

`instanceof Array` 检查无法跨 realms/contexts 正常工作。
例如，浏览器中的 frames/windows，或者 Node.js 中的 `vm` 模块。

### 示例

以下是此规则的**错误**代码示例：

```javascript
array instanceof Array;
[1, 2, 3] instanceof Array;
```

以下是此规则的**正确**代码示例：

```javascript
Array.isArray(array);
Array.isArray([1, 2, 3]);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
