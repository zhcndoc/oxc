---
title: "eslint/default-param-last | Oxlint"
rule: "eslint/default-param-last"
category: "风格"
version: "0.2.15"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/default_param_last.rs`;
</script>

<RuleHeader />

### 作用

要求函数中的默认参数必须位于最后。

### 为什么不好？

将默认参数放在最后允许函数调用省略可选的尾部参数，
从而提高可读性和一致性。此规则同样适用于 JavaScript 和
TypeScript 函数。

### 示例

此规则 **错误** 代码示例：

```js
/* default-param-last: "error" */

function f(a = 0, b) {}
function f(a, b = 0, c) {}
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby");
```

此规则 **正确** 代码示例：

```js
/* default-param-last: "error" */

function f(a, b = 0) {}
function f(a = 0, b = 0) {}
function createUser(id, isAdmin = false) {}
createUser("tabby");
```

此规则 **错误** 的 TypeScript 代码示例：

```ts
/* default-param-last: "error" */

function greet(message: string = "Hello", name: string) {}
function combine(a: number = 1, b: number, c: number) {}
function combine(a: number, b: number = 2, c: number) {}
function combine(a: number = 1, b?: number, c: number) {}
```

此规则 **正确** 的 TypeScript 代码示例：

```ts
/* default-param-last: "error" */

function greet(name: string, message: string = "Hello") {}
function combine(a: number, b: number = 2, c: number = 3) {}
function combine(a: number, b?: number, c: number = 3) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.15 中加入。

## 参考资料

<RuleReferences />
