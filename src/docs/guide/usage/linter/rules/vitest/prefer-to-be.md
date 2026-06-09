---
title: "vitest/prefer-to-be | Oxlint"
rule: "vitest/prefer-to-be"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_be.rs`;
</script>

<RuleHeader />

### 它的作用

建议对原始字面量使用 `toBe` 匹配器，对 `null`、`undefined` 和 `NaN`
使用特定的匹配器。

### 为什么这不好？

当断言诸如数字和字符串之类的原始字面量时，
各种相等性匹配器的行为都相同，但在代码中的表达略有不同。

此规则建议在这些情况下使用 `toBe` 匹配器，因为
它能形成最符合语法习惯的句子。对于 `null`、
`undefined` 和 `NaN`，此规则建议使用它们各自特定的 `toBe`
匹配器，因为它们也能提供更好的错误信息。

### 示例

此规则的**错误**代码示例：

```javascript
expect(value).not.toEqual(5);
expect(getMessage()).toStrictEqual("hello world");
expect(loadMessage()).resolves.toEqual("hello world");
```

此规则的**正确**代码示例：

```javascript
expect(value).not.toBe(5);
expect(getMessage()).toBe("hello world");
expect(loadMessage()).resolves.toBe("hello world");
expect(didError).not.toBe(true);
expect(catchError()).toStrictEqual({ message: "oh noes!" });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.14 中添加。

## 参考资料

<RuleReferences />
