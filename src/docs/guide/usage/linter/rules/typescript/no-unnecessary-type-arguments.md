---
title: "typescript/no-unnecessary-type-arguments"
category: "可疑"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_type_arguments.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_type_arguments/no_unnecessary_type_arguments.go`;
</script>

<RuleHeader />

### 作用

此规则不允许与默认类型参数相同的类型实参。

### 为什么这不好？

显式指定与默认值相同的类型实参是没有必要的，并且会给代码增加视觉噪音。TypeScript 会自动推断这些类型。

### 示例

此规则的**错误**代码示例：

```ts
function identity<T = string>(arg: T): T {
  return arg;
}

// 不必要的类型实参 - string 是默认值
const result = identity<string>("hello");

interface Container<T = number> {
  value: T;
}

// 不必要的类型实参 - number 是默认值
const container: Container<number> = { value: 42 };

class MyClass<T = boolean> {
  constructor(public value: T) {}
}

// 不必要的类型实参 - boolean 是默认值
const instance = new MyClass<boolean>(true);
```

此规则的**正确**代码示例：

```ts
function identity<T = string>(arg: T): T {
  return arg;
}

// 使用默认类型
const result1 = identity("hello");

// 使用不同类型
const result2 = identity<number>(42);

interface Container<T = number> {
  value: T;
}

// 使用默认类型
const container1: Container = { value: 42 };

// 使用不同类型
const container2: Container<string> = { value: "hello" };
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考资料

<RuleReferences />
