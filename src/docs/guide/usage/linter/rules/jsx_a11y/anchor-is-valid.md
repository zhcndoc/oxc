---
title: "jsx-a11y/anchor-is-valid"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/anchor_is_valid.rs`;
</script>

<RuleHeader />

### 其作用

HTML `<a>` 元素在具有有效的 href 属性时，正式被定义为表示一个 **超链接**。
也就是说，它是一个 HTML 文档与另一个 HTML 文档之间的链接，或者是一个 HTML 文档内某个位置与同一文档内另一个位置之间的链接。

虽然以前可以将逻辑附加到锚点元素上，但随着 JSX 库的出现，
现在将逻辑附加到任何 HTML 元素上都变得更容易了，锚点也包括在内。

此规则旨在防止用户在锚点点击时附加逻辑，同时也确保传递给锚点元素的 `href` 是有效的。
如果锚点附加了逻辑，规则建议将其改为 `button`，因为这很可能是用户想要的。

锚点 `<a></a>` 元素应当用于导航，而 `<button></button>` 应当用于用户交互。

请看以下示例：

```jsx
<>
  <a href="javascript:void(0)" onClick={foo}>
    执行操作
  </a>
  <a href="#" onClick={foo}>
    执行操作
  </a>
  <a onClick={foo}>执行操作</a>
</>
```

所有这些锚点实现都表明该元素仅用于执行 JavaScript 代码。以上内容都应替换为：

```jsx
<button onClick={foo}>执行操作</button>
```

### 为什么这不好？

锚点不应包含逻辑，并且应具有正确的 `href` 属性，原因有**很多**：

- 它可能会破坏用户导航的正确流程，例如，用户想要在另一个标签页中打开链接，
  但默认的“点击”行为被阻止了
- 它可能会成为无效链接的来源，并且爬虫无法导航网站，从而有可能降低 SEO 排名

### 示例

此规则的**有效**代码示例：

```jsx
<>
  <a href={`https://www.javascript.com`}>在这里导航</a>
  <a href={somewhere}>在这里导航</a>
  <a {...spread}>在这里导航</a>
</>
```

此规则的**无效**代码示例：

```jsx
<>
  <a href={null}>在这里导航</a>
  <a href={undefined}>在这里导航</a>
  <a href>在这里导航</a>
  <a href="javascript:void(0)">在这里导航</a>
  <a href="https://example.com" onClick={something}>
    在这里导航
  </a>
</>
```

### 参考

- [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)

## 配置

此规则接受一个包含以下属性的配置对象：

### validHrefs

type: `string[]`

default: `[]`

有效 href 值的字符串列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考资料

<RuleReferences />
