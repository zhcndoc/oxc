---
title: "eslint/no-ternary"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_ternary.rs`;
</script>

<RuleHeader />

### 作用

不允许使用三元运算符。

### 为什么这不好？

三元运算符用于根据条件为变量赋值。有些人认为使用三元运算符会导致代码不够清晰。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var foo = isBar ? baz : qux;
```

```javascript
function quux() {
  return foo ? bar() : baz();
}
```

以下是此规则的**正确**代码示例：

```javascript
let foo;

if (isBar) {
  foo = baz;
} else {
  foo = qux;
}
```

```javascript
function quux() {
  if (foo) {
    return bar();
  } else {
    return baz();
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考资料

<RuleReferences />
