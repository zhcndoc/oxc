---
title: "unicorn/custom-error-definition"
category: "样式"
version: "1.57.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/custom_error_definition.rs`;
</script>

<RuleHeader />

### 它的作用

强制规定 Error 子类化的唯一有效方式。它适用于任何以 Error 结尾的父类。

### 为什么这有问题？

定义不正确的自定义错误可能会在捕获和识别错误时导致意外行为。缺少 `super()` 调用、错误的 `name` 属性值，或者非标准的类名都会使错误处理不可靠。

### 示例

以下是此规则的 **错误** 代码示例：

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    // `this.message` 赋值是多余的，因为它已经通过 `super()` 调用设置好了。
    this.message = message;
    this.name = "CustomError";
  }
}

class CustomError extends Error {
  constructor(message) {
    super();
    // 将错误消息传递给 `super()`，而不是设置 `this.message`。
    this.message = message;
    this.name = "CustomError";
  }
}

class CustomError extends Error {
  constructor(message) {
    super(message);
    // 未设置 `name` 属性。需要 `name` 属性，这样错误
    // 才会显示为 `[CustomError: foo]`，而不是 `[Error: foo]`。
  }
}

class CustomError extends Error {
  constructor(message) {
    super(message);
    // 使用字符串字面量来设置 `name` 属性，因为在压缩后它不会改变。
    this.name = this.constructor.name;
  }
}

class CustomError extends Error {
  constructor(message) {
    super(message);
    // `name` 属性应设置为类名。
    this.name = "MyError";
  }
}
```

以下是此规则的 **正确** 代码示例：

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

class CustomError extends Error {
  constructor() {
    super("My custom error");
    this.name = "CustomError";
  }
}

class CustomError extends TypeError {
  constructor() {
    super();
    this.name = "CustomError";
  }
}

class CustomError extends Error {
  name = "CustomError";
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.57.0 中加入。

## 参考资料

<RuleReferences />
