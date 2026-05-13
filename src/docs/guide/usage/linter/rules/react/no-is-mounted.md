---
title: "react/no-is-mounted | Oxlint"
rule: "react/no-is-mounted"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_is_mounted.rs`;
</script>

<RuleHeader />

### 它的作用

此规则禁止在类组件中使用 `isMounted`。

### 为什么这不好？

`isMounted` 是一种反模式，在使用类组件或函数组件时不可用。

### 示例

以下是此规则的**错误**代码示例：

```jsx
class Hello extends React.Component {
  someMethod() {
    if (!this.isMounted()) {
      return;
    }
  }
  render() {
    return <div onClick={this.someMethod.bind(this)}>Hello</div>;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
