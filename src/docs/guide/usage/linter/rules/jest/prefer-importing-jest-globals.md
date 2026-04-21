---
title: "jest/prefer-importing-jest-globals"
category: "风格"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_importing_jest_globals.rs`;
</script>

<RuleHeader />

### 作用

更倾向于从 `@jest/globals` 导入 Jest 全局变量（`describe`、`test`、`expect` 等），
而不是依赖环境中的全局变量。

### 为什么这不好？

在没有显式导入的情况下使用全局 Jest 函数，会让依赖变得
隐式，并且在类型检查、编辑器工具支持，以及
在不同测试运行器之间迁移时，都可能引发问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("suite", () => {
  test("foo");
  expect(true).toBeDefined();
});
```

以下是此规则的**正确**代码示例：

```javascript
import { describe, expect, test } from "@jest/globals";
describe("suite", () => {
  test("foo");
  expect(true).toBeDefined();
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### types

type: `array`

default: `["hook", "describe", "test", "expect", "jest", "unknown"]`

要强制导入的 Jest 函数类型。

#### types[n]

type: `"hook" | "describe" | "test" | "expect" | "jest" | "unknown"`

## 如何使用

<RuleHowToUse />

## 参考资料

<RuleReferences />
