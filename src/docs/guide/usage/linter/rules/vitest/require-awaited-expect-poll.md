---
title: "vitest/require-awaited-expect-poll | Oxlint"
rule: "vitest/require-awaited-expect-poll"
category: "Correctness"
version: "1.58.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_awaited_expect_poll.rs`;
</script>

<RuleHeader />

### 作用

此规则确保对 `expect.poll` 和 `expect.element` 调用返回的 promise 进行正确处理。

### 为什么这不好？

`expect.poll` 和 `expect.element` 会返回 promise。如果没有 `await` 或 `return`，
测试会在断言解析之前完成，这意味着无论断言成功还是失败，测试都会通过。

### 示例

此规则的**错误**代码示例如下：

```js
test("element exists", () => {
  asyncInjectElement();

  expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
```

此规则的**正确**代码示例如下：

```js
test("element exists", () => {
  asyncInjectElement();

  return expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
test("element exists", async () => {
  asyncInjectElement();

  await expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.58.0 中添加。

## 参考资料

<RuleReferences />
