---
title: "vitest/prefer-equality-matcher | Oxlint"
rule: "vitest/prefer-equality-matcher"
category: "样式"
version: "0.2.9"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_equality_matcher.rs`;
</script>

<RuleHeader />

### 它的作用

Jest 为期望相等性提供了内置的匹配器，这使测试更易读，
如果断言失败，错误信息也更清晰。

### 为什么这不好？

使用像 `toBe(true)` 这样的通用匹配器来测试相等表达式，
会让测试更难阅读和理解。当测试失败时，错误信息也不够有帮助，
因为它们不会显示实际值是什么。使用特定的相等匹配器可以提供更清晰的测试意图和
更好的调试信息。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(x === 5).toBe(true);
expect(name === "Carl").not.toEqual(true);
expect(myObj !== thatObj).toStrictEqual(true);
```

以下是此规则的**正确**代码示例：

```javascript
expect(x).toBe(5);
expect(name).not.toEqual("Carl");
expect(myObj).toStrictEqual(thatObj);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.9 中添加的。

## 参考资料

<RuleReferences />
