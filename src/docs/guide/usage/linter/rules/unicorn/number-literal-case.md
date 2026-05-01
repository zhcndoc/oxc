---
title: "unicorn/number-literal-case"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/number_literal_case.rs`;
</script>

<RuleHeader />

### 作用

此规则强制数字字面量使用正确的大小写。

### 为什么这不好？

当标识符和数字字面量都使用小写时，
它们可能很难区分。

### 示例

以下是此规则的**错误**代码示例：

<!-- prettier-ignore-start -->
```javascript
const foo = 0XFF;
const foo = 0xff;
const foo = 0Xff;
const foo = 0Xffn;

const foo = 0B10;
const foo = 0B10n;

const foo = 0O76;
const foo = 0O76n;

const foo = 2E-5;
```

以下是此规则的**正确**代码示例：
```javascript
const foo = 0xFF;
const foo = 0b10;
const foo = 0o76;
const foo = 0xFFn;
const foo = 2e+5;
```
<!-- prettier-ignore-end -->

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
