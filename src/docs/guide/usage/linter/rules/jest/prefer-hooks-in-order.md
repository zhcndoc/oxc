---
title: "jest/prefer-hooks-in-order | Oxlint"
rule: "jest/prefer-hooks-in-order"
category: "Style"
version: "0.6.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_hooks_in_order.rs`;
</script>

<RuleHeader />

### 它的作用

确保 hooks 的顺序与它们被调用的顺序一致。

### 为什么这不好？

虽然 hooks 可以按任意顺序设置，但 `jest` 总是按以下特定顺序调用它们：

1. `beforeAll`
2. `beforeEach`
3. `afterEach`
4. `afterAll`

此规则通过强制将分组的 hooks 按照该顺序在测试中设置，来使这一点更加明显。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });
  beforeAll(() => {
    createMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
  it("returns that value", () => {
    // ...
  });
  describe("when the database has specific values", () => {
    const specificValue = "...";
    beforeEach(() => {
      seedMyDatabase(specificValue);
    });
    it("accepts that input", () => {
      // ...
    });
    it("throws an error", () => {
      // ...
    });
    afterEach(() => {
      clearLogger();
    });
    beforeEach(() => {
      mockLogger();
    });
    it("logs a message", () => {
      // ...
    });
  });
  afterAll(() => {
    removeMyDatabase();
  });
});
```

以下是此规则的**正确**代码示例：

```javascript
describe("foo", () => {
  beforeAll(() => {
    createMyDatabase();
  });
  beforeEach(() => {
    seedMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
  it("returns that value", () => {
    // ...
  });
  describe("when the database has specific values", () => {
    const specificValue = "...";
    beforeEach(() => {
      seedMyDatabase(specificValue);
    });
    it("accepts that input", () => {
      // ...
    });
    it("throws an error", () => {
      // ...
    });
    beforeEach(() => {
      mockLogger();
    });
    afterEach(() => {
      clearLogger();
    });
    it("logs a message", () => {
      // ...
    });
  });
  afterAll(() => {
    removeMyDatabase();
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.6.0 中添加。

## 参考资料

<RuleReferences />
