---
title: "eslint/no-useless-computed-key | Oxlint"
rule: "eslint/no-useless-computed-key"
category: "Style"
version: "1.16.0"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/no-useless-computed-key"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_computed_key.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在对象和类中使用不必要的计算属性键。

### 这为什么不好？

对字面量使用计算属性是不必要的，例如：

```js
const foo = { ["a"]: "b" };
```

代码可以重写为：

```js
const foo = { a: "b" };
```

### 示例

此规则的**错误**代码示例：

```js
const a = { ["0"]: 0 };
const b = { ["0+1,234"]: 0 };
const c = { [0]: 0 };
const e = { ["x"]() {} };

class Foo {
  ["foo"] = "bar";
  [0]() {}
  static ["foo"] = "bar";
  get ["b"]() {}
  set ["c"](value) {}
}
```

此规则的**正确**代码示例：

```js
const a = { a: 0 };
const b = { 0: 0 };
const c = { x() {} };
const e = { "0+1,234": 0 };

class Foo {
  foo = "bar";
  0() {}
  a() {}
  static foo = "bar";
}
```

此规则的附加**正确**代码示例：

```js
const c = {
  __proto__: foo, // 定义对象的原型
  ["__proto__"]: bar, // 定义一个名为 "__proto__" 的属性
};
class Foo {
  ["constructor"]; // 名为 "constructor" 的实例字段
  constructor() {} // 此类的构造函数
  static ["constructor"]; // 名为 "constructor" 的静态字段
  static ["prototype"]; // 运行时错误，如果没有 `[]`，这将是解析错误
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### enforceForClassMembers

type: `boolean`

default: `true`

`enforceForClassMembers` 选项控制该规则是否适用于
类成员（方法和属性）。

使用 `{ "enforceForClassMembers": false }` 选项时，此规则的**正确**代码示例：

```js
class SomeClass {
  ["foo"] = "bar";
  [42] = "baz";
  get ["b"]() {}
  set ["c"](value) {}
  static ["foo"] = "bar";
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.16.0 中添加。

## 参考

<RuleReferences />
