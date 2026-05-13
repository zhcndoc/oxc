---
title: "vitest/no-unneeded-async-expect-function | Oxlint"
rule: "vitest/no-unneeded-async-expect-function"
category: "Style"
version: "1.39.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_unneeded_async_expect_function.rs`;
</script>

<RuleHeader />

### 作用

禁止为期望的 promises 使用不必要的 async 函数包装器。

### 为什么这不好？

当 async 包装器中的唯一语句是 `await someCall()` 时，
应该直接将该调用传递给 `expect`。这样可以让
测试代码更简洁，也更易读。

### 示例

以下是此规则的**错误**代码示例：

```js
await expect(async () => {
  await doSomethingAsync();
}).rejects.toThrow();

await expect(async () => await doSomethingAsync()).rejects.toThrow();
```

以下是此规则的**正确**代码示例：

```js
await expect(doSomethingAsync()).rejects.toThrow();
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.39.0 中添加。

## 参考资料

<RuleReferences />
