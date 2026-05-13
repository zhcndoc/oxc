---
title: "unicorn/require-module-attributes | Oxlint"
rule: "unicorn/require-module-attributes"
category: "Style"
version: "1.35.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/require_module_attributes.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制 `import`/`export` 语句以及 `import()` 表达式中的属性列表不能为空。

### 为什么这不好？

导入属性旨在提供有关模块应如何加载的元数据
（例如，`with { type: "json" }`）。空的属性对象不提供任何信息，
应将其移除。

### 示例

以下是此规则的**错误**代码示例：

```js
import foo from "foo" with {};

export { foo } from "foo" with {};

const foo = await import("foo", {});

const foo = await import("foo", { with: {} });
```

以下是此规则的**正确**代码示例：

```js
import foo from "foo";

export { foo } from "foo";

const foo = await import("foo");

const foo = await import("foo");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.35.0 中新增。

## 参考资料

<RuleReferences />
