---
title: "jest/prefer-expect-assertions | Oxlint"
rule: "jest/prefer-expect-assertions"
category: "Style"
version: "1.62.0"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-assertions.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_expect_assertions.rs`;
</script>

<RuleHeader />

### 作用

要求每个测试都必须将 `expect.assertions(<number>)` 或
`expect.hasAssertions()` 作为第一条表达式。

### 为什么这不好？

如果没有显式的断言计数，包含异步代码、回调或循环的测试即使某些 `expect` 调用从未
执行到，也可能通过，从而悄悄隐藏 bug。

### 示例

以下是此规则的**错误**代码示例：

```javascript
test("no assertions", () => {
  // ...
});
test("assertions not first", () => {
  expect(true).toBe(true);
  // ...
});
```

以下是此规则的**正确**代码示例：

```javascript
test("with assertion count", () => {
  expect.assertions(1);
  expect(true).toBe(true);
});
test("with hasAssertions", () => {
  expect.hasAssertions();
  expect(true).toBe(true);
});
```

///以下是带有 `{ "onlyFunctionsWithAsyncKeyword": true }` 的**错误**代码示例：

```javascript
test("fetches data", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
```

以下是带有 `{ "onlyFunctionsWithAsyncKeyword": true }` 的**正确**代码示例：

```javascript
test("fetches data", async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
```

以下是带有 `{ "onlyFunctionsWithExpectInLoop": true }` 的**错误**代码示例：

```javascript
test("all numbers are greater than zero", () => {
  for (const number of getNumbers()) {
    expect(number).toBeGreaterThan(0);
  }
});
```

以下是带有 `{ "onlyFunctionsWithExpectInLoop": true }` 的**正确**代码示例：

```javascript
test("all numbers are greater than zero", () => {
  expect.hasAssertions();
  for (const number of getNumbers()) {
    expect(number).toBeGreaterThan(0);
  }
});
```

以下是带有 `{ "onlyFunctionsWithExpectInCallback": true }` 的**错误**代码示例：

```javascript
test("callback test", () => {
  fetchData((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

以下是带有 `{ "onlyFunctionsWithExpectInCallback": true }` 的**正确**代码示例：

```javascript
test("callback test", () => {
  expect.assertions(1);
  fetchData((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### onlyFunctionsWithAsyncKeyword

type: `boolean`

default: `false`

### onlyFunctionsWithExpectInCallback

type: `boolean`

default: `false`

### onlyFunctionsWithExpectInLoop

type: `boolean`

default: `false`

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.62.0 中添加。

## 参考资料

<RuleReferences />
