---
title: "eslint/unicode-bom | Oxlint"
rule: "eslint/unicode-bom"
category: "Restriction"
version: "0.3.3"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/unicode-bom"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/unicode_bom.rs`;
</script>

<RuleHeader />

### 它的作用

要求或禁止 Unicode 字节顺序标记（BOM）

### 为什么这很糟糕？

Unicode 字节顺序标记（BOM）用于指定代码单元是大端序还是
小端序。也就是说，最高有效字节还是最低有效字节先出现。
UTF-8 不需要 BOM，因为当字符是单字节时，字节顺序并不重要。
由于 UTF-8 是 Web 的主导编码，我们将“never”作为默认
选项。

### 示例

此规则的 **错误** 代码示例：

```javascript
var a = 123;
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

始终要求文件开头包含 Unicode BOM（字节顺序标记）。

### `"never"`

永远不允许文件开头包含 Unicode BOM（字节顺序标记）。
这是默认选项。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.3 中添加。

## 参考资料

<RuleReferences />
