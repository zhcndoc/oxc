---
title: "oxc/bad-char-at-comparison"
category: "Correctness"
version: "0.0.22"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_char_at_comparison.rs`;
</script>

<RuleHeader />

### 它的作用

当 `charAt` 方法的返回值被用于与长度大于 1 的字符串进行比较时，此规则会发出警告。

### 为什么这不好？

`charAt` 方法返回的是长度为 1 的字符串。如果返回值与长度大于 1 的字符串进行比较，那么比较结果将始终为 false。

### 示例

以下是此规则的**错误**代码示例：

```javascript
a.charAt(4) === "a2";
a.charAt(4) === "/n";
```

以下是此规则的**正确**代码示例：

```javascript
a.charAt(4) === "a";
a.charAt(4) === "\n";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.22 中添加。

## 参考资料

<RuleReferences />
