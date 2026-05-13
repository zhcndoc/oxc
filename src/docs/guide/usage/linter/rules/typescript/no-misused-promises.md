---
title: "typescript/no-misused-promises | Oxlint"
rule: "typescript/no-misused-promises"
category: "Pedantic"
version: "1.11.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_misused_promises.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_misused_promises/no_misused_promises.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止在 TypeScript 编译器允许但未被正确处理的逻辑位置中提供 Promise，例如 if 语句中。这些情况通常是由于缺少 `await` 关键字，或者只是误解了 async 函数的处理/await 方式。

### 为什么这不好？

误用 Promise 可能导致崩溃或其他意外行为，除非注册了某些全局未处理 Promise 处理器。

### 示例

此规则的**错误**代码示例：

```ts
// 条件中的 Promise：
const promise = Promise.resolve("value");
if (promise) {
  // 执行某些操作
}

// 期望返回 `void` 的位置中使用 Promise：
[1, 2, 3].forEach(async (value) => {
  await fetch(`/${value}`);
});

// 展开 Promise：
const getData = () => fetch("/");
console.log({ foo: 42, ...getData() });
```

此规则的**正确**代码示例：

```ts
// 在条件中等待 Promise 以获取其值：
const promise = Promise.resolve("value");
if (await promise) {
  // 执行某些操作
}

// 使用带有内部 `await` 的 `for-of`（而不是 `forEach`）：
for (const value of [1, 2, 3]) {
  await fetch(`/${value}`);
}

// 展开的是 Promise 返回的数据，而不是 Promise 本身：
const getData = () => fetch("/");
console.log({ foo: 42, ...(await getData()) });
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checksConditionals

type: `boolean`

default: `true`

是否检查在条件语句中使用 Promise。
当为 true 时，不允许在期望布尔值的条件中使用 Promise。

### checksSpreads

type: `boolean`

default: `true`

是否检查在展开语法中使用 Promise。
当为 true 时，不允许展开 Promise 值。

### checksVoidReturn

type: `object | boolean`

#### checksVoidReturn.arguments

type: `boolean`

default: `true`

是否检查作为参数传递给返回 void 的函数的返回 Promise 的函数。

#### checksVoidReturn.attributes

type: `boolean`

default: `true`

是否检查 JSX 属性中期望返回 void 的 Promise 返回函数。

#### checksVoidReturn.inheritedMethods

type: `boolean`

default: `true`

是否检查覆盖返回 void 的继承方法的 Promise 返回方法。

#### checksVoidReturn.properties

type: `boolean`

default: `true`

是否检查赋值给期望为 void 的对象属性的 Promise 返回函数。

#### checksVoidReturn.returns

type: `boolean`

default: `true`

是否检查从返回 void 的函数中返回的 Promise 值。

#### checksVoidReturn.variables

type: `boolean`

default: `true`

是否检查赋值给类型为返回 void 的变量的 Promise 返回函数。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.11.0 中添加。

## 参考资料

<RuleReferences />
