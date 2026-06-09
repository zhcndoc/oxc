---
title: "vitest/prefer-to-be-truthy | Oxlint"
rule: "vitest/prefer-to-be-truthy"
category: "Style"
version: "0.7.1"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-truthy.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_be_truthy.rs`;
</script>

<RuleHeader />

### 作用

当 `expect` 或 `expectTypeOf` 中使用 `toBe(true)` 时，此规则会发出警告。
使用 `--fix` 时，它将被替换为 `toBeTruthy()`。

### 为什么这不好？

使用 `toBe(true)` 的灵活性较差，可能无法考虑其他真值，
例如非空字符串或对象。`toBeTruthy()` 会检查任意
真值，这使测试更加全面和稳健。

### 示例

此规则的**错误**代码示例：

```javascript
expect(foo).toBe(true);
expectTypeOf(foo).toBe(true);
```

此规则的**正确**代码示例：

```javascript
expect(foo).toBeTruthy();
expectTypeOf(foo).toBeTruthy();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.1 中加入。

## 参考资料

<RuleReferences />
