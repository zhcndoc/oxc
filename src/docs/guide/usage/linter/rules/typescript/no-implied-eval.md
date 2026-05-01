---
title: "typescript/no-implied-eval"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_implied_eval.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_implied_eval/no_implied_eval.go`;
</script>

<RuleHeader />

### 作用

此规则禁止使用类似 eval 的方法。

### 为什么这不好？

在 JavaScript 中避免使用 `eval()` 被认为是一种良好实践。这样做会带来安全和性能方面的影响，因此许多 linter 建议禁止使用 `eval()`。不过，还有一些其他方式可以传入字符串并将其解释为 JavaScript 代码，它们也有类似的风险。

### 示例

此规则的**错误**代码示例：

```ts
setTimeout('alert("Hi!");', 100);

setInterval('alert("Hi!");', 100);

setImmediate('alert("Hi!")');

window.setTimeout("count = 5", 10);

window.setInterval("foo = bar", 10);

const fn = new Function("a", "b", "return a + b");
```

此规则的**正确**代码示例：

```ts
setTimeout(() => {
  alert("Hi!");
}, 100);

setInterval(() => {
  alert("Hi!");
}, 100);

setImmediate(() => {
  alert("Hi!");
});

const fn = (a: number, b: number) => a + b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中新增。

## 参考资料

<RuleReferences />
