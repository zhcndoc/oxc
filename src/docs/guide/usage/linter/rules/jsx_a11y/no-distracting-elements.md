---
title: "jsx-a11y/no-distracting-elements | Oxlint"
rule: "jsx-a11y/no-distracting-elements"
category: "Correctness"
version: "0.0.22"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_distracting_elements.rs`;
</script>

<RuleHeader />

### 它的作用

强制不使用会分散注意力的元素。

### 为什么这不好？

在视觉上会分散注意力的元素可能会给有视力障碍的用户带来可访问性问题。
这类元素很可能已经被弃用，应当避免。默认情况下，`<marquee>` 和 `<blink>` 元素
会分散视觉注意力，并可能引发前庭系统障碍。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<marquee />
<marquee {...props} />
<marquee lang={undefined} />
<blink />
<blink {...props} />
<blink foo={undefined} />
```

以下是此规则的**正确**代码示例：

```jsx
<div />
<Marquee />
<Blink />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### elements

type: `array`

要检查的会分散注意力的元素列表。

#### elements[n]

type: `"marquee" | "blink"`

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.22 中添加的。

## 参考资料

<RuleReferences />
