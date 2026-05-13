---
title: "eslint/no-empty-function | Oxlint"
rule: "eslint/no-empty-function"
category: "Restriction"
version: "0.3.3"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_empty_function.rs`;
</script>

<RuleHeader />

### 作用

禁止使用空函数。

### 为什么不好？

空函数会降低可读性，因为读者需要猜测这是否是有意为之。因此，为空函数编写清晰的注释是一个好习惯。

### 示例

此规则 **错误** 代码示例：

```typescript
function foo() {}

const bar = () => {};

class Foo {
  constructor();
  someMethod() {}
  set bar(value) {}
}
```

此规则 **正确** 代码示例：

```typescript
function foo() {
  // 什么都不做
}

function foo() {
  return;
}
const add = (a, b) => a + b;

class Foo {
  // 构造函数体为空，但它声明了一个名为
  // `_name` 的私有属性
  constructor(private _name: string) {}

  public get name() {
    return this._name;
  }
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

类型：`array`

允许为空的函数类型。

默认情况下，不允许任何类型的函数为空，但此选项可用于允许特定类型的函数。

示例：

```json
{
  "no-empty-function": [
    "error",
    {
      "allow": ["constructors"]
    }
  ]
}
```

#### allow[n]

类型：`"functions" | "arrowFunctions" | "generatorFunctions" | "methods" | "generatorMethods" | "getters" | "setters" | "constructors" | "asyncFunctions" | "asyncMethods" | "privateConstructors" | "protectedConstructors" | "decoratedFunctions" | "overrideMethods"`

允许为空的函数种类。

##### `"functions"`

允许空普通函数。

```js
function foo() {}
```

##### `"arrowFunctions"`

允许空箭头函数。

```js
const foo = () => {};
```

##### `"generatorFunctions"`

允许空生成器函数。

```js
function* foo() {}
```

##### `"methods"`

允许空方法。

```js
class Foo {
  bar() {}
}
```

##### `"generatorMethods"`

允许空生成器方法。

```js
class Foo {
  *bar() {}
}
```

##### `"getters"`

允许空 getter。

```js
class Foo {
  get bar() {}
}
```

##### `"setters"`

允许空 setter。

```js
class Foo {
  set bar(value) {}
}
```

##### `"constructors"`

允许空构造函数。

```js
class Foo {
  constructor() {}
}
```

##### `"asyncFunctions"`

允许空异步函数。

```js
async function foo() {}
```

##### `"asyncMethods"`

允许空异步方法。

```js
class Foo {
  async bar() {}
}
```

##### `"privateConstructors"`

允许空私有构造函数。

```ts
class Foo {
  private constructor() {}
}
```

##### `"protectedConstructors"`

允许空受保护构造函数。

```ts
class Foo {
  protected constructor() {}
}
```

##### `"decoratedFunctions"`

允许空装饰函数。

```js
class Foo {
  @decorator()
  bar() {}
}
```

##### `"overrideMethods"`

允许空重写方法。

```ts
class Foo extends Base {
  override bar() {}
}
```

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.3.3 中添加。

## 参考资料

<RuleReferences />
