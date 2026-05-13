---
title: "eslint/no-object-constructor | Oxlint"
rule: "eslint/no-object-constructor"
category: "Pedantic"
version: "0.13.2"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_object_constructor.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在没有参数的情况下调用 Object 构造函数。

### 为什么这不好？

通常不建议使用 Object 构造函数来创建一个新的空对象，而应使用对象字面量表示法，因为它更简洁，而且全局的 Object 可能会被重新定义。例外情况是，当 Object 构造函数被用于有意包装一个作为参数传入的指定值时。

### 示例

此规则的**错误**代码示例：

```js
Object();
new Object();
```

此规则的**正确**代码示例：

```js
Object("foo");
const obj = { a: 1, b: 2 };
const isObject = (value) => value === Object(value);
const createObject = (Object) => new Object();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.13.2。

## 参考资料

<RuleReferences />
