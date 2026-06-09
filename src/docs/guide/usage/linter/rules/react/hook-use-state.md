---
title: "react/hook-use-state | Oxlint"
rule: "react/hook-use-state"
category: "Style"
version: "1.59.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/hook_use_state.rs`;
</script>

<RuleHeader />

### 它的作用

确保 `useState` hook 的值变量和 setter 变量采用解构并保持对称命名。

### 为什么这是不好的？

此规则会检查从 `React.useState()` 调用中解构出的值变量和 setter 变量是否采用对称命名

### 示例

此规则的**错误**代码示例：

```jsx
import React from "react";
export default function useColor() {
  // useState 调用没有被解构为 value + setter 对
  const useStateResult = React.useState();
  return useStateResult;
}
```

```jsx
import React from "react";
export default function useColor() {
  // useState 调用已被解构为 value + setter 对，但标识符
  // 命名不符合 [thing, setThing] 命名约定
  const [color, updateColor] = React.useState();
  return [color, updateColor];
}
```

此规则的**正确**代码示例：

```jsx
import React from "react";
export default function useColor() {
  // useState 调用已被解构为 value + setter 对，其标识符
  // 符合 [thing, setThing] 命名约定
  const [color, setColor] = React.useState();
  return [color, setColor];
}
```

## 配置

### allowDestructuredState

type: `boolean`

default: `false`

当为 true 时，该规则将忽略解构出的值的名称。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.59.0 中添加。

## 参考资料

<RuleReferences />
