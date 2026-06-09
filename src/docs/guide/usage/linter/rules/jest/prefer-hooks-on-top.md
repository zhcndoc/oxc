---
title: "jest/prefer-hooks-on-top | Oxlint"
rule: "jest/prefer-hooks-on-top"
category: "Style"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_hooks_on_top.rs`;
</script>

<RuleHeader />

### 它的作用

虽然 hooks 可以在测试文件中的任何位置设置，但它们总是按特定顺序调用，这意味着如果它们与测试用例混在一起，可能会让人感到困惑。

### 为什么这很糟糕？

当 hooks 与测试用例混在一起时，测试的设置和执行顺序就会变得更难理解。这可能会导致对哪些 hooks 适用于哪些测试以及它们何时运行产生困惑。将 hooks 分组放在每个 `describe` 块的顶部，可以让测试结构更清晰，也更易于维护。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });

  it("接受此输入", () => {
    // ...
  });

  beforeAll(() => {
    createMyDatabase();
  });

  it("返回该值", () => {
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

  afterAll(() => {
    clearMyDatabase();
  });

  it("接受此输入", () => {
    // ...
  });

  it("返回该值", () => {
    // ...
  });

  describe("当数据库具有特定值时", () => {
    const specificValue = "...";

    beforeEach(() => {
      seedMyDatabase(specificValue);
    });

    beforeEach(() => {
      mockLogger();
    });

    afterEach(() => {
      clearLogger();
    });

    it("接受该输入", () => {
      // ...
    });

    it("抛出错误", () => {
      // ...
    });

    it("记录一条消息", () => {
      // ...
    });
  });
});
```

## How to use

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中加入。

## 参考资料

<RuleReferences />
