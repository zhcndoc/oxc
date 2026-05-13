---
title: "oxc/no-async-await | Oxlint"
rule: "oxc/no-async-await"
category: "Restriction"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_async_await.rs`;
</script>

<RuleHeader />

### 作用

不允许使用 `async`/`await`。

在现代 JavaScript/TypeScript 代码库中，除非有充分理由，否则通常不应使用此规则。

### 这为什么不好？

此规则适用于不支持 `async`/`await` 语法的环境，或者当你希望强制使用 promises 或其他异步模式时。它也可用于保持使用替代异步模式的代码库中的一致性。

### 示例

此规则的**错误**代码示例：

```javascript
async function foo() {
  await bar();
  return baz();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.4.2 中添加的。

## 参考资料

<RuleReferences />
