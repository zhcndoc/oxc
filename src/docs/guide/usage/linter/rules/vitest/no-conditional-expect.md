---
title: "vitest/no-conditional-expect | Oxlint"
rule: "vitest/no-conditional-expect"
category: "正确性"
version: "0.0.12"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_conditional_expect.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止在条件块中使用 `expect`，例如 `if` 和 `catch`。
这也包括在名为 `catch` 的函数回调中使用 `expect`，这些函数会被视为 promise。

### 为什么这不好？

Jest 只会在测试抛出错误时才认为测试失败，这意味着如果在诸如 `catch` 语句之类的条件代码中调用
像 `expect` 这样的断言函数，测试最终可能会通过，但实际上并没有测试任何内容。此外，条件判断
往往会让测试更脆弱、更复杂，因为它们增加了理解实际测试内容所需的思考量。

### 示例

以下是此规则的**错误**代码示例：

```js
it("foo", () => {
  doTest && expect(1).toBe(2);
});

it("bar", () => {
  if (!skipTest) {
    expect(1).toEqual(2);
  }
});

it("baz", async () => {
  try {
    await foo();
  } catch (err) {
    expect(err).toMatchObject({ code: "MODULE_NOT_FOUND" });
  }
});

it("throws an error", async () => {
  await foo().catch((error) => expect(error).toBeInstanceOf(error));
});
```

以下是此规则的**正确**代码示例：

```js
it("foo", () => {
  expect(!value).toBe(false);
});

function getValue() {
  if (process.env.FAIL) {
    return 1;
  }
  return 2;
}

it("foo", () => {
  expect(getValue()).toBe(2);
});

it("validates the request", () => {
  try {
    processRequest(request);
  } catch {
  } finally {
    expect(validRequest).toHaveBeenCalledWith(request);
  }
});

it("throws an error", async () => {
  await expect(foo).rejects.toThrow(Error);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.12 中添加。

## 参考

<RuleReferences />
