---
title: "jsx-a11y/img-redundant-alt | Oxlint"
rule: "jsx-a11y/img-redundant-alt"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/img_redundant_alt.rs`;
</script>

<RuleHeader />

### 作用

确保 `img` 的 alt 属性不包含诸如
“图像”、“图片”或“照片”之类的冗余词语。

### 为什么这不好？

屏幕阅读器已经会将 `img` 元素识别为图像，因此
无需在 alt 文本中使用“图像”、“照片”或“图片”等词语。
这会为辅助技术用户带来冗余信息，并使 alt 文本不够简洁、
不够有用。

### 示例

此规则的**错误**代码示例：

```jsx
<img src="foo" alt="Foo 的照片，看起来很奇怪。" />
<img src="bar" alt="我在酒吧里的图片！" />
<img src="baz" alt="Baz 修复 bug 的照片。" />
```

此规则的**正确**代码示例：

```jsx
<img src="foo" alt="Foo 正在吃三明治。" />
<img src="bar" aria-hidden alt="我在拍一张图像照片的照片" /> // 因为它是隐藏的，所以会通过。
<img src="baz" alt={`Baz 正在拍摄一个 ${photo}`} /> // 这有效，因为 photo 是变量名。
```

## 配置

此规则接受一个包含以下属性的配置对象：

### components

type: `string[]`

default: `["img"]`

要验证的 JSX 元素类型（组件名称），该规则适用于这些类型。
例如，`["img", "Image"]`。

### words

type: `string[]`

default: `["image", "photo", "picture"]`

alt 文本中被视为冗余、应触发警告的词语。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考资料

<RuleReferences />
