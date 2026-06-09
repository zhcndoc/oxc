---
title: "vitest/prefer-strict-boolean-matchers | Oxlint"
rule: "vitest/prefer-strict-boolean-matchers"
category: "Style"
version: "1.57.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-strict-boolean-matchers.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_strict_boolean_matchers.rs`;
</script>

<RuleHeader />

### 作用

强制使用 `toBe(true)` 和 `toBe(false)`，而不是会将类型强制转换为布尔值的匹配器。

### 为什么这不好？

Truthy/falsy 匹配器会将值强制转换为布尔值，并可能掩盖类型错误。
严格的布尔断言能明确表达意图，并避免意外的类型转换。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(foo).toBeTruthy();
expectTypeOf(foo).toBeTruthy();
expect(foo).toBeFalsy();
expectTypeOf(foo).toBeFalsy();
```

以下是此规则的**正确**代码示例：

```javascript
expect(foo).toBe(true);
expectTypeOf(foo).toBe(true);
expect(foo).toBe(false);
expectTypeOf(foo).toBe(false);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.57.0 中添加。

## 参考资料

<RuleReferences />
