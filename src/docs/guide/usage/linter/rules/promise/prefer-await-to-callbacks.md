---
title: "promise/prefer-await-to-callbacks | Oxlint"
rule: "promise/prefer-await-to-callbacks"
category: "Style"
version: "0.9.10"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/prefer-await-to-callbacks.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/prefer_await_to_callbacks.rs`;
</script>

<RuleHeader />

### 它的作用

该规则鼓励使用 `async/await` 来处理异步代码，
而不是传统的回调函数。`async/await` 于 ES2017 中引入，
为编写异步代码提供了更清晰、更简洁的语法，
使其更易于阅读和维护。

### 为什么这不好？

使用回调可能会导致复杂的嵌套结构，即所谓的“回调地狱”，
这会使代码难以阅读和维护。此外，错误处理也会
因为回调而变得繁琐，而 `async/await` 允许使用更直接的
try/catch 块来管理错误。

### 示例

以下是此规则的**错误**代码示例：

```js
cb();
callback();
doSomething(arg, (err) => {});
function doSomethingElse(cb) {}
```

以下是此规则的**正确**代码示例：

```js
await doSomething(arg);
async function doSomethingElse() {}
function* generator() {
  yield yieldValue((err) => {});
}
eventEmitter.on("error", (err) => {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.10 中添加。

## 参考资料

<RuleReferences />
