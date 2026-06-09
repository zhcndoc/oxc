---
title: "vitest/prefer-each | Oxlint"
rule: "vitest/prefer-each"
category: "Style"
version: "0.9.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-each.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_each.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制使用 `each`，而不是手动循环。

### 这为什么不好？

用于测试的手动循环可读性较差，也更容易出错。使用
`each` 提供了一种更清晰、更简洁的方式来运行参数化测试，
从而提高可读性和可维护性。

### 示例

此规则的**错误**代码示例：

```js
for (const item of items) {
  describe(item, () => {
    expect(item).toBe("foo");
  });
}
```

此规则的**正确**代码示例：

```js
describe.each(items)("item", (item) => {
  expect(item).toBe("foo");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.9.0 中添加。

## 参考资料

<RuleReferences />
