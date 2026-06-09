---
title: "eslint/no-unreachable | Oxlint"
rule: "eslint/no-unreachable"
category: "正确性"
version: "0.4.4"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-unreachable"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unreachable.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `return`、`throw`、`continue` 和 `break` 语句之后出现不可达代码。

如果在 `tsconfig.json` 中配置了 `allowUnreachableCode: false`，则可以为 TypeScript 代码禁用此规则，
因为 TypeScript 编译器会强制执行此检查。

### 为什么这不好？

在 `return`、`throw`、`continue` 或 `break` 语句之后的不可达代码永远不会被执行。

### 示例

此规则的**错误**代码示例：

```ts
function foo() {
  return 2;
  console.log("这段代码将永远不会被执行");
}
```

此规则的**正确**代码示例：

```ts
function foo() {
  console.log("这段代码将会被执行");
  return 2;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中添加。

## 参考资料

<RuleReferences />
