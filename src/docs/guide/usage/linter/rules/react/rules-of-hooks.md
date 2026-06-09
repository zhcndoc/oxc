---
title: "react/rules-of-hooks | Oxlint"
rule: "react/rules-of-hooks"
category: "Pedantic"
version: "0.3.3"
default: false
type_aware: false
fix: "none"
upstream: "https://react.dev/reference/rules/rules-of-hooks"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/rules_of_hooks.rs`;
</script>

<RuleHeader />

### 它的作用

强制执行 Hooks 规则，确保 React Hooks 只在有效上下文中并且以正确的顺序被调用。

### 为什么这不好？

React Hooks 必须遵循特定规则，才能确保它们正常工作：

1. 只在顶层调用 Hooks（绝不要在循环、条件语句
   或嵌套函数中调用）
2. 只从 React 函数组件或自定义 Hooks 中调用 Hooks
3. 每次组件渲染时，Hooks 都必须以相同的顺序被调用

违反这些规则可能会导致状态损坏，或者组件行为变得不可预测。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 不要在循环、条件语句或嵌套函数中调用 Hooks
function BadComponent() {
  if (condition) {
    const [state, setState] = useState(); // ❌ 条件中的 Hook
  }

  for (let i = 0; i < 10; i++) {
    useEffect(() => {}); // ❌ 循环中的 Hook
  }
}

// 不要从普通 JavaScript 函数中调用 Hooks
function regularFunction() {
  const [state, setState] = useState(); // ❌ 普通函数中的 Hook
}
```

以下是此规则的**正确**代码示例：

```javascript
// ✅ 在 React 组件的顶层调用 Hooks
function GoodComponent() {
  const [state, setState] = useState();

  useEffect(() => {
    // 此处为副作用逻辑
  });

  return <div>{state}</div>;
}

// ✅ 从自定义 Hooks 中调用 Hooks
function useCustomHook() {
  const [state, setState] = useState();
  return state;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.3 中添加。

## 参考资料

<RuleReferences />
