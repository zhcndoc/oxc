---
title: "react/jsx-no-constructed-context-values | Oxlint"
rule: "react/jsx-no-constructed-context-values"
category: "Perf"
version: "1.48.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_constructed_context_values.rs`;
</script>

<RuleHeader />

### 它的作用

禁止 JSX 上下文提供者的值使用会导致不必要重新渲染的值。

### 为什么这不好？

每当 value 属性变化时，React Context 及其所有子节点和消费者都会重新渲染。由于每个 JavaScript 对象都具有自己的标识，像对象表达式（`{foo: 'bar'}`）或函数表达式这类内容在每次渲染时都会获得新的标识。这会让上下文认为它获得了一个新对象，并可能导致不必要的重新渲染和意料之外的后果。

这可能会带来很大的性能损耗，因为它不仅会导致上下文提供者和消费者以及其子树中的所有元素重新渲染，React 在渲染提供者并查找消费者时所做的树扫描处理也会被浪费。

### 示例

以下是此规则的**错误**代码示例：

```jsx
return <SomeContext.Provider value={{ foo: "bar" }}>...</SomeContext.Provider>;
```

```jsx
function Component() {
  function foo() {}
  return <MyContext.Provider value={foo} />;
}
```

以下是此规则的**正确**代码示例：

```jsx
const foo = useMemo(() => ({ foo: "bar" }), []);
return <SomeContext.Provider value={foo}>...</SomeContext.Provider>;
```

```jsx
const MyContext = createContext();
const Component = () => <MyContext.Provider value="Some string" />;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.48.0 中添加。

## 参考资料

<RuleReferences />
