---
title: "react/only-export-components | Oxlint"
rule: "react/only-export-components"
category: "Restriction"
version: "1.23.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/ArnaudBarre/eslint-plugin-react-refresh/blob/main/docs/only-export-components.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/only_export_components.rs`;
</script>

<RuleHeader />

### 作用

确保模块只**导出 React 组件（以及相关的 HMR 安全项）**，从而使
Fast Refresh（又称热重载）能够安全地保留组件状态。
具体来说，它会校验模块导出的形状和常见入口点
（例如 `createRoot(...).render(<App />)`），以匹配像
`react-refresh` 这样的集成所期望的形式。

此规则基于 `eslint-plugin-react-refresh` 中的规则。

### 为什么这不好？

只有当模块导出组件，并且避免会让刷新运行时产生混淆的模式时，Fast Refresh 才能可靠地保留状态。存在问题的模式（例如 `export *`、匿名默认函数、导出 JSX 数组，或以不受支持的方式混合非组件导出）会导致：

- 组件在编辑时重新挂载并丢失状态
- 更新被遗漏（不刷新）或触发过于广泛的重新加载
- 脆弱的 HMR 行为，在不同打包器之间表现不一致

通过强制使用可预测的导出方式，开发期间的编辑会保持快速且保留状态。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// 1) 将工具函数与组件以不受支持的方式混合导出
export const foo = () => {}; // 工具函数，不是组件
export const Bar = () => <></>; // 组件
```

```jsx
// 2) 匿名默认导出（需要名称）
export default function () {}
```

```jsx
// 3) 重新导出所有内容会隐藏实际导出的内容
export * from "./foo";
```

```jsx
// 4) 导出 JSX 集合会使组件无法被发现
const Tab = () => null;
export const tabs = [<Tab />, <Tab />];
```

```jsx
// 5) 在定义组件的同一模块中引导 root
const App = () => null;
createRoot(document.getElementById("root")).render(<App />);
```

以下是此规则的**正确**代码示例：

```jsx
// 带名称或默认导出的组件都可以
export default function Foo() {
  return null;
}
```

```jsx
// 如果配置或命名约定允许，工具函数也可以共存
const foo = () => {};
export const Bar = () => null;
```

```jsx
// 入口文件可以渲染一个已导入的组件
import { App } from "./App";
createRoot(document.getElementById("root")).render(<App />);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowConstantExport

type: `boolean`

default: `false`

允许在导出组件的同时导出原始常量（字符串/数字/布尔值/模板字面量），而不会触发违规。推荐在你的打包器 Fast Refresh 集成支持此行为时使用（由插件的 `vite` 预设启用）。

```jsx
// 当 allowConstantExport: true 时允许
export const VERSION = "3";
export const Foo = () => null;
```

### allowExportNames

type: `string[]`

default: `[]`

将特定的命名导出视为 HMR 安全（适用于会热替换某些导出的框架）。例如，在 Remix 中：
`{ "allowExportNames": ["meta", "links", "headers", "loader", "action"] }`

### checkJS

type: `boolean`

default: `false`

检查包含 JSX 的 `.js` 文件（除 `.tsx`/`.jsx` 外）。为减少误报，启用此项时只检查导入了 React 的文件。

### customHOCs

type: `string[]`

default: `[]`

如果你导出的组件包裹了自定义高阶组件，请在此列出它们的标识符，以避免误报。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.23.0 中添加。

## 参考资料

<RuleReferences />
