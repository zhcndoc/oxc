---
title: "react/invariant | Oxlint"
rule: "react/invariant"
category: "限制"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/invariant.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/invariant.rs`;
</script>

<RuleHeader />

### 功能

报告 React Compiler 内部不变量违规。这些问题表明编译器本身存在错误，而不是你的代码存在问题——请考虑向 oxc 或 React 团队报告。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/invariant`](https://react.dev/reference/eslint-plugin-react-hooks/lints/invariant)。

### 为什么这很糟糕？

不变量违规意味着编译器的内部状态不一致；受影响的函数会被跳过，而不是进行优化。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
