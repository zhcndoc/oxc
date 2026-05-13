---
title: "vitest/prefer-strict-equal | Oxlint"
rule: "vitest/prefer-strict-equal"
category: "Style"
version: "0.2.13"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_strict_equal.rs`;
</script>

<RuleHeader />

### 作用

如果使用 `toEqual()` 来断言相等性，此规则会触发警告。

### 为什么这不好？

`toEqual()` 匹配器会执行深度相等检查，但会忽略对象和数组中的 `undefined` 值。  
这可能会导致误报，即测试本应失败却通过了。`toStrictEqual()`  
通过检查 `undefined` 值提供了更准确的比较。

### 示例

此规则的**错误**代码示例：

```javascript
expect({ a: "a", b: undefined }).toEqual({ a: "a" });
```

此规则的**正确**代码示例：

```javascript
expect({ a: "a", b: undefined }).toStrictEqual({ a: "a" });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.13 中添加。

## 参考资料

<RuleReferences />
