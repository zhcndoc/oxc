---
title: "typescript/no-confusing-void-expression | Oxlint"
rule: "typescript/no-confusing-void-expression"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_safe_fix_or_suggestion"
upstream: "https://typescript-eslint.io/rules/no-confusing-void-expression/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_confusing_void_expression.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_confusing_void_expression/no_confusing_void_expression.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止在容易引起混淆的位置使用 void 表达式，例如箭头函数返回值处。

### 为什么这很糟糕？

当你希望执行一个表达式并同时求值为 `undefined` 时，void 操作符非常有用。然而，当它被用于返回值具有意义的地方时，尤其是在箭头函数和条件表达式中，就会令人困惑。

### 示例

以下是此规则的**错误**代码示例：

```ts
// 返回 void 表达式的箭头函数
const foo = () => void bar();

// 条件表达式
const result = condition ? void foo() : bar();

// 条件中的 void
if (void foo()) {
  // ...
}
```

以下是此规则的**正确**代码示例：

```ts
// void 的正确用法
void foo();

// 显式 return 语句
const foo = () => {
  bar();
  return;
};

// 语句表达式
foo();

// 使用 void 的 IIFE
void (function () {
  console.log("立即调用");
})();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreArrowShorthand

type: `boolean`

default: `false`

是否忽略返回 void 的箭头函数简写形式。
当为 true 时，允许像 `() => someVoidFunction()` 这样的表达式。

### ignoreVoidOperator

type: `boolean`

default: `false`

是否忽略使用 void 操作符的表达式。
当为 true 时，允许 `void someExpression`。

### ignoreVoidReturningFunctions

type: `boolean`

default: `false`

是否忽略调用被声明为返回 void 的函数。
当为 true 时，允许像 `x = voidReturningFunction()` 这样的表达式。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中新增。

## 参考资料

<RuleReferences />
