---
title: "eslint/no-class-assign | Oxlint"
rule: "eslint/no-class-assign"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-class-assign"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_class_assign.rs`;
</script>

<RuleHeader />

### 它的作用

禁止重新赋值类变量。

如果是 TypeScript 代码，则可以禁用此规则，因为 TypeScript 编译器会强制执行此检查。

### 为什么这不好？

`ClassDeclaration` 会创建一个可以重新赋值的变量，但在大多数情况下，重新赋值都是一个错误。

### 示例

此规则的**错误**代码示例：

```javascript
class A {}
A = 0;
```

```javascript
A = 0;
class A {}
```

```javascript
class A {
  b() {
    A = 0;
  }
}
```

```javascript
let A = class A {
  b() {
    A = 0;
    // `let A` 被类名遮蔽了。
  }
};
```

此规则的**正确**代码示例：

```javascript
let A = class A {};
A = 0; // A 是一个变量。
```

```javascript
let A = class {
  b() {
    A = 0; // A 是一个变量。
  }
};
```

```javascript
class A {
  b(A) {
    A = 0; // A 是一个参数。
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
