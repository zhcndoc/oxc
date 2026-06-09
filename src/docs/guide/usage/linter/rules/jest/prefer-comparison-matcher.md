---
title: "jest/prefer-comparison-matcher | Oxlint"
rule: "jest/prefer-comparison-matcher"
category: "Style"
version: "0.2.15"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-comparison-matcher.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_comparison_matcher.rs`;
</script>

<RuleHeader />

### 作用

此规则会检查测试中的比较，看看它们是否可以替换为以下内置比较匹配器之一：

- `toBeGreaterThan`
- `toBeGreaterThanOrEqual`
- `toBeLessThan`
- `toBeLessThanOrEqual`

### 为什么这不好？

在比较表达式中使用像 `toBe(true)` 这样的通用匹配器，会降低测试的可读性，并且在测试失败时提供的信息也不够有帮助。Jest 的专用比较匹配器能更清晰地表达意图，并提供更好的错误输出，显示正在比较的实际值。

### 示例

以下是此规则的**错误**代码示例：

```js
expect(x > 5).toBe(true);
expect(x < 7).not.toEqual(true);
expect(x <= y).toStrictEqual(true);
```

以下是此规则的**正确**代码示例：

```js
expect(x).toBeGreaterThan(5);
expect(x).not.toBeLessThanOrEqual(7);
expect(x).toBeLessThanOrEqual(y);
// 特殊情况 - 见下文
expect(x < "Carl").toBe(true);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.15 中添加。

## 参考

<RuleReferences />
