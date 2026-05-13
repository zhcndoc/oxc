---
title: "typescript/no-meaningless-void-operator | Oxlint"
rule: "typescript/no-meaningless-void-operator"
category: "Correctness"
version: "1.12.0"
default: true
type_aware: true
fix: "fixable_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_meaningless_void_operator.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_meaningless_void_operator/no_meaningless_void_operator.go`;
</script>

<RuleHeader />

### 它的作用

当 `void` 操作符的参数已经是 `void` 或 `undefined` 类型时，此规则不允许使用它。

### 为什么这很糟糕？

当你想执行一个表达式并强制其求值为 `undefined` 时，`void` 操作符非常有用。然而，对已经是 `void` 或 `undefined` 类型的表达式使用 `void` 是没有意义的，并且会给代码增加不必要的复杂性。

### 示例

此规则的**错误**代码示例：

```ts
function foo(): void {
  return;
}

void foo(); // 无意义，foo() 已经返回 void

void undefined; // 无意义，undefined 已经是 undefined

async function bar() {
  void (await somePromise); // 如果 somePromise resolve 为 void，则无意义
}
```

此规则的**正确**代码示例：

```ts
function getValue(): number {
  return 42;
}

void getValue(); // 有意义，将 number 转换为 void

void console.log("hello"); // 有意义，console.log 返回 undefined，但我们希望显式地写出来

function processData() {
  // 一些处理
}

processData(); // 不需要 void，因为我们不关心返回值
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkNever

type: `boolean`

default: `false`

是否检查应用于 `never` 类型表达式的 `void`。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.12.0 中添加的。

## 参考

<RuleReferences />
