---
title: "react/exhaustive-deps | Oxlint"
rule: "react/exhaustive-deps"
category: "正确性"
version: "0.12.0"
default: false
type_aware: false
fix: "fixable_dangerous_fix_or_suggestion"
upstream: "https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/exhaustive_deps.rs`;
</script>

<RuleHeader />

### 作用

检查诸如 `useEffect` 之类的 Hooks 的依赖项列表。

### 为什么这不好？

像 `useEffect` 这样的 React Hooks 需要将依赖项列表作为参数传入。这个列表用于判断副作用何时需要重新运行。如果列表缺失或不完整，副作用可能会比必要时更频繁地运行，或者根本不运行。

### 示例

此规则的**错误**代码示例：

```javascript
function MyComponent(props) {
  useEffect(() => {
    console.log(props.foo);
  }, []);
  // `props` 缺少在依赖数组中
  return <div />;
}
```

此规则的**正确**代码示例：

```javascript
function MyComponent(props) {
  useEffect(() => {
    console.log(props.foo);
  }, [props]);
  return <div />;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### additionalHooks

type: `string`

default: `null`

可选地提供一个用于检查的额外 hooks 的正则表达式。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.12.0 中添加。

## 参考资料

<RuleReferences />
