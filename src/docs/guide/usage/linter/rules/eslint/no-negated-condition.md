---
title: "eslint/no-negated-condition | Oxlint"
rule: "eslint/no-negated-condition"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-negated-condition"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_negated_condition.rs`;
</script>

<RuleHeader />

### 作用

不允许使用取反条件。

### 为什么这不好？

取反条件更难理解。通过反转条件，可以让代码更易读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (!a) {
  doSomethingC();
} else {
  doSomethingB();
}

!a ? doSomethingC() : doSomethingB();
```

以下是此规则的**正确**代码示例：

```javascript
if (a) {
  doSomethingB();
} else {
  doSomethingC();
}

a ? doSomethingB() : doSomethingC();
```

## 使用方法

<RuleHowToUse />

## 版本

此规则添加于 v0.0.18。

## 参考资料

<RuleReferences />
