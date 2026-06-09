---
title: "eslint/no-duplicate-imports | Oxlint"
rule: "eslint/no-duplicate-imports"
category: "Style"
version: "0.13.2"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.org/docs/latest/rules/no-duplicate-imports"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_duplicate_imports.rs`;
</script>

<RuleHeader />

### 作用

禁止重复的模块导入。

### 为什么不好？

每个模块只使用一条导入语句会让代码更清晰，因为你可以看到
所有从该模块导入的内容都在一行上。

### 示例

此规则 **错误** 代码的示例：

在下面的示例中，第 1 行的模块导入在第 3 行重复了。这些可以
合并以使导入列表更简洁。

```js
import { merge } from "module";
import something from "another-module";
import { find } from "module";
```

此规则 **正确** 代码的示例：

```js
import { merge, find } from "module";
import something from "another-module";
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowSeparateTypeImports

类型：`boolean`

默认值：`false`

当为 `true` 时，仅包含类型说明符（内联类型或类型导入）的导入被视为
与包含值说明符的导入分开，因此它们可以从
同一模块在单独的导入语句中导入。

当 `allowSeparateTypeImports` 设置为 `true` 时 **正确** 代码的示例：

```js
import { foo } from "module";
import type { Bar } from "module";
```

```js
import { type Foo } from "module";
import type { Bar } from "module";
```

### includeExports

类型：`boolean`

默认值：`false`

当为 `true` 时，此规则还将检查导出，查看是否既有模块的重新导出，
如 `export ... from 'module'`，又有同一模块的标准导入语句。
这将被视为规则违规，因为从某种意义上说，有两条语句
从同一模块导入。

当 `includeExports` 设置为 `true` 时 **错误** 代码的示例：

```js
import { merge } from "module";

export { find } from "module"; // 重新导出，既是导入也是导出。
```

当 `includeExports` 设置为 `true` 时 **正确** 代码的示例：

如果从导入的模块重新导出，你应该将导入添加到
`import` 语句中，并直接导出，不要使用 `export ... from`。

```js
import { merge } from "lodash-es";
export { merge as lodashMerge };
```

```js
import { merge, find } from "module";

// 不能与上面的导入合并
export * as something from "module";

// 不能以不同方式编写
export * from "module";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.13.2 中加入。

## 参考资料

<RuleReferences />
