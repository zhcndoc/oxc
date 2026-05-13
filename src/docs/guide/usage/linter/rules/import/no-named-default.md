---
title: "import/no-named-default | Oxlint"
rule: "import/no-named-default"
category: "Style"
version: "0.15.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_named_default.rs`;
</script>

<RuleHeader />

### 它的作用

报告将默认导出作为本地命名导入的用法。

### 为什么这不好？

理由：这种语法就是为了以表达性的方式导入默认导出，让我们用起来吧。

### 示例

以下是此规则的**错误**代码示例：

```js
// message: 将导出的名称 'bar' 作为默认导出的标识符。
import { default as foo } from "./foo.js";
import { default as foo, bar } from "./foo.js";
```

以下是此规则的**正确**代码示例：

```js
import foo from "./foo.js";
import foo, { bar } from "./foo.js";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.3 中添加。

## 参考资料

<RuleReferences />
