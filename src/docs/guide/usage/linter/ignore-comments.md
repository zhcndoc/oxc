---
title: "内联忽略注释 | Oxlint"
description: 使用 Oxlint 忽略注释在内联中禁用特定规则
---

# 内联忽略注释

忽略注释为特殊情况提供了一个“逃生通道”：即规则通常是正确的，但需要在代码中一小段、边界明确的区域内被抑制。内联注释会覆盖配置文件。

Oxlint 支持行注释（`//`）和块注释（`/* */`）。注释必须以以下关键字之一开头。

## oxlint-disable

禁用一个或多个规则，直到文件结束，或直到它们被重新启用。

```js
// 禁用文件中剩余部分的所有 Oxlint 规则
/* oxlint-disable */

// 禁用此文件中的单个规则
/* oxlint-disable no-console */

// 禁用此文件中的多个规则
/* oxlint-disable no-console, typescript/no-floating-promises */
```

## oxlint-enable

启用一个或多个规则，直到文件结束，或直到它们再次被禁用。

```js
/* oxlint-enable no-console */

/* oxlint-enable no-console, no-alert */
```

## oxlint-disable-line

禁用当前行上的一个或多个规则。

```js
console.log("Hello, world!"); // oxlint-disable-line no-console

console.log(x++); // oxlint-disable-line no-console, no-plusplus
```

## oxlint-disable-next-line

禁用注释下一行上的一个或多个规则，然后为后续行重新启用它们。

```js
// oxlint-disable-next-line no-console
console.log("Hello, world!"); // 允许，因为前面的注释
console.log(x++); // 不允许，因为前面的注释仅适用于上一行

// oxlint-disable-next-line no-console, no-plusplus
console.log("Hello, world!"); // 允许
```

## ESLint 兼容性

为了与现有的 ESLint 代码库兼容，支持相同的关键字，只需将 `oxlint` 替换为 `eslint`，例如 `/* eslint-disable */` 和 `// eslint-disable-next-line`。

推荐使用 `oxlint-*` 形式。`eslint-*` 形式在迁移过程中对于 Oxlint 尚未支持的规则很有用。

## 无法内联更改规则选项

忽略注释可以启用或禁用规则，但不能更改规则选项。规则选项应位于配置文件中。

## 报告未使用的忽略注释

默认情况下禁用报告未使用的忽略注释。启用后，当该行不会报告任何诊断信息时，Oxlint 会报告诸如 `// oxlint-disable-line` 之类的注释。

启用报告：

```bash
oxlint --report-unused-disable-directives
```

指定严重程度：

```bash
oxlint --report-unused-disable-directives-severity error
```

一次只能使用这些选项中的一个。

这也可以在 Oxlint 配置文件中设置：

::: code-group

```jsonc [.oxlintrc.json]
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "options": {
    "reportUnusedDisableDirectives": "error", // 或 "off" 或 "warn"
  },
}
```

```ts [oxlint.config.ts]
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    reportUnusedDisableDirectives: "error", // 或 "off" 或 "warn"
  },
});
```

:::
