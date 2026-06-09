---
title: "eslint/no-useless-return | Oxlint"
rule: "eslint/no-useless-return"
category: "迂腐"
version: "1.32.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.org/docs/latest/rules/no-useless-return"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_return.rs`;
</script>

<RuleHeader />

### 功能

禁止多余的 return 语句。

### 为什么这不好？

后面没有任何内容的 `return;` 语句是多余的，并且对函数的运行时行为没有任何影响。这可能会造成困惑，因此最好禁止这类多余语句。

### 示例

以下是此规则的**错误**代码示例：

```js
function foo() {
  return;
}

function bar() {
  doSomething();
  return;
}

function baz() {
  if (condition) {
    doSomething();
    return;
  }
}
```

以下是此规则的**正确**代码示例：

```js
function foo() {
  return 5;
}

function bar() {
  if (condition) {
    return;
  }
  doSomething();
}

function baz() {
  return doSomething();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.32.0 中添加。

## 参考资料

<RuleReferences />
