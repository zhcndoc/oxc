---
title: "jest/prefer-spy-on | Oxlint"
rule: "jest/prefer-spy-on"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_spy_on.rs`;
</script>

<RuleHeader />

### 它的作用

当通过覆盖属性来模拟函数时，在清理时你必须手动恢复原始实现。使用 `jest.spyOn()` 时，Jest 会跟踪这些变更，并且可以通过 `jest.restoreAllMocks()`、`mockFn.mockRestore()` 或在 Jest 配置中将 `restoreMocks` 设为 `true` 来恢复。

注意：`jest.spyOn()` 创建的 mock 仍然与原始函数表现相同。原始函数可以通过 `mockFn.mockImplementation()` 或其他一些
[模拟函数](https://jestjs.io/docs/en/mock-function-api) 来覆盖。

### 为什么这很糟糕？

直接用 mock 函数覆盖属性会导致清理问题和测试隔离问题。当你手动将 mock 赋值给某个属性时，你需要负责恢复原始实现，这很容易忘记，并且可能导致测试相互干扰。使用 `jest.spyOn()` 提供了自动清理能力，并使你的测试更加可靠。

### 示例

以下是此规则的**错误**代码示例：

```javascript
Date.now = jest.fn();
Date.now = jest.fn(() => 10);
```

以下是此规则的**正确**代码示例：

```javascript
jest.spyOn(Date, "now");
jest.spyOn(Date, "now").mockImplementation(() => 10);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考

<RuleReferences />
