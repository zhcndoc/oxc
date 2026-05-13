---
title: "node/handle-callback-err | Oxlint"
rule: "node/handle-callback-err"
category: "限制"
version: "1.56.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/handle_callback_err.rs`;
</script>

<RuleHeader />

### 作用

当你在 Node.js 中使用回调模式时，此规则要求你处理错误。

### 为什么这不好？

在 Node.js 中，处理异步行为的一种常见模式称为回调模式。
这种模式期望回调函数的第一个参数是一个 `Error` 对象或 `null`。
忘记处理这些错误可能会导致你的应用程序出现一些非常奇怪的行为。

```js
function loadData(err, data) {
  doSomething(); // 忘记处理错误
}
```

### 示例

以下是此规则在默认 `"err"` 参数名下的**错误**代码示例：

```js
function loadData(err, data) {
  doSomething();
}
```

以下是此规则在默认 `"err"` 参数名下的**正确**代码示例：

```js
function loadData(err, data) {
  if (err) {
    console.log(err.stack);
  }
  doSomething();
}

function generateError(err) {
  if (err) {
  }
}
```

以下是此规则在示例 `"error"` 参数名下的正确代码示例：

```js
function loadData(error, data) {
  if (error) {
    console.log(error.stack);
  }
  doSomething();
}
```

## 配置

该规则接受一个字符串选项：错误参数的名称。

这可以是以下两种之一：

- 精确名称（例如 `"err"`、`"error"`）
- 正则表达式模式（例如 `"^(err|error)$"`）

如果配置的错误变量名称以 `^` 开头，则会被视为正则表达式模式。

默认值：`"err"`。

type: `string`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.56.0 中添加。

## 参考资料

<RuleReferences />
