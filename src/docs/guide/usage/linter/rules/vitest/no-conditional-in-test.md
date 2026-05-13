---
title: "vitest/no-conditional-in-test | Oxlint"
rule: "vitest/no-conditional-in-test"
category: "Pedantic"
version: "0.8.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_conditional_in_test.rs`;
</script>

<RuleHeader />

### 作用

禁止在测试中使用条件语句。

### 为什么这不好？

测试中的条件语句会让测试更难阅读和理解。
每个测试函数最好只包含一个测试用例。

### 示例

以下是此规则的**错误**代码示例：

```js
it("foo", () => {
  if (true) {
    doTheThing();
  }
});

it("bar", () => {
  switch (mode) {
    case "none":
      generateNone();
    case "single":
      generateOne();
    case "multiple":
      generateMany();
  }

  expect(fixtures.length).toBeGreaterThan(-1);
});

it("baz", async () => {
  const promiseValue = () => {
    return something instanceof Promise ? something : Promise.resolve(something);
  };

  await expect(promiseValue()).resolves.toBe(1);
});
```

以下是此规则的**正确**代码示例：

```js
describe("my tests", () => {
  if (true) {
    it("foo", () => {
      doTheThing();
    });
  }
});

beforeEach(() => {
  switch (mode) {
    case "none":
      generateNone();
    case "single":
      generateOne();
    case "multiple":
      generateMany();
  }
});

it("bar", () => {
  expect(fixtures.length).toBeGreaterThan(-1);
});

const promiseValue = (something) => {
  return something instanceof Promise ? something : Promise.resolve(something);
};

it("baz", async () => {
  await expect(promiseValue()).resolves.toBe(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.8.0。

## 参考资料

<RuleReferences />
