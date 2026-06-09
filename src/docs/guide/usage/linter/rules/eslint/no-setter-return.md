---
title: "eslint/no-setter-return | Oxlint"
rule: "eslint/no-setter-return"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-setter-return"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_setter_return.rs`;
</script>

<RuleHeader />

### 它的作用

setter 不能返回值。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制执行此检查。

### 为什么这很糟糕？

虽然从 setter 返回值不会产生错误，但返回的值会被忽略。因此，从 setter 返回值要么是不必要的，要么可能是错误，因为返回的值无法被使用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
class URL {
  set origin() {
    return true;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
