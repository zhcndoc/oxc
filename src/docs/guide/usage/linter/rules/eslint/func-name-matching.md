---
title: "eslint/func-name-matching"
category: "风格"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/func_name_matching.rs`;
</script>

<RuleHeader />

### 作用

要求函数表达式名称与其被赋值到的变量名或属性名匹配，或者在 `"never"` 下禁止这种匹配。

### 为什么这不好？

匹配的名称让堆栈跟踪和源代码之间更容易对应。
如果项目更偏好不同的名称，`"never"` 选项会一致地强制执行这一约定。

### 示例

以下是此规则的**错误**代码示例：

```js
/*eslint func-name-matching: "error"*/

let foo = function bar() {};
foo = function bar() {};
const obj = { foo: function bar() {} };
obj.foo = function bar() {};
obj["foo"] = function bar() {};

class C {
  foo = function bar() {};
}

/*eslint func-name-matching: ["error", "never"] */

let foo = function foo() {};
foo = function foo() {};
const obj = { foo: function foo() {} };
obj.foo = function foo() {};
obj["foo"] = function foo() {};

class C {
  foo = function foo() {};
}
```

以下是此规则的**正确**代码示例：

```js
/*eslint func-name-matching: "error"*/
// 等同于 /*eslint func-name-matching: ["error", "always"]*/

const foo = function foo() {};
const foo1 = function () {};
const foo2 = () => {};
foo = function foo() {};

const obj = { foo: function foo() {} };
obj.foo = function foo() {};
obj["foo"] = function foo() {};

const obj1 = { [foo]: function bar() {} };
const obj3 = { foo: function () {} };

obj["x" + 2] = function bar() {};
const [bar] = [function bar() {}];

class C {
  foo = function foo() {};
  baz = function () {};
}

// 私有名称会被忽略
class D {
  #foo = function foo() {};
  #bar = function foo() {};
  baz() {
    this.#foo = function foo() {};
    this.#foo = function bar() {};
  }
}

module.exports = function foo(name) {};

/*eslint func-name-matching: ["error", "never"] */

let foo = function bar() {};
const foo1 = function () {};
const foo2 = () => {};
foo = function bar() {};

const obj = { foo: function bar() {} };
obj.foo = function bar() {};
obj["foo"] = function bar() {};

const obj1 = { foo: function bar() {} };
const obj2 = { [foo]: function foo() {} };
const obj4 = { foo: function () {} };

obj["x" + 2] = function bar() {};
const [bar] = [function bar() {}];

class C {
  foo = function bar() {};
  baz = function () {};
}

// 私有名称会被忽略
class D {
  #foo = function foo() {};
  #bar = function foo() {};
  baz() {
    this.#foo = function foo() {};
    this.#foo = function bar() {};
  }
}

module.exports = function foo(name) {};
```

## 配置

此规则接受一个可选字符串 `"always"` 或 `"never"`（省略时默认为 `"always"`），以及一个包含 `considerPropertyDescriptor` 和 `includeCommonJSModuleExports` 两个属性的可选选项对象。

### 第 1 个选项

type: `"always" | "never"`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### considerPropertyDescriptor

type: `boolean`

default: `false`

如果将 `considerPropertyDescriptor` 设为 `true`，检查时会考虑 `Object.create`、`Object.defineProperty`、`Object.defineProperties` 和 `Reflect.defineProperty` 的使用。

#### includeCommonJSModuleExports

type: `boolean`

default: `false`

如果将 `includeCommonJSModuleExports` 设为 `true`，则此规则会检查 `module.exports` 和 `module["exports"]`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.62.0 中添加。

## 参考资料

<RuleReferences />
