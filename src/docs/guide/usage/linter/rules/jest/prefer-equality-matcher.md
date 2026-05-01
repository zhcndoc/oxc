---
title: "jest/prefer-equality-matcher"
category: "Style"
version: "0.2.9"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_equality_matcher.rs`;
</script>

<RuleHeader />

### 它的作用

Jest 内置了用于判断相等性的 matcher，可以让测试代码更易读；
当断言失败时，错误信息也更清晰。

### 为什么这很糟糕？

使用像 `toBe(true)` 这样的通用 matcher 来测试相等表达式，会让测试更难阅读和理解。
当测试失败时，错误信息也不够有帮助，因为它们不会展示实际值是什么。
使用更具体的相等 matcher 可以让测试意图更明确，并提供更好的调试信息。

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

此规则与 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md) 兼容，
要使用它，请在你的 `.oxlintrc.json` 中添加以下配置：

```json
{
  "rules": {
    "vitest/prefer-equality-matcher": "error"
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.9 中添加的。

## 参考资料

<RuleReferences />
