---
title: "eslint/no-magic-numbers"
category: "样式"
version: "0.9.3"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_magic_numbers.rs`;
</script>

<RuleHeader />

### 它的作用

此规则旨在通过确保特殊数字被声明为常量来使代码更易读并更易于重构，从而明确其含义。
当前实现不支持数组索引中的 BigInt 数字。

### 为什么这很糟糕？

“魔法数字”是指在代码中多次出现但没有明确含义的数字。最好将它们替换为有名称的常量。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var dutyFreePrice = 100;
var finalPrice = dutyFreePrice + dutyFreePrice * 0.25;
```

以下是使用选项 "ignore" 时，此规则的**正确**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "ignore": [1] }]*/
var data = ["foo", "bar", "baz"];
var dataLast = data.length && data[data.length - 1];
```

以下是使用选项 "ignoreArrayIndexes" 时，此规则的**正确**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/
var item = data[2];
data[100] = a;
f(data[0]);
a = data[-0]; // 与 data[0] 相同，-0 将被强制转换为 "0"
a = data[0xab];
a = data[5.6e1];
a = data[4294967294]; // 最大数组索引
```

以下是使用选项 "ignoreDefaultValues" 时，此规则的**正确**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "ignoreDefaultValues": true }]*/
const { tax = 0.25 } = accountancy;
function mapParallel(concurrency = 3) {
  /***/
}
```

以下是使用选项 "ignoreClassFieldInitialValues" 时，此规则的**正确**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "ignoreClassFieldInitialValues": true }]*/
class C {
  foo = 2;
  bar = -3;
  #baz = 4;
  static qux = 5;
}
```

以下是使用选项 "enforceConst" 时，此规则的**错误**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "enforceConst": true }]*/
var TAX = 0.25;
```

以下是使用选项 "detectObjects" 时，此规则的**错误**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "detectObjects": true }]*/
var magic = {
  tax: 0.25,
};
```

以下是使用选项 "detectObjects" 时，此规则的**正确**代码示例：

```javascript
/*typescript no-magic-numbers: ["error", { "detectObjects": true }]*/
var TAX = 0.25;

var magic = {
  tax: TAX,
};
```

以下是使用选项 "ignoreEnums" 时，此规则的**正确**代码示例：

```typescript
/*typescript no-magic-numbers: ["error", { "ignoreEnums": true }]*/
enum foo {
  SECOND = 1000,
}
```

以下是使用选项 "ignoreNumericLiteralTypes" 时，此规则的**正确**代码示例：

```typescript
/*typescript no-magic-numbers: ["error", { "ignoreNumericLiteralTypes": true }]*/
type SmallPrimes = 2 | 3 | 5 | 7 | 11;
```

以下是使用选项 "ignoreReadonlyClassProperties" 时，此规则的**正确**代码示例：

```typescript
/*typescript no-magic-numbers: ["error", { "ignoreReadonlyClassProperties": true }]*/
class Foo {
  readonly A = 1;
  readonly B = 2;
  public static readonly C = 1;
  static readonly D = 1;
}
```

以下是使用选项 "ignoreTypeIndexes" 时，此规则的**正确**代码示例：

```typescript
/*typescript no-magic-numbers: ["error", { "ignoreTypeIndexes": true }]*/
type Foo = Bar[0];
type Baz = Parameters<Foo>[2];
```

## 配置

此规则接受一个包含以下属性的配置对象：

### detectObjects

type: `boolean`

default: `false`

为 true 时，对象属性中使用的数字字面量会被视为魔法数字。

### enforceConst

type: `boolean`

default: `false`

为 true 时，强制数字常量必须使用 `const` 声明，而不是 `let` 或 `var`。

### ignore

type: `array`

default: `[]`

要忽略的数字数组，如果它们被用作魔法数字。可以包含浮点数或 BigInt 字符串。

#### ignore[n]

### ignoreArrayIndexes

type: `boolean`

default: `false`

为 true 时，作为数组索引使用的数字字面量会被忽略。

### ignoreClassFieldInitialValues

type: `boolean`

default: `false`

为 true 时，类字段中的初始值数字字面量会被忽略。

### ignoreDefaultValues

type: `boolean`

default: `false`

为 true 时，函数参数和解构中的默认值数字字面量会被忽略。

### ignoreEnums

type: `boolean`

default: `false`

为 true 时，TypeScript 枚举中的数字字面量会被忽略。

### ignoreNumericLiteralTypes

type: `boolean`

default: `false`

为 true 时，作为 TypeScript 数字字面量类型使用的数字字面量会被忽略。

### ignoreReadonlyClassProperties

type: `boolean`

default: `false`

为 true 时，readonly 类属性中的数字字面量会被忽略。

### ignoreTypeIndexes

type: `boolean`

default: `false`

为 true 时，作为 TypeScript 类型索引使用的数字字面量会被忽略。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.3 中添加。

## 参考资料

<RuleReferences />
