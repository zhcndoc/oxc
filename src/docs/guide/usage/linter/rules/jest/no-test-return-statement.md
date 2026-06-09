---
title: "jest/no-test-return-statement | Oxlint"
rule: "jest/no-test-return-statement"
category: "Style"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-return-statement.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_test_return_statement.rs`;
</script>

<RuleHeader />

### 作用

禁止在测试中显式返回。

### 为什么这不好？

Jest 中的测试应当是 void，并且不应返回值。
如果你返回的是 Promise，那么你应该将测试更新为使用
`async/await`。

### 示例

以下是此规则的 **错误** 代码示例：

```javascript
test("one", () => {
  return expect(1).toBe(1);
});
```

以下是此规则的 **正确** 代码示例：

```javascript
test("one", () => {
  expect(1).toBe(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.0 中添加的。

## 参考

<RuleReferences />
