---
title: "unicorn/require-array-join-separator | Oxlint"
rule: "unicorn/require-array-join-separator"
category: "样式"
version: "0.0.19"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/require_array_join_separator.rs`;
</script>

<RuleHeader />

### 它的作用

强制在使用 `Array#join()` 时传入分隔符参数。

### 为什么这不好？

在调用 `Array#join()` 时明确分隔符是什么会更好，
而不是依赖默认的逗号（`','`）分隔符。

### 示例

此规则的**错误**代码示例：

```javascript
foo.join();
```

此规则的**正确**代码示例：

```javascript
foo.join(",");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考资料

<RuleReferences />
