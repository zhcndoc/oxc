---
title: "typescript/no-unnecessary-parameter-property-assignment | Oxlint"
rule: "typescript/no-unnecessary-parameter-property-assignment"
category: "Correctness"
version: "0.15.13"
default: true
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_parameter_property_assignment.rs`;
</script>

<RuleHeader />

### 作用

防止不必要的参数属性赋值。

### 为什么这不好？

带有以下可见性修饰符之一的构造函数参数
public、private、protected 或 readonly 会被自动初始化。
显式赋值是不必要的，可以移除。

### 示例

以下是此规则的**错误**代码示例：

```js
class Foo {
  constructor(public name: unknown) {
    this.name = name;
  }
}
```

以下是此规则的**正确**代码示例：

```js
class Foo {
  constructor(public name: unknown) {}
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.13。

## 参考

<RuleReferences />
