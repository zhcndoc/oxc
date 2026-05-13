---
title: "unicorn/empty-brace-spaces | Oxlint"
rule: "unicorn/empty-brace-spaces"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/empty_brace_spaces.rs`;
</script>

<RuleHeader />

### 作用

移除一对不包含额外代码的花括号内部多余的空格或换行字符。这可确保花括号内部整洁，不包含不必要的空格或换行。

### 为什么这不好？

花括号内的多余空格会对代码的可读性产生负面影响。保持花括号整洁且不含不必要的字符，可以提升一致性，并使代码更易于理解和维护。

### 示例

<!-- prettier-ignore-start -->
此规则的**错误**代码示例：
```javascript
const a = {  };
class A {
}
```

<!-- prettier-ignore-end -->

此规则的**正确**代码示例：

```javascript
const a = {};
class A {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考

<RuleReferences />
