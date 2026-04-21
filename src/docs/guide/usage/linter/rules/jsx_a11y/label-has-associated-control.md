---
title: "jsx-a11y/label-has-associated-control"
category: "正确性"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/label_has_associated_control.rs`;
</script>

<RuleHeader />

### 作用

强制要求 label 标签具有文本标签和关联的控件。

### 为什么这不好？

表单标签如果没有正确关联到表单控件（例如 `<input>`），或者不包含可访问文本，就会妨碍使用屏幕阅读器等辅助技术的用户进行访问。用户可能没有足够的信息来理解表单控件的用途。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Foo(props) {
    return <label {...props} />
}

<input type="text" />
<label>Surname</label>
```

以下是此规则的**正确**代码示例：

```jsx
function Foo(props) {
  const { htmlFor, ...otherProps } = props;

  return <label htmlFor={htmlFor} {...otherProps} />;
}

<label>
  <input type="text" />
  Surname
</label>;
```

## 配置

此规则接受一个具有以下属性的配置对象：

### assert

type: `"htmlFor" | "nesting" | "both" | "either"`

default: `"either"`

label 与控件之间所需的关联类型。

#### `"htmlFor"`

断言 label 使用 `htmlFor` 来关联一个控件。

#### `"nesting"`

断言 label 包含一个嵌套的控件

#### `"both"`

断言 label 同时使用 `htmlFor` 和嵌套来关联一个控件

#### `"either"`

断言 label 使用 `htmlFor` 或嵌套中的任一种来关联一个控件

### controlComponents

type: `string[]`

default: `[]`

将被视为表单控件的自定义 JSX 组件。

### depth

type: `integer`

default: `2`

搜索嵌套控件的最大深度。

### labelAttributes

type: `string[]`

default: `["alt", "aria-label", "aria-labelledby"]`

用于检查可访问标签文本的属性。

### labelComponents

type: `string[]`

default: `["label"]`

将被视为标签的自定义 JSX 组件。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
