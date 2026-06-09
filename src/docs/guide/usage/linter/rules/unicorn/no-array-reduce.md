---
title: "unicorn/no-array-reduce | Oxlint"
rule: "unicorn/no-array-reduce"
category: "限制"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_reduce.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `Array#reduce()` 和 `Array#reduceRight()`。

### 为什么这不好？

`Array#reduce()` 和 `Array#reduceRight()` 通常会生成[难以阅读](https://twitter.com/jaffathecake/status/1213077702300852224)且[性能较差](https://www.richsnapp.com/article/2019/06-09-reduce-spread-anti-pattern)的代码。在几乎所有情况下，它都可以被 `.map`、`.filter` 或 `for-of` 循环替代。

它只有在罕见的数字求和场景中才有一定用处，而这默认是允许的。

### 示例

以下是此规则的**错误**代码示例：

```javascript
array.reduce(reducer, initialValue);
array.reduceRight(reducer, initialValue);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowSimpleOperations

type: `boolean`

default: `true`

设置为 `true` 时，允许在 `reduce` 和 `reduceRight` 调用中使用简单操作（例如数字求和）。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中加入。

## 参考

<RuleReferences />
