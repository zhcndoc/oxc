---
title: "vitest/prefer-spy-on | Oxlint"
rule: "vitest/prefer-spy-on"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_spy_on.rs`;
</script>

<RuleHeader />

### 它的作用

当通过覆盖属性来模拟函数时，你必须在清理时手动恢复原始实现。使用 `jest.spyOn()` 时，Jest 会跟踪这些更改，并且可以通过 `jest.restoreAllMocks()`、
`mockFn.mockRestore()` 或在 Jest 配置中将 `restoreMocks` 设置为 `true` 来恢复。

注意：`jest.spyOn()` 创建的 mock 仍然与原始函数表现相同。可以通过 `mockFn.mockImplementation()` 或其他
[模拟函数](https://jestjs.io/docs/en/mock-function-api) 来覆盖原始函数。

### 为什么这不好？

直接用 mock 函数覆盖属性可能会导致清理问题和测试隔离问题。当你手动将 mock 赋值给某个属性时，你需要负责恢复原始实现，这很容易忘记，并且可能导致测试相互干扰。使用 `jest.spyOn()` 提供了自动清理能力，使你的测试更加可靠。

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

此规则在 v0.2.14 中添加。

## 参考资料

<RuleReferences />
