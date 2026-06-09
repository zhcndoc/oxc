---
title: "import/no-empty-named-blocks | Oxlint"
rule: "import/no-empty-named-blocks"
category: "可疑"
version: "0.16.1"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_empty_named_blocks.rs`;
</script>

<RuleHeader />

### 作用

强制命名导入块不能为空。

### 为什么这不好？

空的命名导入没有任何实际用途，并且通常
是由于误删或工具生成的代码导致的。

### 示例

以下是此规则的**错误**代码示例：

```js
import {} from "mod";
import Default from "mod";
```

以下是此规则的**正确**代码示例：

```js
import { mod } from "mod";
import Default, { mod } from "mod";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.1 中添加。

## 参考资料

<RuleReferences />
