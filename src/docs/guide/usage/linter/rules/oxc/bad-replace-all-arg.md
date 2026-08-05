---
title: "oxc/bad-replace-all-arg | Oxlint"
rule: "oxc/bad-replace-all-arg"
category: "Correctness"
version: "0.0.22"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_replace_all_arg.rs`;
</script>

<RuleHeader />

### 它的作用

当 `replaceAll` 方法传入一个没有全局标志（g）的正则表达式时，此规则会发出警告。

### 为什么这不好？

当传入正则表达式时，`replaceAll` 方法要求设置全局标志（g）。
否则，它会在运行时抛出 `TypeError`，而不是执行替换。

### 示例

此规则的**错误**代码示例：

```javascript
withSpaces.replaceAll(/\s+/, ",");
```

此规则的**正确**代码示例：

```javascript
withSpaces.replaceAll(/\s+/g, ",");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.22 中添加。

## 参考资料

<RuleReferences />
