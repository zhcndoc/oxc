---
title: "vue/component-definition-name-casing | Oxlint"
rule: "vue/component-definition-name-casing"
category: "Style"
version: "1.68.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.vuejs.org/rules/component-definition-name-casing.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/component_definition_name_casing.rs`;
</script>

<RuleHeader />

### 作用

强制组件定义名称使用特定的大小写格式。

### 为什么这很糟糕？

如果组件名称没有统一的大小写格式，模板会更难阅读，
也更难通过 grep 搜索。选择 `PascalCase` 或
`kebab-case` 其中一种并在整个代码库中保持一致，可以消除一类
无谓争论和搜索遗漏。

### 示例

以下是此规则的**错误**代码示例（默认 `PascalCase`）：

```vue
<script>
export default {
  name: "foo-bar",
};
</script>
```

以下是此规则的**正确**代码示例（默认 `PascalCase`）：

```vue
<script>
export default {
  name: "FooBar",
};
</script>
```

## 配置

此规则接受以下字符串值之一：

type: `"PascalCase" | "kebab-case"`

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.68.0 中加入。

## 参考资料

<RuleReferences />
