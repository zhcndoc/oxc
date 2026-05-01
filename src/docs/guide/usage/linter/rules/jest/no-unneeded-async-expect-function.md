---
title: "jest/no-unneeded-async-expect-function"
category: "Style"
version: "1.39.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_unneeded_async_expect_function.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对预期的 promises 使用不必要的 async 函数包装器。

### 为什么这不好？

当 async 包装器中的唯一语句是 `await someCall()` 时，
应当直接将该调用传递给 `expect`。这使测试代码更简洁，
也更容易阅读。

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

此规则与 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-unneeded-async-expect-function.md) 兼容，
如需使用，请在你的 `.oxlintrc.json` 中添加以下配置：

```json
{
  "rules": {
    "vitest/no-unneeded-async-expect-function": "error"
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.39.0 中添加。

## 参考资料

<RuleReferences />
