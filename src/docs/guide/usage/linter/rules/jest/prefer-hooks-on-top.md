---
title: "jest/prefer-hooks-on-top"
category: "风格"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
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

  it("accepts this input", () => {
    // ...
  });

  beforeAll(() => {
    createMyDatabase();
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

  afterAll(() => {
    clearMyDatabase();
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

    beforeEach(() => {
      mockLogger();
    });

    afterEach(() => {
      clearLogger();
    });

    it("accepts that input", () => {
      // ...
    });

    it("throws an error", () => {
      // ...
    });

    it("logs a message", () => {
      // ...
    });
  });
});
```

此规则与 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md) 兼容，
要使用它，请将以下配置添加到你的 `.oxlintrc.json` 中：

```json
{
  "rules": {
    "vitest/prefer-hooks-on-top": "error"
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中加入。

## 参考资料

<RuleReferences />
