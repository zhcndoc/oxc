---
title: "react/syntax | Oxlint"
rule: "react/syntax"
category: "限制"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/syntax.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/syntax.rs`;
</script>

<RuleHeader />

### 功能

报告 React Compiler 在分析组件或 hook 时遇到的无效 JavaScript，例如重新赋值 `const` 绑定

此规则由 React Compiler 提供支持，React Compiler 每个文件运行一次，并与其他 React Compiler 规则共享。移植自 [`react-hooks/syntax`](https://react.dev/reference/eslint-plugin-react-hooks/lints/syntax)

### 为什么这很糟糕？

代码将在运行时抛出异常；编译器会跳过该函数，而不是对其进行优化

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加

## 参考

<RuleReferences />
