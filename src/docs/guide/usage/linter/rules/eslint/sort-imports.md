---
title: "eslint/sort-imports | Oxlint"
rule: "eslint/sort-imports"
category: "样式"
version: "0.4.4"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/sort-imports"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/sort_imports.rs`;
</script>

<RuleHeader />

### 作用

此规则会检查所有 import 声明，并验证所有 import 是否先按使用的成员语法排序，
再按第一个成员或别名名称的字母顺序排序。

在声明多个 import 时，排序后的 import 声明列表会让开发者更容易阅读
代码，并在之后找到所需的 import。

### 为什么这不好？

一致的 import 排序有助于提高代码的可读性和可维护性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { b, a, c } from "foo.js";

import d from "foo.js";
import e from "bar.js";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowSeparatedGroups

type: `boolean`

default: `false`

当为 `true` 时，该规则允许将由空行分隔的 import 组视为彼此独立。

### ignoreCase

type: `boolean`

default: `false`

当为 `true` 时，该规则在排序 import 名称时忽略大小写。

### ignoreDeclarationSort

type: `boolean`

default: `false`

当为 `true` 时，该规则忽略 import 声明的排序（`import` 语句的顺序）。

### ignoreMemberSort

type: `boolean`

default: `false`

当为 `true` 时，该规则忽略单个 import 声明内部 import 成员的排序。

### memberSyntaxSortOrder

type: `array`

default: `["none", "all", "multiple", "single"]`

指定不同 import 语法的排序顺序。
必须包含全部 4 种！

#### memberSyntaxSortOrder[n]

type: `"none" | "all" | "multiple" | "single"`

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.4 中添加。

## 参考

<RuleReferences />
