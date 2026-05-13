---
title: "jest/no-deprecated-functions | Oxlint"
rule: "jest/no-deprecated-functions"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_deprecated_functions.rs`;
</script>

<RuleHeader />

### 作用

多年来，Jest 积累了一些技术债，其中包含一些函数，这些函数要么为了更清晰而被重命名，要么被更强大的 API 所替代。

此规则还可以自动修复其中若干已弃用项。

#### `jest.resetModuleRegistry`

此函数在 Jest 15 中重命名为 `resetModules`，并在 Jest 27 中移除。

#### `jest.addMatchers`

此函数在 Jest 17 中被 `expect.extend` 替代，并在 Jest 27 中移除。

#### `require.requireActual` & `require.requireMock`

这些函数在 Jest 21 中被替代，并在 Jest 26 中移除。

最初，`requireActual` 和 `requireMock` 函数被放在了 `require` 函数上。

后来，为了让类型检查器更容易处理，这些函数被移到了 `jest` 对象上，并且通过 `require` 使用它们的方式被弃用。最终，随着 Jest 26 的发布，它们被彻底从 `require` 函数中移除。

#### `jest.runTimersToTime`

此函数在 Jest 22 中重命名为 `advanceTimersByTime`，并在 Jest 27 中移除。

#### `jest.genMockFromModule`

此函数在 Jest 26 中重命名为 `createMockFromModule`，并计划在 Jest 30 中移除。

### 为什么这不好？

虽然这些已弃用函数通常会在代码库中保留若干个大版本，但最终它们会被完全移除。

### 示例

此规则的**错误**代码示例：

```javascript
jest.resetModuleRegistry; // 自 Jest 15 起
jest.addMatchers; // 自 Jest 17 起
```

## 配置

此规则接受一个具有以下属性的配置对象：

### jest

type: `object`

Jest 配置选项。
这是已弃用的配置，将在未来版本中移除。
请在 `Oxlint config file` 中改用 { "settings": { "jest": {"version": 29 } } }。
请注意，配置中的值优先级高于规则配置。

#### jest.version

type: `string`

default: `"29"`

正在使用的 Jest 版本。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
