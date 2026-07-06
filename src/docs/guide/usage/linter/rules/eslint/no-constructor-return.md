---
title: "eslint/no-constructor-return | Oxlint"
rule: "eslint/no-constructor-return"
category: "Pedantic"
version: "0.4.3"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-constructor-return"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_constructor_return.rs`;
</script>

<RuleHeader />

### 作用

禁止从构造函数中返回值。

### 为什么不好？

在 JavaScript 中，在类的构造函数中返回值可能是一个错误。
禁止此模式可防止因不熟悉语言或复制粘贴错误而导致的错误。

### 示例

此规则**不正确**代码的示例：

```js
class C {
  constructor() {
    return 42;
  }
}
```

此规则**正确**代码的示例：

```js
class C {
  constructor() {
    this.value = 42;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.4.3 中添加的。

## 参考资料

<RuleReferences />
