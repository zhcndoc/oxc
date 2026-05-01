---
title: "jsx-a11y/aria-role"
category: "正确性"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/aria_role.rs`;
</script>

<RuleHeader />

### 其作用

带有 ARIA 角色的元素必须使用有效的、非抽象的 ARIA 角色。可以在 [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) 网站找到角色定义的参考。

### 为什么这不好？

此成功标准的意图是确保辅助技术（AT）能够收集有关内容中用户界面控件的信息，激活（或设置）这些控件，并持续更新其状态（例如供残障人士使用的屏幕阅读器、屏幕放大器和语音识别软件）。

当使用辅助技术中的标准控件时，这个过程很直接。如果用户界面元素按照规范使用，就能满足此规定的条件。

然而，如果创建了自定义控件，或者接口元素被以代码或脚本编程为具有与通常不同的角色和/或功能，则需要采取额外措施，以确保这些控件向辅助技术提供重要信息，并允许辅助技术对其进行控制。用户界面控件一个特别重要的状态是它是否获得焦点。控件的焦点状态可以通过程序确定，有关焦点变化的通知会发送给用户代理和辅助技术。用户界面控件状态的其他示例包括复选框或单选按钮是否已被选中，或可折叠的树节点或列表节点是否已展开或折叠。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div role="datepicker"></div> <!-- 错误："datepicker" 不是一个 ARIA 角色 -->
<div role="range"></div>      <!-- 错误："range" 是一个 _抽象_ ARIA 角色 -->
<div role=""></div>           <!-- 错误：不允许空的 ARIA 角色 -->
<Foo role={role}></Foo>       <!-- 错误：ignoreNonDOM 被设置为 false 或未设置 -->
```

以下是此规则的**正确**代码示例：

```jsx
<div role="button"></div>     <!-- 正确："button" 是一个有效的 ARIA 角色 -->
<div role={role}></div>       <!-- 正确：role 是一个变量，直到运行时才能确定。 -->
<div></div>                   <!-- 正确：没有 ARIA 角色 -->
<Foo role={role}></Foo>       <!-- 正确：ignoreNonDOM 被设置为 true -->
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowedInvalidRoles

type: `string[]`

default: `[]`

除 ARIA 规范之外还应允许的自定义角色。

### ignoreNonDOM

type: `boolean`

default: `false`

确定是否检查开发者创建的组件。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考资料

<RuleReferences />
