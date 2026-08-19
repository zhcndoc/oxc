---
title: "react/memo-dependencies | Oxlint"
rule: "react/memo-dependencies"
category: "Suspicious"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/memo-dependencies.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/memo_dependencies.rs`;
</script>

<RuleHeader />

### 功能

验证 `useMemo()` 和 `useCallback()` 是否声明了完整的依赖列表，且不包含多余值。

由 React Compiler 提供支持，它会为每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/memo-dependencies`](https://react.dev/reference/eslint-plugin-react-hooks/lints/memo-dependencies)。

### 为什么这是个问题？

缺少依赖项会产生过时的记忆化值；多余的依赖项会导致不必要的重新计算。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
