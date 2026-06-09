---
title: "unicorn/prefer-class-fields | Oxlint"
rule: "unicorn/prefer-class-fields"
category: "样式"
version: "1.20.0"
default: false
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-class-fields.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_class_fields.rs`;
</script>

<RuleHeader />

### 作用

优先使用类字段声明，而不是在构造函数中通过 `this` 赋值来设置静态值。

### 为什么这样不好？

类字段声明比在构造函数中将静态值赋给 `this` 更易读，也更不容易出错。使用类字段可以让构造函数更简洁，并且让意图更明确。

### 示例

以下是此规则的**错误**代码示例：

```ts
class Foo {
  constructor() {
    this.bar = 1;
  }
}

class MyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MyError";
  }
}

class Foo {
  foo = "foo";
  constructor() {
    this.foo = "bar";
  }
}
```

以下是此规则的**正确**代码示例：

```js
class Foo {
  bar = 1;
}

class MyError extends Error {
  name = "MyError";
}

class Foo {
  foo = "bar";
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.20.0 中加入。

## 参考资料

<RuleReferences />
