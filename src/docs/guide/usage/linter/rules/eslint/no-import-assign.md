---
title: "eslint/no-import-assign | Oxlint"
rule: "eslint/no-import-assign"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_import_assign.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对导入绑定赋值。

### 为什么这很糟糕？

ES Modules 对导入绑定的更新会导致运行时错误。

TypeScript 编译器通常已经会强制执行此检查。尽管
需要注意的是，TypeScript 在某些情况下不会捕获，例如
通过 `Object.assign` 的赋值。因此，在这些情况下，这条规则对于
TypeScript 代码仍然很有用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import mod, { named } from "./mod.mjs";
import * as mod_ns from "./mod.mjs";

mod = 1; // 错误：'mod' 是只读的。
named = 2; // 错误：'named' 是只读的。
mod_ns.named = 3; // 错误：'mod_ns' 的成员是只读的。
mod_ns = {}; // 错误：'mod_ns' 是只读的。
// 不能扩展 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }); // 错误：'mod_ns' 的成员是只读的。
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.5 中添加。

## 参考资料

<RuleReferences />
