---
title: "react/no-string-refs"
category: "Correctness"
version: "0.0.15"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_string_refs.rs`;
</script>

<RuleHeader />

### 它的作用

此规则用于禁止在 ref 属性中使用已弃用的字符串字面量行为。

### 为什么这很糟糕？

自 React 16.3.0 起，在 ref 属性中使用字符串字面量就已被弃用。

字符串 ref 已在 [React 19 中被完全移除](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-string-refs)，
因此如果使用的是 React 19+，可以禁用此规则。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  render: function () {
    return <div ref="hello">Hello, world.</div>;
  },
});

var Hello = createReactClass({
  componentDidMount: function () {
    var component = this.refs.hello;
    // ...对 component 做一些处理
  },
  render: function () {
    return <div ref="hello">Hello, world.</div>;
  },
});
```

以下是此规则的**正确**代码示例：

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    var component = this.hello;
    // ...对 component 做一些处理
  },
  render() {
    return (
      <div
        ref={(c) => {
          this.hello = c;
        }}
      >
        Hello, world.
      </div>
    );
  },
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### noTemplateLiterals

type: `boolean`

default: `false`

除字符串字面量外，也不允许使用模板字面量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.15 中添加。

## 参考资料

<RuleReferences />
