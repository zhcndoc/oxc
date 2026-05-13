---
title: "unicorn/consistent-function-scoping | Oxlint"
rule: "unicorn/consistent-function-scoping"
category: "Suspicious"
version: "0.8.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/consistent_function_scoping.rs`;
</script>

<RuleHeader />

### 作用

禁止在一个不会捕获任何外部作用域变量的作用域中声明函数。

### 为什么这不好？

将函数声明移动到尽可能高的作用域可以提高可读性，直接[提升性能](https://stackoverflow.com/questions/80802/does-use-of-anonymous-functions-affect-performance/81329#81329)，并允许 JavaScript 引擎更好地[优化你的性能](https://ponyfoo.com/articles/javascript-performance-pitfalls-v8#optimization-limit)。

### 示例

以下是此规则的**错误**代码示例：

```js
export function doFoo(foo) {
  // 不会从该作用域捕获任何内容，可以移动到外层作用域
  function doBar(bar) {
    return bar === "bar";
  }
  return doBar;
}

function doFoo(foo) {
  const doBar = (bar) => {
    return bar === "bar";
  };
}
```

以下是此规则的**正确**代码示例：

```js
function doBar(bar) {
  return bar === "bar";
}

export function doFoo(foo) {
  return doBar;
}

export function doFoo(foo) {
  function doBar(bar) {
    return bar === "bar" && foo.doBar(bar);
  }
  return doBar;
}
```

### 限制

此规则不会检测或移除函数内部多余的代码块：

```js
function doFoo(foo) {
  {
    function doBar(bar) {
      return bar;
    }
  }

  return foo;
}
```

它也会忽略包含 `JSXElement` 引用的函数：

```jsx
function doFoo(FooComponent) {
  function Bar() {
    return <FooComponent />;
  }

  return Bar;
}
```

[立即执行函数表达式（IIFE）](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) 会被忽略：

```js
(function () {
  function doFoo(bar) {
    return bar;
  }
})();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkArrowFunctions

type: `boolean`

default: `true`

是否检查箭头函数的作用域。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.8.0 中添加。

## 参考资料

<RuleReferences />
