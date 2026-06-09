---
title: "vitest/require-local-test-context-for-concurrent-snapshots | Oxlint"
rule: "vitest/require-local-test-context-for-concurrent-snapshots"
category: "Correctness"
version: "0.8.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-local-test-context-for-concurrent-snapshots.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_local_test_context_for_concurrent_snapshots.rs`;
</script>

<RuleHeader />

### 它的作用

该规则旨在确保并发快照测试在正确配置的本地测试上下文中执行。

### 为什么这不好？

在没有正确上下文的情况下并发运行快照测试，可能会导致快照不可靠或不一致。确保并发测试使用合适的上下文正确配置，有助于维护准确且稳定的快照，避免潜在的冲突或失败。

### 示例

该规则的**错误**代码示例：

```javascript
test.concurrent("myLogic", () => {
  expect(true).toMatchSnapshot();
});

describe.concurrent("something", () => {
  test("myLogic", () => {
    expect(true).toMatchInlineSnapshot();
  });
});
```

该规则的**正确**代码示例：

```javascript
test.concurrent("myLogic", ({ expect }) => {
  expect(true).toMatchSnapshot();
});

test.concurrent("myLogic", (context) => {
  context.expect(true).toMatchSnapshot();
});
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v0.8.0 中添加。

## 参考资料

<RuleReferences />
