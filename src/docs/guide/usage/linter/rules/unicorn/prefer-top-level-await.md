---
title: "unicorn/prefer-top-level-await | Oxlint"
rule: "unicorn/prefer-top-level-await"
category: "Pedantic"
version: "1.20.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_top_level_await.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用顶层 await，而不是顶层 Promise 和 async 函数调用。

### 为什么这不好？

顶层 await 更易读，并且可以防止未处理的拒绝。

### 示例

以下是此规则的**错误**代码示例：

```js
(async () => {
  await run();
})();

run().catch((error) => {
  console.error(error);
});
```

以下是此规则的**正确**代码示例：

```js
await run();

try {
  await run();
} catch (error) {
  console.error(error);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.20.0 中添加。

## 参考资料

<RuleReferences />
