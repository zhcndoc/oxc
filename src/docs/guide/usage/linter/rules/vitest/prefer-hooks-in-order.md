---
title: "vitest/prefer-hooks-in-order | Oxlint"
rule: "vitest/prefer-hooks-in-order"
category: "Style"
version: "0.6.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-in-order.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_hooks_in_order.rs`;
</script>

<RuleHeader />

### 它的作用

确保 hooks 按照它们被调用的顺序排列。

### 为什么这不好？

虽然 hooks 可以以任意顺序设置，但 `jest` 总是按以下特定顺序调用它们：

1. `beforeAll`
2. `beforeEach`
3. `afterEach`
4. `afterAll`

该规则旨在通过强制分组的 hooks 在测试中按该顺序设置，使这一点更加明显。

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
  it("接受此输入", () => {
    // ...
  });
  it("返回那个值", () => {
    // ...
  });
  describe("当数据库具有特定值时", () => {
    const specificValue = "...";
    beforeEach(() => {
      seedMyDatabase(specificValue);
    });
    it("接受该输入", () => {
      // ...
    });
    it("抛出错误", () => {
      // ...
    });
    afterEach(() => {
      clearLogger();
    });
    beforeEach(() => {
      mockLogger();
    });
    it("记录一条消息", () => {
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
  it("接受此输入", () => {
    // ...
  });
  it("返回那个值", () => {
    // ...
  });
  describe("当数据库具有特定值时", () => {
    const specificValue = "...";
    beforeEach(() => {
      seedMyDatabase(specificValue);
    });
    it("接受该输入", () => {
      // ...
    });
    it("抛出错误", () => {
      // ...
    });
    beforeEach(() => {
      mockLogger();
    });
    afterEach(() => {
      clearLogger();
    });
    it("记录一条消息", () => {
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

此规则于 v0.6.0 中添加。

## 参考

<RuleReferences />
