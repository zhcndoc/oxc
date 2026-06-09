---
title: "vitest/prefer-to-have-length | Oxlint"
rule: "vitest/prefer-to-have-length"
category: "Style"
version: "0.2.13"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_have_length.rs`;
</script>

<RuleHeader />

### 作用

为了获得更好的失败信息，在断言对象的 length 属性时，应使用 `toHaveLength()`。

### 为什么这不好？

当使用 `toBe()`、`toEqual()` 或 `toStrictEqual()` 来断言对象的 length 属性时，此规则会触发警告。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(files["length"]).toBe(1);
expect(files["length"]).toBe(1);
expect(files["length"])["not"].toBe(1);
```

以下是此规则的**正确**代码示例：

```javascript
expect(files).toHaveLength(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.13 中添加。

## 参考资料

<RuleReferences />
