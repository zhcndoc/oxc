---
title: "eslint/no-useless-catch | Oxlint"
rule: "eslint/no-useless-catch"
category: "Correctness"
version: "0.0.5"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-useless-catch"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_catch.rs`;
</script>

<RuleHeader />

### 它的作用

禁止无用的 catch 子句。

### 为什么这不好？

只会重新抛出原始错误的 catch 子句是多余的，
并且对程序的运行时行为没有任何影响。
这些多余的子句可能会造成混淆并增加代码冗余，
因此最好禁止这些无用的 catch 子句。

### 示例

此规则的**错误**代码示例：

```javascript
try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}
```

此规则的**正确**代码示例：

```javascript
doSomethingThatMightThrow();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.5 中添加。

## 参考资料

<RuleReferences />
