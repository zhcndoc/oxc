---
title: "eslint/no-func-assign"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_func_assign.rs`;
</script>

<RuleHeader />

### 它的作用

禁止重新赋值 `function` 声明。

由于 TypeScript 编译器会强制执行此检查，因此可以在 TypeScript 代码中禁用此规则。

### 为什么这不好？

覆盖/重新赋值一个以 FunctionDeclaration 形式编写的函数，通常表明存在
错误或问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function foo() {}
foo = bar;
```

```javascript
function foo() {
  foo = bar;
}
```

```javascript
let a = function hello() {
  hello = 123;
};
```

以下是此规则的**正确**代码示例：

```javascript
let foo = function () {};
foo = bar;
```

```javascript
function baz(baz) {
  // `baz` 被遮蔽了。
  baz = bar;
}
```

```
function qux() {
  const qux = bar;  // `qux` 被遮蔽了。
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.3 中添加的。

## 参考资料

<RuleReferences />
