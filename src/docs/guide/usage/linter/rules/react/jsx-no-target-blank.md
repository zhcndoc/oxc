---
title: "react/jsx-no-target-blank | Oxlint"
rule: "react/jsx-no-target-blank"
category: "Pedantic"
version: "0.2.5"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_target_blank.rs`;
</script>

<RuleHeader />

### 它的作用

此规则旨在通过要求外部链接 href 和表单 action 使用 `rel='noreferrer'`，从而防止用户生成的链接 href 和表单 action 造成安全漏洞，并可选地对任何动态生成的链接 href 和表单 action 进行同样的限制。

### 为什么这不好？

在创建一个包含 `a` 标签的 JSX 元素时，通常希望使用 `target='_blank'` 属性让链接在新标签页中打开。然而，如果单独使用此属性而不配合 `rel='noreferrer'`，就会造成严重的安全漏洞（有关更多细节，请参见 [`noreferrer` 文档] 和 [`noopener` 文档]）。
此规则要求你在 `target='_blank'` 属性中同时使用 `rel='noreferrer'`。

### 示例

此规则的**错误**代码示例：

```jsx
var Hello = <a target="_blank" href="https://example.com/"></a>;
var Hello = <a target="_blank" href={dynamicLink}></a>;
```

此规则的**正确**代码示例：

```jsx
/// 正确
var Hello = <p target="_blank"></p>;
var Hello = <a target="_blank" rel="noreferrer" href="https://example.com"></a>;
var Hello = <a target="_blank" rel="noopener noreferrer" href="https://example.com"></a>;
var Hello = <a target="_blank" href="relative/path/in/the/host"></a>;
var Hello = <a target="_blank" href="/absolute/path/in/the/host"></a>;
var Hello = <a></a>;
```

[`noreferrer` 文档]: https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer
[`noopener` 文档]: https://html.spec.whatwg.org/multipage/links.html#link-type-noopener

## 配置

此规则接受一个包含以下属性的配置对象：

### allowReferrer

type: `boolean`

default: `false`

是否允许 referrer。

### enforceDynamicLinks

type: `"always" | "never"`

default: `"always"`

是否强制检查动态链接，或强制检查静态链接。

#### `"always"`

始终强制检查动态链接。

#### `"never"`

始终强制检查静态链接。

### forms

type: `boolean`

default: `false`

是否检查表单元素。

### links

type: `boolean`

default: `true`

是否检查链接元素。

### warnOnSpreadAttributes

type: `boolean`

default: `false`

在使用展开属性时是否发出警告。

## 如何使用

<RuleHowToUse />

## Version

此规则在 v0.2.5 中添加。

## References

<RuleReferences />
