---
title: "eslint/constructor-super | Oxlint"
rule: "eslint/constructor-super"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/constructor-super"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/constructor_super.rs`;
</script>

<RuleHeader />

### 作用

要求在派生类的构造函数中调用 `super()`，并禁止在非派生类的构造函数中调用 `super()`。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制进行此检查。

### 为什么不好？

在 JavaScript 中，必须在派生类（扩展另一个类的类）的构造函数中调用 `super()`。如果不这样做，将在运行时导致 ReferenceError。相反，在非派生类中调用 `super()` 是语法错误。

### 示例

此规则**不正确**代码的示例：

```js
// 缺少 super() 调用
class A extends B {
    constructor() { }
}

// 非派生类中的 super()
class A {
    constructor() {
        super();
    }
}

// 仅在某些代码路径中调用 super()
class C extends D {
    constructor() {
        if (condition) {
            super();
        }
    }
}
```

此规则**正确**代码的示例：

```js
// 派生类中正确的 super() 调用
class A extends B {
  constructor() {
    super();
  }
}

// 非派生类中无 super()
class A {
  constructor() {}
}

// 所有代码路径中都有 super()
class C extends D {
  constructor() {
    if (condition) {
      super();
    } else {
      super();
    }
  }
}
```

## 如何使用

<RuleHowToUse />

## Version

此规则在 v0.0.3 中添加。

## References

<RuleReferences />
