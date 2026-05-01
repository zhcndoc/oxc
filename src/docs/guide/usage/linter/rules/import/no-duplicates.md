---
title: "import/no-duplicates"
category: "Style"
version: "0.2.11"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_duplicates.rs`;
</script>

<RuleHeader />

### 它的作用

如果同一个已解析路径在同一模块中被导入多次，则会报告问题。
这有助于避免不必要的重复导入，并保持代码整洁。

### 为什么这不好？

多次导入同一个模块会导致冗余和
不必要的复杂性。它也会影响可维护性，因为这可能
让开发者感到困惑，并导致在整个代码中对导入的使用不一致。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { foo } from "./module";
import { bar } from "./module";

import a from "./module";
import { b } from "./module";
```

以下是此规则的**正确**代码示例：

```typescript
import { foo, bar } from "./module";

import * as a from "foo"; // 命名空间导入应使用单独的语句
import { b } from "foo";

import { c } from "foo"; // 分离类型导入，除非
import type { d } from "foo"; // `prefer-inline` 为 true
```

## 配置

此规则接受一个包含以下属性的配置对象：

### considerQueryString

type: `boolean`

default: `false`

当设置为 `true` 时，规则在判断导入是否重复时会考虑导入路径中的查询字符串部分。
这在使用 webpack 等通过查询字符串来配置模块加载方式的加载器时非常有用。

将此选项设置为 `true` 时的**正确**代码示例：

```javascript
import x from "./bar?optionX";
import y from "./bar?optionY";
```

### preferInline

type: `boolean`

default: `false`

当设置为 `true` 时，对于 TypeScript 代码，优先使用内联类型导入，而不是单独的类型导入
语句。

将此选项设置为 `true` 时的**正确**代码示例：

```typescript
import { Foo, type Bar } from "./module";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.11 中添加。

## 参考资料

<RuleReferences />
