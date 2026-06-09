---
title: "vitest/prefer-to-be-object | Oxlint"
rule: "vitest/prefer-to-be-object"
category: "Style"
version: "0.9.2"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-object.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_be_object.rs`;
</script>

<RuleHeader />

### 作用

此规则强制使用 `toBeObject()` 来检查一个值是否为 `Object` 类型。

### 为什么这不好？

使用其他方法，例如 `toBeInstanceOf(Object)` 或 `instanceof Object`，可能
不够清晰，并且容易产生误导。强制使用 `toBeObject()`
可以提供更明确、更易读的代码，使你的意图更加清楚，
并提升测试的整体可维护性和可读性。

### 示例

此规则的**错误**代码示例：

```js
expectTypeOf({}).toBeInstanceOf(Object);
expectTypeOf({} instanceof Object).toBeTruthy();
```

此规则的**正确**代码示例：

```js
expectTypeOf({}).toBeObject();
expectTypeOf({}).toBeObject();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.2 中添加。

## 参考资料

<RuleReferences />
