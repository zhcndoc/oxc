---
title: "react/no-namespace | Oxlint"
rule: "react/no-namespace"
category: "Suspicious"
version: "0.15.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_namespace.rs`;
</script>

<RuleHeader />

### 作用

强制 React 元素中不使用命名空间。

### 为什么这很糟糕？

React 不支持 React 元素中的命名空间，例如 svg:circle。

### 示例

此规则的**错误**代码示例：

```jsx
<ns:TestComponent />
<Ns:TestComponent />
```

此规则的**正确**代码示例：

```jsx
<TestComponent />
<testComponent />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.13 中添加。

## 参考资料

<RuleReferences />
