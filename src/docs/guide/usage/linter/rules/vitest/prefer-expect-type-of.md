---
title: "vitest/prefer-expect-type-of | Oxlint"
rule: "vitest/prefer-expect-type-of"
category: "Style"
version: "1.44.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-type-of.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_expect_type_of.rs`;
</script>

<RuleHeader />

### 作用

强制使用 [`toBeTypeOf`](https://vitest.dev/api/expect#tobetypeof) 而不是 `expect(typeof ...).toBe(...)`。

### 为什么这不好？

`expect(typeof value).toBe(type)` 可以工作，但写法别扭，而且失败信息很差。
Vitest 内置的 `toBeTypeOf` 匹配器执行的是相同的 `typeof` 比较，但 API 更清晰，错误输出也更好。

### 示例

以下是此规则的**错误**代码示例：

```js
test("type checking", () => {
  expect(typeof "hello").toBe("string");
  expect(typeof 42).toBe("number");
  expect(typeof true).toBe("boolean");
  expect(typeof {}).toBe("object");
  expect(typeof (() => {})).toBe("function");
  expect(typeof Symbol()).toBe("symbol");
  expect(typeof 123n).toBe("bigint");
  expect(typeof undefined).toBe("undefined");
});
```

以下是此规则的**正确**代码示例：

```js
test("type checking", () => {
  expect("hello").toBeTypeOf("string");
  expect(42).toBeTypeOf("number");
  expect(true).toBeTypeOf("boolean");
  expect({}).toBeTypeOf("object");
  expect(() => {}).toBeTypeOf("function");
  expect(Symbol()).toBeTypeOf("symbol");
  expect(123n).toBeTypeOf("bigint");
  expect(undefined).toBeTypeOf("undefined");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已于 v1.44.0 中添加。

## 参考资料

<RuleReferences />
