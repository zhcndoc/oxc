---
title: "typescript/explicit-member-accessibility | Oxlint"
rule: "typescript/explicit-member-accessibility"
category: "Restriction"
version: "1.61.0"
default: false
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
upstream: "https://typescript-eslint.io/rules/explicit-member-accessibility/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/explicit_member_accessibility.rs`;
</script>

<RuleHeader />

### 它的作用

要求在类属性和方法上显式添加可访问性修饰符。

### 为什么这不好？

TypeScript 允许在类成员前显式放置 `public`、`protected` 和 `private`
可访问性修饰符。这些修饰符仅存在于类型系统中，用于描述谁可以访问
这些成员。

省略可访问性修饰符会让代码更少，也更容易读写。成员默认是 `public`。
不过，添加显式修饰符可以让代码更易读，并且更明确地说明谁可以使用
哪些属性。

### 示例

#### `{ "accessibility": "explicit" }`（默认）

以下是**错误**代码示例：

```ts
class Animal {
  constructor(name: string) {}
  animalName: string;
  get name(): string {
    return this.animalName;
  }
}
```

以下是**正确**代码示例：

```ts
class Animal {
  public constructor(name: string) {}
  private animalName: string;
  public get name(): string {
    return this.animalName;
  }
}
```

#### `{ "accessibility": "no-public" }`

以下是**错误**代码示例：

```ts
class Animal {
  public constructor(
    public breed: string,
    name: string,
  ) {}
  public animalName: string;
  public get name(): string {
    return this.animalName;
  }
}
```

以下是**正确**代码示例：

```ts
class Animal {
  constructor(
    protected breed: string,
    name: string,
  ) {}
  private animalName: string;
  get name(): string {
    return this.animalName;
  }
}
```

#### `{ "overrides": { "constructors": "no-public" } }`

禁止在构造函数上使用 `public`，同时要求其他所有地方都使用显式
修饰符。

以下是**错误**代码示例：

```ts
class Animal {
  public constructor(protected animalName: string) {}
}
```

以下是**正确**代码示例：

```ts
class Animal {
  constructor(protected animalName: string) {}
  public get name(): string {
    return this.animalName;
  }
}
```

#### `{ "accessibility": "no-public", "overrides": { "properties": "explicit" } }`

要求在属性上使用显式修饰符，同时在其他所有地方禁止使用 `public`。

以下是**错误**代码示例：

```ts
class Animal {
  legs: number;
  private hasFleas: boolean;
}
```

以下是**正确**代码示例：

```ts
class Animal {
  public legs: number;
  private hasFleas: boolean;
}
```

## 配置

该规则接受一个包含以下属性的配置对象：

### accessibility

type: `"explicit" | "no-public" | "off"`

指定需要存在或不需要存在的可访问性修饰符类型。

#### `"explicit"`

始终要求存在可访问性修饰符。

#### `"no-public"`

除 `public` 之外，要求存在可访问性修饰符。

#### `"off"`

从不检查是否存在可访问性修饰符。

### ignoredMethodNames

type: `string[]`

default: `[]`

可以被忽略的特定方法名。

### overrides

type: `object`

针对特定类型的类成员，修改所需的可访问性修饰符。

#### overrides.accessors

type: `"explicit" | "no-public" | "off"`

对访问器（getter/setter）应用的成员可访问性修饰符要求。

#### overrides.constructors

type: `"explicit" | "no-public" | "off"`

对构造函数应用的成员可访问性修饰符要求。

#### overrides.methods

type: `"explicit" | "no-public" | "off"`

对方法应用的成员可访问性修饰符要求。

#### overrides.parameterProperties

type: `"explicit" | "no-public" | "off"`

对参数属性应用的成员可访问性修饰符要求。

#### overrides.properties

type: `"explicit" | "no-public" | "off"`

对属性应用的成员可访问性修饰符要求。

## 如何使用

<RuleHowToUse />

## Version

此规则于 v1.61.0 中添加。

## References

<RuleReferences />
