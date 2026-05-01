---
title: "typescript/consistent-type-assertions"
category: "Style"
version: "1.44.0"
default: false
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_type_assertions.rs`;
</script>

<RuleHeader />

### 功能

强制一致使用 TypeScript 类型断言。

### 为什么这不好？

混用断言风格（`as` 与尖括号）会让代码更难阅读和维护。
在某些代码库中，类型断言会被禁止，转而使用更安全的替代方案，例如
类型注解或 `satisfies`。

### 示例

以下是此规则的**错误**代码示例（默认：`assertionStyle: "as"`）：

```ts
const value = <Foo>bar;
```

以下是此规则的**正确**代码示例（默认：`assertionStyle: "as"`）：

```ts
const value = bar as Foo;
```

当 `objectLiteralTypeAssertions` 或 `arrayLiteralTypeAssertions` 设置为 `never` 时，针对对象和数组字面量的类型断言，更推荐使用类型注解或 `satisfies` 运算符，而不是类型断言。

当 `objectLiteralTypeAssertions: "never"` 和 `arrayLiteralTypeAssertions: "never"` 时，以下是**错误**代码示例：

```ts
const obj = { a: 1 } as Foo;
const arr = [1, 2] as Foo[];
```

当 `objectLiteralTypeAssertions: "never"` 和 `arrayLiteralTypeAssertions: "never"` 时，以下是**正确**代码示例：

```ts
const obj: Foo = { a: 1 };
const obj = { a: 1 } satisfies Foo;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### arrayLiteralTypeAssertions

type: `"allow" | "allow-as-parameter" | "never"`

数组字面量类型断言是否允许、仅在作为参数时允许，或完全禁止。

#### `"allow"`

允许在数组字面量上进行类型断言。

使用此选项时，以下是**正确**代码示例：

```ts
const x = [1, 2] as number[];
const x = ["a"] as Array<string>;
```

#### `"allow-as-parameter"`

仅当数组字面量用作函数参数、
`throw` 目标或默认值时，才允许对其进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const x = [1, 2] as Foo;
const foo = () => [5] as Foo;
```

使用此选项时，以下是**正确**代码示例：

```ts
print([5] as Foo);
throw [1, 2] as Bar;
function f(x = [5] as Foo.Bar) {}
```

#### `"never"`

完全禁止在数组字面量上进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const x = [1, 2] as Foo;
print([5] as Foo);
```

使用此选项时，以下是**正确**代码示例：

```ts
const x: Foo = [1, 2];
const x = [1, 2] satisfies Foo;
```

### assertionStyle

type: `"as" | "angle-bracket" | "never"`

强制使用哪种断言语法。

#### `"as"`

强制使用 `as` 语法进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const value = <Foo>bar;
```

使用此选项时，以下是**正确**代码示例：

```ts
const value = bar as Foo;
```

#### `"angle-bracket"`

强制使用尖括号语法进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const value = bar as Foo;
```

使用此选项时，以下是**正确**代码示例：

```ts
const value = <Foo>bar;
```

#### `"never"`

完全禁止类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const value = bar as Foo;
const value = <Foo>bar;
```

使用此选项时，以下是**正确**代码示例：

```ts
const value: Foo = bar;
const value = bar satisfies Foo;
```

### objectLiteralTypeAssertions

type: `"allow" | "allow-as-parameter" | "never"`

对象字面量类型断言是否允许、仅在作为参数时允许，或完全禁止。

#### `"allow"`

允许在对象字面量上进行类型断言。

使用此选项时，以下是**正确**代码示例：

```ts
const x = { a: 1 } as Foo;
const x = {} as Foo<int>;
```

#### `"allow-as-parameter"`

仅当对象字面量用作函数参数、
`throw` 目标或默认值时，才允许对其进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const x = { a: 1 } as Foo;
const x = {} as Foo<int>;
```

使用此选项时，以下是**正确**代码示例：

```ts
print({ a: 1 } as Foo);
throw { bar: 5 } as Foo;
function f(x = {} as Foo) {}
```

#### `"never"`

完全禁止在对象字面量上进行类型断言。

使用此选项时，以下是**错误**代码示例：

```ts
const x = { a: 1 } as Foo;
print({ a: 1 } as Foo);
```

使用此选项时，以下是**正确**代码示例：

```ts
const x: Foo = { a: 1 };
const x = { a: 1 } satisfies Foo;
```

## 如何使用

<RuleHowToUse />

## Version

此规则在 v1.44.0 中新增。

## References

<RuleReferences />
