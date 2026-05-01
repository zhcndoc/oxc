---
title: "eslint/prefer-rest-params"
category: "Style"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_rest_params.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `arguments` 对象，转而强制使用剩余参数。

### 为什么这不好？

`arguments` 对象不具有 `Array.prototype` 中的方法，因此在进行类数组操作时不太方便。
使用剩余参数提供了一种更直观且更高效的方式来处理可变参数。

### 示例

此规则的**错误**代码示例：

```javascript
function foo() {
  console.log(arguments);
}

function foo(action) {
  var args = Array.prototype.slice.call(arguments, 1);
  action.apply(null, args);
}

function foo(action) {
  var args = [].slice.call(arguments, 1);
  action.apply(null, args);
}
```

此规则的**正确**代码示例：

```javascript
function foo(...args) {
  console.log(args);
}

function foo(action, ...args) {
  action.apply(null, args); // 或使用 `action(...args)`（与 `prefer-spread` 规则相关）。
}

// 注意：隐式的 `arguments` 可以被遮蔽。
function foo(arguments) {
  console.log(arguments); // 这指的是第一个参数。
}
function foo() {
  var arguments = 0;
  console.log(arguments); // 这是一个局部变量。
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.4 中添加。

## 参考

<RuleReferences />
