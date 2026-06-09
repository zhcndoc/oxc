---
title: "unicorn/require-module-specifiers | Oxlint"
rule: "unicorn/require-module-specifiers"
category: "Suspicious"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-specifiers.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/require_module_specifiers.rs`;
</script>

<RuleHeader />

### 作用

强制 `import` 和 `export` 语句中的说明符列表不能为空。

### 为什么这不好？

空的 `import`/`export` 说明符没有任何价值，而且可能会令人困惑。
如果你只是想为了副作用而导入一个模块，请改用 `import 'module'`。

### 示例

以下是此规则的**错误**代码示例：

```js
import {} from "foo";
import foo from "foo";
export {} from "foo";
export {};
```

以下是此规则的**正确**代码示例：

```js
import "foo";
import foo from "foo";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中加入。

## 参考资料

<RuleReferences />
