---
title: "jest/prefer-to-be | Oxlint"
rule: "jest/prefer-to-be"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_to_be.rs`;
</script>

<RuleHeader />

### 作用

建议对原始字面量使用 `toBe` 匹配器，并对 `null`、`undefined` 和 `NaN` 使用特定的匹配器。

### 为什么这不好？

当对数字和字符串等原始字面量进行断言时，所有相等性匹配器的行为都相同，但在代码中的读法略有不同。

该规则建议在这些情况下使用 `toBe` 匹配器，因为它形成的句子最符合语法习惯。对于 `null`、`undefined` 和 `NaN`，该规则建议使用它们各自特定的 `toBe` 匹配器，因为它们也能提供更好的错误信息。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect(value).not.toEqual(5);
expect(getMessage()).toStrictEqual("hello world");
expect(loadMessage()).resolves.toEqual("hello world");
```

以下是此规则的**正确**代码示例：

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

此规则在 v0.2.14 中加入。

## 参考资料

<RuleReferences />
