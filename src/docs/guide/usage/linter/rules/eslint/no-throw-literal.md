---
title: "eslint/no-throw-literal | Oxlint"
rule: "eslint/no-throw-literal"
category: "Pedantic"
version: "0.9.10"
default: false
type_aware: false
fix: "conditional_suggestion"
upstream: "https://eslint.org/docs/latest/rules/no-throw-literal"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_throw_literal.rs`;
</script>

<RuleHeader />

### 作用

禁止抛出字面量或非 Error 对象作为异常。

::: warning
此规则已被弃用，请改用 [typescript/only-throw-error](https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error.html)。
与 Javascript 版本相比，typescript 规则更可靠，因为它的误报更少，并且能捕获更多情况。
:::

### 为什么这不好？

通常认为，只抛出 Error 对象本身，或者抛出以 Error 对象为基类的用户自定义异常对象，才是良好实践。Error 对象的根本优势在于，它们会自动记录自己被构建和产生的位置。

### 示例

以下是此规则的**错误**代码示例：

```js
throw "error";

throw 0;

throw undefined;

throw null;

var err = new Error();
throw "an " + err;
// err 被重写为一个字符串字面量

var err = new Error();
throw `${err}`;
```

以下是此规则的**正确**代码示例：

```js
throw new Error();

throw new Error("error");

var e = new Error("error");
throw e;

try {
  throw new Error("error");
} catch (e) {
  throw e;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.9.10。

## 参考资料

<RuleReferences />
