---
title: "vitest/prefer-to-contain | Oxlint"
rule: "vitest/prefer-to-contain"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_contain.rs`;
</script>

<RuleHeader />

### 作用

为了获得更好的失败信息，在断言包含对象的数组时，应使用 `toContain()`。

### 为什么这不好？

当使用 `toBe()`、`toEqual()` 或 `toStrictEqual()` 来断言数组中包含对象时，此规则会触发警告。

### 示例

此规则的**错误**代码示例：

```javascript
expect(a.includes(b)).toBe(true);
expect(a.includes(b)).not.toBe(true);
expect(a.includes(b)).toBe(false);
expect(a.includes(b)).toEqual(true);
expect(a.includes(b)).toStrictEqual(true);
```

此规则的**正确**代码示例：

```javascript
expect(a).toContain(b);
expect(a).not.toContain(b);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.14 中添加的。

## 参考资料

<RuleReferences />
