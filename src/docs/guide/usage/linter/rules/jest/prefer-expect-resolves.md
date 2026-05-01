---
title: "jest/prefer-expect-resolves"
category: "风格"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_expect_resolves.rs`;
</script>

<RuleHeader />

### 它的作用

在测试 promise 时，优先使用 `await expect(...).resolves`，而不是 `expect(await ...)`。

### 为什么这不好？

在处理 promise 时，有两种主要方式可以测试其 resolved 值：

1. 在 `expect` 上使用 `resolve` 修饰符
   （`await expect(...).resolves.<matcher>` 风格）
2. 对 promise 使用 `await`，并断言其结果
   （`expect(await ...).<matcher>` 风格）

虽然第二种风格在一定程度上不那么依赖 `jest`，但如果 promise 被 reject，它会被当作一般错误处理，从而导致 `jest` 的行为和输出不够可预测。

此外，偏向第一种风格还能与其 `rejects` 对应项保持一致，因为不存在“await 一个 rejection”的方式。

### 示例

以下是此规则的**错误**代码示例：

```javascript
it("passes", async () => {
  expect(await someValue()).toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);
  expect(await myPromise).toBe(true);
});
```

以下是此规则的**正确**代码示例：

```javascript
it("passes", async () => {
  await expect(someValue()).resolves.toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);

  await expect(myPromise).resolves.toBe(true);
});
it("errors", async () => {
  await expect(Promise.reject(new Error("oh noes!"))).rejects.toThrowError("oh noes!");
});
```

此规则与 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-resolves.md) 兼容，
要使用它，请在你的 `.oxlintrc.json` 中添加以下配置：

```json
{
  "rules": {
    "vitest/prefer-expect-resolves": "error"
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考

<RuleReferences />
