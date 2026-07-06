---
title: "react/button-has-type | Oxlint"
rule: "react/button-has-type"
category: "Restriction"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/button_has_type.rs`;
</script>

<RuleHeader />

### 作用

对所有 HTML `button` 元素强制显式指定 `type` 属性。

### 为什么这不好？

`button` HTML 元素的 `type` 属性默认值是
`"submit"`，这通常不是期望的行为，并且可能导致
意外的页面重新加载。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<button />
<button type="foo" />
```

以下是此规则的**正确**代码示例：

```jsx
<button type="button" />
<button type="submit" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### button

类型: `boolean`

默认值: `true`

如果为 true，则允许 `type="button"`。

### reset

类型: `boolean`

默认值: `true`

如果为 true，则允许 `type="reset"`。

### submit

类型: `boolean`

默认值: `true`

如果为 true，则允许 `type="submit"`。

## How to Use

<RuleHowToUse />

## 版本

此规则在 v0.1.1 中添加。

## 参考

<RuleReferences />
