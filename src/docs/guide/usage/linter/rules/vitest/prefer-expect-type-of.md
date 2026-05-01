---
title: "vitest/prefer-expect-type-of"
category: "Style"
version: "1.44.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_expect_type_of.rs`;
</script>

<RuleHeader />

### 作用

强制使用 [`expectTypeOf`](https://vitest.dev/api/expect-typeof) 而不是 `expect(typeof ...)`。

### 为什么这不好？

与使用 `expect(typeof ...)` 相比，Vitest 提供了一种更具表现力、类型更安全的方式来测试类型。

### 示例

以下是此规则的**错误**代码示例：

```js
test('type checking', () => {
  expect(typeof 'hello').toBe('string')
  expect(typeof 42).toBe('number')
  expect(typeof true).toBe('boolean')
  expect(typeof {}).toBe('object')
  expect(typeof () => {}).toBe('function')
  expect(typeof Symbol()).toBe('symbol')
  expect(typeof 123n).toBe('bigint')
  expect(typeof undefined).toBe('undefined')
})
```

以下是此规则的**正确**代码示例：

```js
test("type checking", () => {
  expectTypeOf("hello").toBeString();
  expectTypeOf(42).toBeNumber();
  expectTypeOf(true).toBeBoolean();
  expectTypeOf({}).toBeObject();
  expectTypeOf(() => {}).toBeFunction();
  expectTypeOf(Symbol()).toBeSymbol();
  expectTypeOf(123n).toBeBigInt();
  expectTypeOf(undefined).toBeUndefined();
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已于 v1.44.0 中添加。

## 参考资料

<RuleReferences />
