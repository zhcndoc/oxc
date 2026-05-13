---
title: "vitest/require-test-timeout | Oxlint"
rule: "vitest/require-test-timeout"
category: "Restriction"
version: "1.58.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_test_timeout.rs`;
</script>

<RuleHeader />

### 它的作用

要求每个测试都指定超时时间，可以是数值形式的第三个参数、`{ timeout }` 选项，或通过 `vi.setConfig({ testTimeout: ... })` 设置。

### 为什么这不好？

没有显式超时时间的测试会依赖默认值，而默认值可能过于宽松，无法发现性能回退，或者对于较慢的 CI 环境来说又可能过短，导致不稳定的失败。

### 示例

以下是此规则下**错误**代码的示例：

```js
it("slow test", async () => {
  await doSomethingSlow();
});
```

以下是此规则下**正确**代码的示例：

```js
// good (numeric timeout)
test("slow test", async () => {
  await doSomethingSlow();
}, 1000);

// good (options object)
test("slow test", { timeout: 1000 }, async () => {
  await doSomethingSlow();
});

// good (file-level)
vi.setConfig({ testTimeout: 1000 });

test("slow test", async () => {
  await doSomethingSlow();
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.58.0 中添加。

## 参考资料

<RuleReferences />
