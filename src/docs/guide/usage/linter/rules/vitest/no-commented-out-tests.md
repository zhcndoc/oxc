---
title: "vitest/no-commented-out-tests | Oxlint"
rule: "vitest/no-commented-out-tests"
category: "Suspicious"
version: "0.0.8"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_commented_out_tests.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会对被注释掉的测试发出警告。它与
`no-disabled-tests` 规则类似。

### 为什么这不好？

你可能会忘记取消注释某些测试。此规则会对被注释掉的测试发出警告。

如果测试不稳定，通常最好跳过它；如果不再需要，则删除它。

### 示例

以下是此规则**错误**代码的示例：

```javascript
// describe('foo', () => {});
// it('foo', () => {});
// test('foo', () => {});

// describe.skip('foo', () => {});
// it.skip('foo', () => {});
// test.skip('foo', () => {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
