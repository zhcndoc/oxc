---
title: "vitest/prefer-to-be-falsy | Oxlint"
rule: "vitest/prefer-to-be-falsy"
category: "Style"
version: "0.7.1"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-falsy.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_be_falsy.rs`;
</script>

<RuleHeader />

### 作用

当 `expect` 或 `expectTypeOf` 使用 `toBe(false)` 时，此规则会发出警告。
使用 `--fix-suggestions` 时，它会被替换为 `toBeFalsy()`。

### 为什么这不好？

测试假值时，`toBeFalsy()` 能直接表达这一意图。
与 `toBe(false)` 不同，它还接受 `0`、`null` 和 `undefined` 等非布尔假值。由于替换会改变断言通过的值，因此它被作为建议提供。

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
