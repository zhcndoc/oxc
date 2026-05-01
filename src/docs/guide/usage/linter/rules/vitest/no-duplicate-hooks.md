---
title: "vitest/no-duplicate-hooks"
category: "Style"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_duplicate_hooks.rs`;
</script>

<RuleHeader />

### 作用

禁止在 describe 块中出现重复的 hooks。

### 为什么这很糟糕？

在 describe 块中存在重复的 hooks 可能会导致混淆和意外行为。
当同一类型的多个 hooks 存在时，它们都会按顺序执行，这会让人
难以理解测试设置流程，并可能导致冗余或冲突的
操作。这会使测试更难维护和调试。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("foo", () => {
  beforeEach(() => {
    // 某些设置
  });
  beforeEach(() => {
    // 某些设置
  });
  test("foo_test", () => {
    // 某些测试
  });
});

// 嵌套 describe 场景
describe("foo", () => {
  beforeEach(() => {
    // 某些设置
  });
  test("foo_test", () => {
    // 某些测试
  });
  describe("bar", () => {
    test("bar_test", () => {
      afterAll(() => {
        // 某些清理
      });
      afterAll(() => {
        // 某些清理
      });
    });
  });
});
```

以下是此规则的**正确**代码示例：

```javascript
describe("foo", () => {
  beforeEach(() => {
    // 某些设置
  });
  test("foo_test", () => {
    // 某些测试
  });
});

// 嵌套 describe 场景
describe("foo", () => {
  beforeEach(() => {
    // 某些设置
  });
  test("foo_test", () => {
    // 某些测试
  });
  describe("bar", () => {
    test("bar_test", () => {
      beforeEach(() => {
        // 某些设置
      });
    });
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.0 中添加。

## 参考资料

<RuleReferences />
