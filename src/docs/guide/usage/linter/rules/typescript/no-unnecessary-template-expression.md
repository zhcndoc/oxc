---
title: "typescript/no-unnecessary-template-expression | Oxlint"
rule: "typescript/no-unnecessary-template-expression"
category: "Suspicious"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_template_expression.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_template_expression/no_unnecessary_template_expression.go`;
</script>

<RuleHeader />

### 它的作用

不允许可以简化的、不必要的模板表达式（插值）。

### 为什么这不好？

带有不必要替换表达式的模板字面量会增加复杂度，却没有带来任何好处。静态字符串字面量表达式，或者已经是字符串的表达式，都可以简化。

注意：此规则不会标记没有替换表达式的模板字面量。
例如，`` `hello` `` 是允许的，即使它可以写成 `'hello'`。

### 示例

以下是此规则的**错误**代码示例：

```ts
// 静态值可以并入周围的模板中
const ab1 = `${"a"}${"b"}`;
const ab2 = `a${"b"}`;

const stringWithNumber = `${"1 + 1 = "}${2}`;
const stringWithBoolean = `${"true is "}${true}`;

// 已经是字符串的表达式可以不使用模板重写
const text = "a";
const wrappedText = `${text}`;

declare const intersectionWithString: string & { _brand: "test-brand" };
const wrappedIntersection = `${intersectionWithString}`;
```

以下是此规则的**正确**代码示例：

```ts
// 静态值并入模板中
const ab1 = `ab`;

// 带有非平凡插值的模板
const name = "world";
const greeting = `Hello ${name}!`;

// 带有表达式的模板
const result = `Result: ${1 + 2}`;

// 简单字符串不需要模板
const text = "a";
const wrappedText = text;

// 多行字符串没有问题
const multiline = `
  Hello
  world
`;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
