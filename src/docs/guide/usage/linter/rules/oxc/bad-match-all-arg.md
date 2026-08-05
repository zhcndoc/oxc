---
title: "oxc/bad-match-all-arg | Oxlint"
rule: "oxc/bad-match-all-arg"
category: "正确性"
version: "1.76.0"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_match_all_arg.rs`;
</script>

<RuleHeader />

### 功能

当使用不带全局标志（g）的正则表达式调用 `matchAll` 方法时，此规则会发出警告。

### 为什么这是个问题？

使用正则表达式调用时，`matchAll` 方法要求正则表达式带有全局标志（g）。
否则，它会在运行时抛出 `TypeError`，而不是返回一个迭代器。

### 示例

此规则的**错误**代码示例：

```javascript
text.matchAll(/pattern/);
```

此规则的**正确**代码示例：

```javascript
text.matchAll(/pattern/g);
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.76.0 中添加。

## 参考资料

<RuleReferences />
