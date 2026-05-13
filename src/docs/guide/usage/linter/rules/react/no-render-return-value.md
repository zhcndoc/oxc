---
title: "react/no-render-return-value | Oxlint"
rule: "react/no-render-return-value"
category: "Correctness"
version: "0.0.15"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_render_return_value.rs`;
</script>

<RuleHeader />

### 作用

如果你尝试使用 `ReactDOM.render()` 的返回值，此规则会发出警告。

### 为什么这不好？

使用 `ReactDOM.render()` 的返回值属于旧版
特性，不应再使用。

请注意，`ReactDOM.render`
[在 React 19 中已被完全移除](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-render)
，因此通常不应使用。

### 示例

此规则的**错误**代码示例：

```jsx
var inst = ReactDOM.render(<App />, document.body);
function render() {
  return ReactDOM.render(<App />, document.body);
}
```

此规则的**正确**代码示例：

```jsx
ReactDOM.render(<App />, document.body);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.15 中添加。

## 参考

<RuleReferences />
