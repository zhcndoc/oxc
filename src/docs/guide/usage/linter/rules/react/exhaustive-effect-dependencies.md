---
title: "react/exhaustive-effect-dependencies | Oxlint"
rule: "react/exhaustive-effect-dependencies"
category: "Suspicious"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/exhaustive-effect-dependencies.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/exhaustive_effect_dependencies.rs`;
</script>

<RuleHeader />

### 功能说明

验证 effect 依赖数组是否完整，并且不包含多余的值。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/exhaustive-effect-dependencies`](https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-effect-dependencies)。

### 为什么这很糟糕？

缺失的 effect 依赖项会捕获上一次渲染中的过时值；多余的依赖项会导致 effect 不必要地重新触发。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
