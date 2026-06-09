---
title: "unicorn/no-unnecessary-array-flat-depth | Oxlint"
rule: "unicorn/no-unnecessary-array-flat-depth"
category: "Pedantic"
version: "0.16.12"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-flat-depth.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unnecessary_array_flat_depth.rs`;
</script>

<RuleHeader />

### 作用

不允许向 `Array.prototype.flat` 传入 `1`。

### 为什么这不好？

传入 `1` 是不必要的。

### 示例

以下是此规则的**错误**代码示例：

```js
foo.flat(1);
```

以下是此规则的**正确**代码示例：

```js
foo.flat();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.12 中加入。

## 参考资料

<RuleReferences />
