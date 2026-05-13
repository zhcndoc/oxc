---
title: "import/no-unassigned-import | Oxlint"
rule: "import/no-unassigned-import"
category: "Suspicious"
version: "0.16.11"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_unassigned_import.rs`;
</script>

<RuleHeader />

### 作用

该规则旨在通过在模块被导入但未被赋值时进行报告，来移除具有副作用的模块。

### 为什么这不好？

对于 CommonJS 的 require 和 ES modules 的 import 语法，
都可以导入一个模块但不使用其结果。
这可以通过不将模块赋值给变量来显式完成。
这样做可能意味着以下两种情况之一：

- 该模块被导入但未使用
- 该模块具有副作用。具有副作用
  会让人难以判断该模块是否实际已被使用，或者是否可以移除。
  它还可能使测试或模拟应用程序的某些部分变得更加困难。

### 示例

以下是此规则的**错误**代码示例：

```js
import "should";
require("should");
```

以下是此规则的**正确**代码示例：

```js
import _ from "foo";
import _, { foo } from "foo";
import _, { foo as bar } from "foo";
const _ = require("foo");
const { foo } = require("foo");
const { foo: bar } = require("foo");
bar(require("foo"));
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

允许对特定模块进行未赋值导入的 glob 模式列表。
例如：
`{ "allow": ["**/*.css"] }` 将允许任何以 `.css` 结尾的模块进行未赋值导入。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.16.11 中添加。

## 参考

<RuleReferences />
