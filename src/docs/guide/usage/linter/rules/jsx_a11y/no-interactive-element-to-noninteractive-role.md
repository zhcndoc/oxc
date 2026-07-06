---
title: "jsx-a11y/no-interactive-element-to-noninteractive-role | Oxlint"
rule: "jsx-a11y/no-interactive-element-to-noninteractive-role"
category: "正确性"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_interactive_element_to_noninteractive_role.rs`;
</script>

<RuleHeader />

### 它的作用

交互式 HTML 元素表示用户界面中的控件。交互式元素包括 `<a href>`、`<button>`、`<input>`、`<select>`、`<textarea>`。

不应使用 WAI-ARIA 角色将交互式元素转换为非交互式元素。
非交互式 ARIA 角色包括 `article`、`banner`、`complementary`、`img`、`listitem`、`main`、`region` 和 `tooltip`。

### 为什么这不好？

在交互式元素上使用非交互式角色可能会使辅助技术用户感到困惑。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<button role="img">保存</button>
```

以下是此规则的**正确**代码示例：

```jsx
<div role="img">
  <button>保存</button>
</div>
```

## Configuration

This rule accepts a configuration object with the following properties:

type: `Record<string, array>`

## How to Use

<RuleHowToUse />

## 版本

此规则已在 v1.65.0 中添加。

## 参考资料

<RuleReferences />
