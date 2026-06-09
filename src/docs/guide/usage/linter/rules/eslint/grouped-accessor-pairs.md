---
title: "eslint/grouped-accessor-pairs | Oxlint"
rule: "eslint/grouped-accessor-pairs"
category: "Style"
version: "0.15.12"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.org/docs/latest/rules/grouped-accessor-pairs"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/grouped_accessor_pairs.rs`;
</script>

<RuleHeader />

### 作用

要求在对象字面量和类中将访问器对分组。

### 为什么不好？

虽然在对象或类定义中的任何位置定义 getter 或 setter 对都是允许的，但最佳实践是将同一属性的访问器函数分组。

### 示例

此规则 **错误** 代码示例：

```js
const foo = {
  get a() {
    return this.val;
  },
  b: 1,
  set a(value) {
    this.val = value;
  },
};
```

此规则 **正确** 代码示例：

```js
const foo = {
  get a() {
    return this.val;
  },
  set a(value) {
    this.val = value;
  },
  b: 1,
};
```

使用 `getBeforeSet` 选项时此规则 **错误** 代码示例：

```js
const foo = {
  set a(value) {
    this.val = value;
  },
  get a() {
    return this.val;
  },
};
```

使用 `getBeforeSet` 选项时此规则 **正确** 代码示例：

```js
const foo = {
  get a() {
    return this.val;
  },
  set a(value) {
    this.val = value;
  },
};
```

使用 `setBeforeGet` 选项时此规则 **错误** 代码示例：

```js
const foo = {
  get a() {
    return this.val;
  },
  set a(value) {
    this.val = value;
  },
};
```

使用 `setBeforeGet` 选项时此规则 **正确** 代码示例：

```js
const foo = {
  set a(value) {
    this.val = value;
  },
  get a() {
    return this.val;
  },
};
```

## 配置

### 第一个选项

type: `"anyOrder" | "getBeforeSet" | "setBeforeGet"`

#### `"anyOrder"`

访问器可以是任意顺序。这是默认值。

#### `"getBeforeSet"`

getter 必须在 setter 之前。

#### `"setBeforeGet"`

setter 必须在 getter 之前。

### 第二个选项

此选项是一个对象，包含以下属性：

#### enforceForTSTypes

type: `boolean`

default: `false`

当启用 `enforceForTSTypes` 时，此规则也适用于 TypeScript 接口和类型别名。

**错误** 的 TypeScript 代码示例：

```ts
interface Foo {
  get a(): string;
  someProperty: string;
  set a(value: string);
}

type Bar = {
  get b(): string;
  someProperty: string;
  set b(value: string);
};
```

**正确** 的 TypeScript 代码示例：

```ts
interface Foo {
  get a(): string;
  set a(value: string);
  someProperty: string;
}

type Bar = {
  get b(): string;
  set b(value: string);
  someProperty: string;
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.12 中添加。

## 参考资料

<RuleReferences />
