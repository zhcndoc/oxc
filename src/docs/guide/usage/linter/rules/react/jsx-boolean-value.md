---
title: "react/jsx-boolean-value | Oxlint"
rule: "react/jsx-boolean-value"
category: "样式"
version: "0.7.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_boolean_value.rs`;
</script>

<RuleHeader />

### 作用

在你的代码中强制使用一致的布尔属性样式。

### 为什么这不好？

在 JSX 中，你可以将布尔属性设置为 `true`，或者省略它。
此规则将强制布尔属性使用一致的样式。

### 示例

以下是此规则在默认 `"never"` 模式下的**错误**代码示例：

```jsx
const Hello = <Hello personal={true} />;
```

以下是此规则在默认 `"never"` 模式下的**正确**代码示例：

```jsx
const Hello = <Hello personal />;

const Foo = <Foo isSomething={false} />;
```

以下是此规则在 `"always"` 模式下的**错误**代码示例：

```jsx
const Hello = <Hello personal />;
```

以下是此规则在 `"always"` 模式下的**正确**代码示例：

```jsx
const Hello = <Hello personal={true} />;
```

## 配置

### 第 1 个选项

type: `"always" | "never"`

#### `"always"`

所有布尔属性都必须显式指定值。

#### `"never"`

所有布尔属性都必须省略被设置为 `true` 的值。

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### always

type: `string[]`

default: `[]`

应始终具有显式布尔值的属性名列表。
仅在主模式为 `"never"` 时需要。

#### assumeUndefinedIsFalse

type: `boolean`

default: `false`

如果为 `true`，将把 `prop={false}` 视为与该 prop 为 `undefined` 等价。
与 `"never"` 模式结合时，这将强制该属性完全省略。

```jsx
// 当 "assumeUndefinedIsFalse": true 时
<App foo={false} />; // 错误
<App />; // 正确
```

此选项在 `"always"` 模式下不起作用。

#### never

type: `string[]`

default: `[]`

不应始终具有显式布尔值的属性名列表。
仅在主模式为 `"always"` 时需要。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.7.0 中添加。

## 参考资料

<RuleReferences />
