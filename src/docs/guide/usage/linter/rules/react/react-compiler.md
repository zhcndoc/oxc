---
title: "react/react-compiler | Oxlint"
rule: "react/react-compiler"
category: "Nursery"
version: "1.70.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-compiler.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/react_compiler.rs`;
</script>

<RuleHeader />

### 它的作用

以仅 lint 模式运行 React Compiler 的分析，并报告违反 React 规则的代码——例如有条件地调用 hooks、在渲染期间调用 setState、在渲染期间访问 refs，或修改 props 和 state。

此规则显示与 `eslint-plugin-react-compiler` 相同的诊断。

::: warning
此规则处于实验阶段，后续会进行调整以便更好地适配 Oxlint。
:::

### 为什么这不好？

违反 React 规则的代码在运行时可能出现不可预测的行为（陈旧的 UI、无限重渲染循环、状态丢失），并会阻止 React Compiler 对组件进行优化。遵循这些规则可以保持组件正确，并允许它们被自动 memoize。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Component(props) {
  if (props.cond) {
    useState(0); // hooks 不能有条件地调用
  }
  return <div>{props.text}</div>;
}
```

```jsx
function Component() {
  const ref = useRef(null);
  return <div>{ref.current}</div>; // refs 不能在渲染期间读取
}
```

以下是此规则的**正确**代码示例：

```jsx
function Component(props) {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(state + 1)}>{props.text}</button>;
}
```

## 配置

此规则接受一个配置对象，包含以下属性：

### reportAllBailouts

类型：`boolean`

默认值：`false`

同时报告编译器放弃优化的情况——即 React Compiler 跳过某个组件或 Hook 的位置（例如因为存在不支持的语法），但未发现规则违规。这些情况并不表示代码有误，只是表示编译器选择不对这段代码进行优化。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.70.0 中添加的。

## 参考资料

<RuleReferences />
