---
title: "jest/prefer-to-contain | Oxlint"
rule: "jest/prefer-to-contain"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_to_contain.rs`;
</script>

<RuleHeader />

### 它的作用

为了获得更好的失败提示，在断言一个包含对象的数组时，应使用 `toContain()`。

### 为什么这很糟糕？

当使用 `toBe()`、`toEqual()` 或 `toStrictEqual()` 来断言对象包含在数组中时，此规则会触发警告

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(a.includes(b)).toBe(true);
expect(a.includes(b)).not.toBe(true);
expect(a.includes(b)).toBe(false);
expect(a.includes(b)).toEqual(true);
expect(a.includes(b)).toStrictEqual(true);
```

以下是此规则的**正确**代码示例：

```javascript
expect(a).toContain(b);
expect(a).not.toContain(b);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中加入。

## 参考资料

<RuleReferences />
