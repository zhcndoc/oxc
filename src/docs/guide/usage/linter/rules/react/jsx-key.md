---
title: "react/jsx-key | Oxlint"
rule: "react/jsx-key"
category: "Correctness"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_key.rs`;
</script>

<RuleHeader />

### 它的作用

强制数组中的元素使用 `key` prop。

### 为什么这不好？

React [要求提供 `key` prop](https://react.dev/learn/rendering-lists#rendering-data-from-arrays)
，以便帮助识别哪些项已更改、已添加或已删除。

### 示例

以下是此规则的**错误**代码示例：

```jsx
[1, 2, 3].map((x) => <App />);
[1, 2, 3]?.map((x) => <ListItem />);
```

以下是此规则的**正确**代码示例：

```jsx
[1, 2, 3].map((x) => <App key={x} />);
[1, 2, 3]?.map((x) => <ListItem key={x} />);
```

注意：此规则的选项默认值与原始 ESLint 插件中的默认值不同。出于正确性考虑，建议将
所有选项都保持为 `true`，但如果你希望在从 ESLint 迁移时获得行为
一致性，也可以将它们改回 `false`。

## 配置

此规则接受一个包含以下属性的配置对象：

### checkFragmentShorthand

类型：`boolean`

默认值：`true`

当为 true 时，检查片段简写 `<>` 是否存在 key

### checkKeyMustBeforeSpread

类型：`boolean`

默认值：`true`

当为 true 时，要求 key prop 必须放在任何展开属性之前

### warnOnDuplicates

类型：`boolean`

默认值：`true`

当为 true 时，警告重复的 key 值

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
