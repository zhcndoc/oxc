---
title: "unicorn/prefer-set-size | Oxlint"
rule: "unicorn/prefer-set-size"
category: "正确性"
version: "0.0.19"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_set_size.rs`;
</script>

<RuleHeader />

### 作用

当 `Set` 被转换为数组时，优先使用 `Set#size` 而不是 `Set#length`。

### 为什么这不好？

使用 `Set#size` 可读性更高，性能也更好。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const length = [...new Set([1, 2, 3])].length;
```

以下是此规则的**正确**代码示例：

```javascript
const size = new Set([1, 2, 3]).size;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中加入。

## 参考资料

<RuleReferences />
