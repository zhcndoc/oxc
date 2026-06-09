---
title: "react/no-unknown-property | Oxlint"
rule: "react/no-unknown-property"
category: "Restriction"
version: "0.2.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_unknown_property.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用未知的 DOM 属性。

### 为什么这不好？

DOM 属性应仅在对给定的 HTML 元素有效时使用。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// 未知属性
const Hello = <div class="hello">Hello World</div>;
const Alphabet = <div abc="something">Alphabet</div>;

// 无效的 aria-* 属性
const IconButton = <div aria-foo="bar" />;
```

以下是此规则的**正确**代码示例：

```jsx
// 未知属性
const Hello = <div className="hello">Hello World</div>;
const Alphabet = <div>Alphabet</div>;

// 无效的 aria-* 属性
const IconButton = <div aria-label="bar" />;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignore

type: `string[]`

default: `[]`

要忽略的属性列表。

### requireDataLowercase

type: `boolean`

default: `false`

要求 `data-*` 属性必须为小写，例如使用 `data-foobar`，而不是 `data-fooBar`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考

<RuleReferences />
