---
title: "react/no-deriving-state-in-effects | Oxlint"
rule: "react/no-deriving-state-in-effects"
category: "Perf"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deriving-state-in-effects.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_deriving_state_in_effects.rs`;
</script>

<RuleHeader />

### 作用

禁止在 effect 中从状态派生值并将其存回状态；派生值应在渲染期间计算。

由 React Compiler 提供支持，该编译器会针对每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/no-deriving-state-in-effects`](https://react.dev/reference/eslint-plugin-react-hooks/lints/no-deriving-state-in-effects)。

### 为什么这是不好的做法？

在 effect 中派生状态会导致每次更新都额外进行一次渲染，并使派生副本与其来源失去同步。

### 示例

此规则的**错误**代码示例：

```jsx
import { useEffect, useState } from "react";
function Component() {
  const [firstName] = useState("Taylor");
  const [lastName] = useState("Swift");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);
  return <div>{fullName}</div>;
}
```

此规则的**正确**代码示例：

```jsx
function Component({ firstName, lastName }) {
  const fullName = firstName + " " + lastName;
  return <div>{fullName}</div>;
}
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考资料

<RuleReferences />
