---
title: "unicorn/no-length-as-slice-end | Oxlint"
rule: "unicorn/no-length-as-slice-end"
category: "Restriction"
version: "0.7.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-length-as-slice-end.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_length_as_slice_end.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将 `length` 作为 `slice` 调用的结束参数。

### 为什么这不好？

将 `length` 作为 `slice` 调用的结束参数是多余的，而且可能会让人困惑。

### 示例

此规则的**错误**代码示例：

```javascript
foo.slice(1, foo.length);
```

此规则的**正确**代码示例：

```javascript
foo.slice(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中加入。

## 参考资料

<RuleReferences />
