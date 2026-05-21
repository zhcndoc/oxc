---
title: "import/newline-after-import | Oxlint"
rule: "import/newline-after-import"
category: "风格"
version: "next"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/newline_after_import.rs`;
</script>

<RuleHeader />

### 作用

强制在最后一个顶层 import 语句或 require 调用之后保留一行或多行空行。

### 为什么这不好？

如果没有空行，import/require 声明就会与后续逻辑混在一起，
这会影响可读性，也会让变更更难扫描。空行能清晰地
将依赖与实现分隔开来。

### 示例

以下是此规则的**错误**代码示例：

```js
import * as foo from "foo";
const FOO = "BAR";
```

```js
import * as foo from "foo";
const FOO = "BAR";

import { bar } from "bar-lib";
```

```js
const FOO = require("./foo");
const BAZ = 1;
const BAR = require("./bar");
```

以下是此规则的**正确**代码示例：

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

```js
import defaultExport from "./foo";
import { bar } from "bar-lib";

const FOO = "BAR";
```

```js
const FOO = require("./foo");
const BAR = require("./bar");

const BAZ = 1;
```

当 count 设为 2 时，下列代码将被视为有效：

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

当 count 设为 2 时，下列代码将被视为无效：

```js
import defaultExport from "./foo";
const FOO = "BAR";
```

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

当 count 设为 2 且 exactCount 设为 true 时，下列代码将被视为有效：

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

当 count 设为 2 且 exactCount 设为 true 时，下列代码将被视为无效：

```js
import defaultExport from "./foo";
const FOO = "BAR";
```

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

当 considerComments 设为 false 时，下列代码将被视为有效：

```js
import defaultExport from "./foo";
// 此处有一些注释。
const FOO = "BAR";
```

当 considerComments 设为 true 时，下列代码将被视为有效：

```js
import defaultExport from "./foo";

// 此处有一些注释。
const FOO = "BAR";
```

当 considerComments 设为 true 时，下列代码将被视为无效：

```js
import defaultExport from "./foo";
// 此处有一些注释。
const FOO = "BAR";
```

### 示例选项用法

```json
{
  "rules": {
    "import/newline-after-import": ["error", { "count": 1 }]
  }
}
```

## 配置

此规则接受一个配置对象，包含以下属性：

### considerComments

类型：`boolean`

默认值：`false`

### count

类型：`integer`

默认值：`1`

### exactCount

类型：`boolean`

默认值：`false`

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 vnext 中添加。

## 参考资料

<RuleReferences />
