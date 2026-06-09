---
title: "jest/no-confusing-set-timeout | Oxlint"
rule: "jest/no-confusing-set-timeout"
category: "Style"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-confusing-set-timeout.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_confusing_set_timeout.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对 `jest.setTimeout` 的混淆性使用。

### 为什么这不好？

- 在全局作用域之外的任何地方调用
- 多次调用
- 在其他 Jest 函数之后调用，例如 hooks、`describe`、`test` 或 `it`

### 示例

以下均为无效示例：

```javascript
escribe("test foo", () => {
  jest.setTimeout(1000);
  it("test-description", () => {
    // 测试逻辑；
  });
});

describe("test bar", () => {
  it("test-description", () => {
    jest.setTimeout(1000);
    // 测试逻辑；
  });
});

test("foo-bar", () => {
  jest.setTimeout(1000);
});

describe("unit test", () => {
  beforeEach(() => {
    jest.setTimeout(1000);
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.14 中添加。

## 参考资料

<RuleReferences />
