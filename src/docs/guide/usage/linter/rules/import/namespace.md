---
title: "import/namespace"
category: "Correctness"
version: "0.2.11"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/namespace.rs`;
</script>

<RuleHeader />

### 作用

在按完整命名空间导入时，强制要求在解引用时名称必须存在（即 `import * as foo from './foo'; foo.bar();`，如果 `bar` 未被 `./foo` 导出，则会报告）。如果未找到任何导出的名称，也会在导入声明处报告。此外，还会对计算属性引用（即 `foo["bar"]()`）进行报告。还会报告对导入命名空间成员的赋值。

### 为什么这很糟糕？

解引用一个不存在的名称可能会导致运行时错误以及代码中的意外行为。它会降低代码的可靠性，并使其更难维护，因为哪些名称有效可能并不明确。该规则有助于确保所有被引用的名称都是已定义的，从而提升代码的清晰度和健壮性。

### 示例

给定

```javascript
// ./foo.js
export const bar = "I'm bar";
```

以下是此规则的**错误**代码示例：

```javascript
// ./qux.js
import * as foo from "./foo";
foo.notExported(); // 错误：notExported 未导出

// 赋值给导入命名空间的成员
foo.bar = "new value"; // 错误：bar 不能被重新赋值

// 对不存在的导出进行计算属性引用
const method = "notExported";
foo[method](); // 错误：notExported 不存在
```

以下是此规则的**正确**代码示例：

```javascript
// ./baz.js
import * as foo from "./foo";
console.log(foo.bar); // 有效：bar 已导出

// 计算属性引用
const method = "bar";
foo[method](); // 有效：method 指向一个已导出的函数
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowComputed

type: `boolean`

default: `false`

是否允许对导入的命名空间进行计算属性引用。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.11 中添加的。

## 参考资料

<RuleReferences />
