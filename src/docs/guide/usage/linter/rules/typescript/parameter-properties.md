---
title: "typescript/parameter-properties | Oxlint"
rule: "typescript/parameter-properties"
category: "Style"
version: "1.48.0"
default: false
type_aware: false
fix: "none"
upstream: "https://typescript-eslint.io/rules/parameter-properties/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/parameter_properties.rs`;
</script>

<RuleHeader />

### 它的作用

要求或禁止在类构造函数中使用参数属性。

### 为什么这不好？

混用参数属性和类属性声明会让
类风格不一致，并且更难维护。

### 示例

#### `{ "prefer": "class-property" }`（默认）

此规则的**错误**代码示例：

```ts
class Foo {
  constructor(private name: string) {}
}
```

此规则的**正确**代码示例：

```ts
class Foo {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

#### `{ "prefer": "parameter-property" }`

此规则的**错误**代码示例：

```ts
class Foo {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

此规则的**正确**代码示例：

```ts
class Foo {
  constructor(private name: string) {}
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `array`

default: `[]`

允许与参数属性或类属性一起使用的修饰符，具体取决于 `prefer` 选项。

#### allow[n]

type: `"private" | "private readonly" | "protected" | "protected readonly" | "public" | "public readonly" | "readonly"`

### prefer

type: `"class-property" | "parameter-property"`

default: `"class-property"`

是否更倾向于参数属性或类属性。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.48.0 中添加。

## 参考资料

<RuleReferences />
