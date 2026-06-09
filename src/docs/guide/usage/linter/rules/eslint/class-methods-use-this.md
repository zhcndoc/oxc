---
title: "eslint/class-methods-use-this | Oxlint"
rule: "eslint/class-methods-use-this"
category: "Restriction"
version: "1.16.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/class-methods-use-this"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/class_methods_use_this.rs`;
</script>

<RuleHeader />

### 说明

强制类方法使用 `this`。

### 为什么不好？

对于不使用 `this` 的类方法，你应该考虑将它们转换为 `static` 方法。这并不总是可行或可取的，但它有助于阐明该方法不依赖于实例状态。

如果你确实将方法转换为 `static` 函数，调用该特定方法的类实例也必须转换为 `static` 调用。

### 示例

此规则 **错误** 代码示例：

```js
class A {
  foo() {
    console.log("你好，世界");
  }
}
```

此规则 **正确** 代码示例：

```js
class A {
  foo() {
    this.bar = "你好，世界"; // 没问题，使用了 this
  }
}

class B {
  constructor() {
    // 没问题。constructor 被豁免
  }
}

class C {
  static foo() {
    // 没问题。static 方法不需要使用 this。
  }
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### enforceForClassFields

类型：`boolean`

默认值：`true`

对作为函数的类字段强制此规则。

### exceptMethods

类型：`string[]`

默认值：`[]`

要从此规则中豁免的方法名称列表。名称可以包含私有方法的 `#` 前缀。
示例：`save`、`#rerender`

### ignoreClassesWithImplements

类型：`"all" | "public-fields"`

默认值：`null`

是否忽略实现接口的类。

### ignoreOverrideMethods

类型：`boolean`

默认值：`false`

是否忽略被重写的方法。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.16.0 中新增。

## 参考资料

<RuleReferences />
