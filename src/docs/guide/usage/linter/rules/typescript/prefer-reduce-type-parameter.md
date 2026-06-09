---
title: "typescript/prefer-reduce-type-parameter | Oxlint"
rule: "typescript/prefer-reduce-type-parameter"
category: "Style"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_fix"
upstream: "https://typescript-eslint.io/rules/prefer-reduce-type-parameter/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_reduce_type_parameter.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_reduce_type_parameter/prefer_reduce_type_parameter.go`;
</script>

<RuleHeader />

### 它的作用

此规则更倾向于在 `Array#reduce()` 中为累加器使用类型参数，而不是进行类型转换。

### 为什么这很糟糕？

`Array#reduce()` 可以使用泛型类型参数来指定累加器的类型。与对结果进行类型转换相比，这种方式更受推荐，因为它提供了更好的类型安全性，并且更明确地表达了预期类型。

### 示例

此规则的**错误**代码示例：

```ts
const numbers = [1, 2, 3];

// 对结果进行类型转换
const sum = numbers.reduce((acc, val) => acc + val, 0) as number;

// 在累加器上使用类型断言
const result = [1, 2, 3].reduce((acc: string[], curr) => {
  acc.push(curr.toString());
  return acc;
}, [] as string[]);
```

此规则的**正确**代码示例：

```ts
const numbers = [1, 2, 3];

// 使用类型参数
const sum = numbers.reduce<number>((acc, val) => acc + val, 0);

// 复杂类型使用类型参数
const result = [1, 2, 3].reduce<string[]>((acc, curr) => {
  acc.push(curr.toString());
  return acc;
}, []);

// 当 TypeScript 可以推断出类型时，不需要参数
const simpleSum = numbers.reduce((acc, val) => acc + val, 0);

// 带类型参数的对象累加器
interface Count {
  [key: string]: number;
}

const counts = ["a", "b", "a"].reduce<Count>((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
