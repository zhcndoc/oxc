---
title: "typescript/prefer-ts-expect-error | Oxlint"
rule: "typescript/prefer-ts-expect-error"
category: "Pedantic"
version: "0.2.11"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_ts_expect_error.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用 @ts-expect-error 而不是 @ts-ignore。

### 为什么这不好？

TypeScript 允许你通过在出错行之前紧接着放置一个以 @ts-ignore 或 @ts-expect-error 开头的注释来抑制该行上的所有错误。
这两个指令的作用相同，除了 @ts-expect-error 如果放在一行本来没有错误的代码前面，会导致类型错误。

这意味着 @ts-ignore 很容易被遗忘，即使它所抑制的错误已经修复，它也可能仍然留在代码中。
这很危险，因为如果该行后来出现新的错误，它会被被遗忘的 @ts-ignore 抑制，从而被漏掉。

### 示例

以下是此规则的**错误**代码示例：

```ts
// @ts-ignore
const str: string = 1;

/**
 * 解释性注释
 *
 * @ts-ignore */
const multiLine: number = "value";
```

以下是此规则的**正确**代码示例：

```ts
/**
 * 解释性注释
 *
 * @ts-expect-error */
const multiLine: number = "value";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.11 中添加。

## 参考资料

<RuleReferences />
