---
title: "eslint/no-global-assign"
category: "Correctness"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_global_assign.rs`;
</script>

<RuleHeader />

### 作用

禁止修改只读全局变量。

### 为什么这不好？

在几乎所有情况下，你都不希望给这些全局变量赋值，因为这样做可能会导致无法访问重要功能。

### 示例

以下是此规则的**错误**代码示例：

```javascript
Object = null;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### exceptions

type: `string[]`

default: `[]`

要从此规则中排除的全局变量名称列表。
这里列出的全局变量可以被赋值，而不会触发警告。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.7 中添加。

## 参考

<RuleReferences />
