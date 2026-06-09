---
title: "react/jsx-no-undef | Oxlint"
rule: "react/jsx-no-undef"
category: "Correctness"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_undef.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 JSX 中使用未声明的变量。

请注意，如果你在使用 TypeScript，这条规则通常是不必要的，因为
TypeScript 会帮你捕获未声明的变量。

### 为什么这很糟糕？

这很可能是由于变量名或参数名拼写错误导致的潜在 ReferenceError。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const A = () => <App />;
const C = <B />;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考资料

<RuleReferences />
