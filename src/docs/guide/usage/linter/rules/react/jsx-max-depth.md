---
title: "react/jsx-max-depth | Oxlint"
rule: "react/jsx-max-depth"
category: "Style"
version: "1.36.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_max_depth.rs`;
</script>

<RuleHeader />

### 它的作用

强制限制嵌套 JSX 元素和片段的最大深度。

### 为什么这不好？

过度嵌套的 JSX 会让组件更难阅读和维护。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const Component = () => (
  <div>
    <div>
      <div>
        <span />
      </div>
    </div>
  </div>
);
```

以下是此规则的**正确**代码示例：

```jsx
const Component = () => (
  <div>
    <div>
      <span />
    </div>
  </div>
);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### max

类型：`integer`

默认值：`2`

允许的嵌套 JSX 元素和片段的最大深度。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.36.0 中添加的。

## 参考资料

<RuleReferences />
