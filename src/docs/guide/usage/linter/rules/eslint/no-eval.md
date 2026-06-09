---
title: "eslint/no-eval | Oxlint"
rule: "eslint/no-eval"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-eval"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_eval.rs`;
</script>

<RuleHeader />

### 它的作用

禁止引用 `eval` 函数。此规则旨在通过禁止使用 `eval()` 函数来防止可能危险、不必要且缓慢的代码。

### 为什么这很糟糕？

JavaScript 的 `eval()` 函数潜在危险，而且经常被误用。对不可信代码使用 `eval()` 可能会使程序暴露于多种注入攻击之下。在大多数场景中，使用 `eval()` 都可以用更好、更安全的替代方案来解决问题，例如以更安全的方式使用 `JSON.parse()` 或 `Function` 构造器。

### 示例

以下是此规则的**错误**代码示例：

```js
const obj = { x: "foo" },
  key = "x",
  value = eval("obj." + key);

(0, eval)("const a = 0");

const foo = eval;
foo("const a = 0");

this.eval("const a = 0");
```

以下是此规则的**正确**代码示例：

```js
const obj = { x: "foo" },
  key = "x",
  value = obj[key];

class A {
  foo() {
    this.eval("const a = 0");
  }

  eval() {}

  static {
    this.eval("const a = 0");
  }

  static eval() {}
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowIndirect

type: `boolean`

default: `true`

此 `allowIndirect` 选项允许间接的 `eval()` 调用。

对 `eval` 的间接调用（例如 `window['eval']`)比直接调用危险性更低，
因为它们不能动态改变作用域。与直接调用相比，间接 `eval()` 调用通常对性能的影响也更小，
因为它们不会调用 JavaScript 的作用域链。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中添加。

## 参考

<RuleReferences />
