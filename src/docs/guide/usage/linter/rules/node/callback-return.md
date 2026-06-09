---
title: "node/callback-return | Oxlint"
rule: "node/callback-return"
category: "Style"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/callback-return.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/callback_return.rs`;
</script>

<RuleHeader />

### 作用

要求在回调后使用 `return` 语句。

### 为什么这不好？

此规则旨在确保在主函数块之外使用的回调始终是 `return` 语句的一部分，或紧接在 `return` 语句之前。
此规则会根据被调用函数的名称来判断什么是回调。

### 示例

以下是此规则的**错误**代码示例：

```js
function done(err) {
  if (err) {
    callback(err);
  }
  callback();
}
```

以下是此规则的**正确**代码示例：

```js
function done(err) {
  if (err) {
    return callback(err);
  }
  callback();
}
```

### 已知限制

由于通过静态分析很难理解程序的含义，此规则存在一些限制：

- 当此规则报告代码正确，但程序多次调用回调时，可能出现_假阴性_（这种行为是错误的）
- 当此规则报告代码错误，但程序只调用回调一次时，可能出现_假阳性_（这种行为是正确的）

#### 通过引用传递回调

此规则的静态分析无法检测到程序是否在函数参数中传入了回调（例如 `setTimeout`）。

此规则报告代码正确时的_假阴性_示例：

```js
function foo(err, callback) {
  if (err) {
    setTimeout(callback, 0); // 这是错误的，但不会警告
  }
  callback();
}
```

#### 在嵌套函数中触发回调

此规则的静态分析无法检测到程序是否在嵌套函数或立即调用函数表达式（IIFE）中调用了回调。

此规则报告代码正确时的_假阴性_示例：

```js
function foo(err, callback) {
  if (err) {
    process.nextTick(function () {
      return callback(); // 这是错误的，但不会警告
    });
  }
  callback();
}
```

#### if/else 语句

此规则的静态分析无法检测到程序是否在 `if` 语句的每个分支中都只调用了一次回调。

此规则报告代码错误时的_假阳性_示例：

```js
function foo(err, callback) {
  if (err) {
    callback(err); // 这样没问题，但会警告
  } else {
    callback(); // 这样没问题，但会警告
  }
}
```

## 配置

该规则接受一个选项——一个可能的回调名称数组——其中可以包含对象方法。默认的回调名称为 `callback`、`cb`、`next`。

type: `string[]`

default: `[]`

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.67.0 中添加。

## 参考资料

<RuleReferences />
