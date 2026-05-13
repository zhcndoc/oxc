---
title: "typescript/ban-tslint-comment | Oxlint"
rule: "typescript/ban-tslint-comment"
category: "Style"
version: "0.2.9"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/ban_tslint_comment.rs`;
</script>

<RuleHeader />

### 作用

此规则不允许使用 `tslint:<rule-flag>` 注释。

### 为什么这不好？

在从 TSLint 迁移到 ESLint 时很有用。一旦 TSLint 已被移除，此规则有助于定位 TSLint 注释。

### 示例

此规则的**错误**代码示例：

```ts
// tslint:disable-next-line
someCode();
```

此规则的**正确**代码示例：

```ts
someCode();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.9 中添加。

## 参考资料

<RuleReferences />
