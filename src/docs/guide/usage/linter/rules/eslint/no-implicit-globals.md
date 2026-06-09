---
title: "eslint/no-implicit-globals | Oxlint"
rule: "eslint/no-implicit-globals"
category: "Restriction"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-implicit-globals"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_implicit_globals.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在全局作用域中声明、全局变量泄漏，以及
对只读全局变量的写入或重新声明。

### 为什么这很糟糕？

浏览器脚本共享同一个全局作用域。顶层的 `var` 和 `function`
声明，以及在宽松模式下对未声明变量的赋值，
都会创建可能与其他脚本冲突的全局变量。

### 示例

以下是此规则的**错误**代码示例：

```js
var foo = 1;
function bar() {}
baz = 1;
```

以下是此规则的**正确**代码示例：

```js
window.foo = 1;
(function () {
  var bar = 1;
})();
```

## 配置

### lexicalBindings

type: `boolean`

default: `false`

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.65.0 中添加的。

## 参考资料

<RuleReferences />
