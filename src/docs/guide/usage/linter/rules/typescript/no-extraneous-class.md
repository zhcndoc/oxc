---
title: "typescript/no-extraneous-class"
category: "Suspicious"
version: "0.7.0"
default: false
type_aware: false
fix: "fixable_dangerous_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_extraneous_class.rs`;
</script>

<RuleHeader />

### 作用

当一个类没有任何非静态成员时，此规则会报告问题，例如仅被用作静态命名空间的类。此规则还会报告那些只有构造函数而没有字段的类。这类类通常可以用一个独立函数替代。

### 为什么这不好？

来自 OOP 范式的用户可能会把他们的工具函数再包一层类，而不是直接把它们放在 ECMAScript 模块的顶层。在 JavaScript 和 TypeScript 项目中，这样做通常是不必要的。

- 包装类会增加代码的额外认知复杂度，但不会带来任何结构上的改进
  - 无论放在它们上面的是什么，例如工具函数，本来就因为位于模块中而已经组织好了。
  - 作为替代，你可以使用 `import * as ...` 来导入整个模块，从而将它们放进一个单独对象中。
- 当你开始输入属性名时，IDE 无法为静态类或命名空间导入的属性提供同样好的建议
- 当所有内容都放在类上时，对代码中的未使用变量等进行静态分析会更困难（参见：[在 TypeScript 中查找死代码（以及死类型）](https://effectivetypescript.com/2020/10/20/tsprune/)）。

此规则还会报告那些只有构造函数而没有字段的类。这类类通常可以用一个独立函数替代。

### 示例

此规则的**错误**代码示例：

```ts
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === "production";
  }
}

class HelloWorldLogger {
  constructor() {
    console.log("Hello, world!");
  }
}

abstract class Foo {}
```

此规则的**正确**代码示例：

```ts
const version = 42;
const isProduction = () => process.env.NODE_ENV === "production";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowConstructorOnly

type: `boolean`

default: `false`

允许只有构造函数的类。

### allowEmpty

type: `boolean`

default: `false`

允许空类。

### allowStaticOnly

type: `boolean`

default: `false`

允许只有静态成员的类。

### allowWithDecorator

type: `boolean`

default: `false`

允许带有装饰器的类。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中添加。

## 参考

<RuleReferences />
