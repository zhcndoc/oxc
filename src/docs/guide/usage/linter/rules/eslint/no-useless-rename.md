---
title: "eslint/no-useless-rename | Oxlint"
rule: "eslint/no-useless-rename"
category: "正确性"
version: "0.2.14"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-useless-rename"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_rename.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将导入、导出以及解构赋值重命名为相同的名称。

### 为什么这不好？

将变量重命名为相同的名称是不必要的。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { foo as foo } from "foo";
const { bar: bar } = obj;
export { baz as baz };
```

以下是此规则的**正确**代码示例：

```javascript
import { foo } from "foo";
const { bar: renamed } = obj;
export { baz };
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreDestructuring

type: `boolean`

default: `false`

设置为 `true` 时，允许在解构中使用相同的名称。

### ignoreExport

type: `boolean`

default: `false`

设置为 `true` 时，允许将导出重命名为相同的名称。

### ignoreImport

type: `boolean`

default: `false`

设置为 `true` 时，允许将导入重命名为相同的名称。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考资料

<RuleReferences />
