---
title: "import/no-cycle | Oxlint"
rule: "import/no-cycle"
category: "Restriction"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_cycle.rs`;
</script>

<RuleHeader />

### 它的作用

禁止循环依赖。此规则确保不存在一条可解析的路径，能够通过其依赖关系回到
此模块。

这包括深度为 1 的循环（被导入的模块又导入了我），直到在未设置 `maxDepth` 选项时
实际上是无限的值。

### 为什么这不好？

依赖循环会导致令人困惑的架构，使错误变得难以发现。
常见的情况是导入一个由循环依赖导致的 `undefined` 值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// dep-b.js
import "./dep-a.js";
export function b() {
  /* ... */
}
```

```javascript
// dep-a.js
import { b } from "./dep-b.js"; // reported: 检测到依赖循环。
export function a() {
  /* ... */
}
```

在这个示例中，`dep-a.js` 和 `dep-b.js` 相互导入，形成了一个循环
依赖，这会带来问题。

以下是此规则的**正确**代码示例：

```javascript
// dep-b.js
export function b() {
  /* ... */
}
```

```javascript
// dep-a.js
import { b } from "./dep-b.js"; // no circular dependency
export function a() {
  /* ... */
}
```

在这个修正后的版本中，`dep-b.js` 不再导入 `dep-a.js`，从而打破了循环。

## 配置

此规则接受一个包含以下属性的配置对象：

### allowUnsafeDynamicCyclicDependency

type: `boolean`

default: `false`

如果链中至少有一个动态导入，则允许循环依赖

### ignoreExternal

type: `boolean`

default: `false`

忽略外部模块

### ignoreTypes

type: `boolean`

default: `true`

忽略仅类型导入

### maxDepth

type: `integer`

default: `Infinity`

要遍历的最大依赖深度

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.13 中添加。

## 参考资料

<RuleReferences />
