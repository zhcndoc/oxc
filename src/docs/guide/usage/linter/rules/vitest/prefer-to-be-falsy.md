---
title: "vitest/prefer-to-be-falsy | Oxlint"
rule: "vitest/prefer-to-be-falsy"
category: "Style"
version: "0.7.1"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_be_falsy.rs`;
</script>

<RuleHeader />

### 作用

当在 `expect` 或 `expectTypeOf` 中使用 `toBe(false)` 时，此规则会发出警告。
使用 `--fix` 时，它会被替换为 `toBeFalsy()`。

### 为什么这不好？

使用 `toBe(false)` 的表达性较差，而且可能无法涵盖其他假值，
例如 `0`、`null` 或 `undefined`。`toBeFalsy()` 能更全面地检查任何假值，
从而提高测试的健壮性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(foo).toBe(false);
expectTypeOf(foo).toBe(false);
```

以下是此规则的**正确**代码示例：

```javascript
expect(foo).toBeFalsy();
expectTypeOf(foo).toBeFalsy();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.7.1 中添加的。

## 参考资料

<RuleReferences />
