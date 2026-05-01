---
title: "unicorn/no-accessor-recursion"
category: "Suspicious"
version: "0.16.5"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_accessor_recursion.rs`;
</script>

<RuleHeader />

### 作用

禁止在 getter 和 setter 中递归访问 `this`。

### 为什么这不好？

该规则会阻止在对象和类的 getter 与 setter 方法中对 `this` 的递归访问，从而避免无限递归和堆栈溢出错误。

### 示例

以下是此规则的**错误**代码示例：

```js
const foo = {
  get bar() {
    return this.bar;
  },
};

const baz = {
  set bar(value) {
    this.bar = value;
  },
};
```

以下是此规则的**正确**代码示例：

```js
const foo = {
  get bar() {
    return this.qux;
  },
};

const baz = {
  set bar(value) {
    this._bar = value;
  },
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.16.5 中添加。

## 参考资料

<RuleReferences />
