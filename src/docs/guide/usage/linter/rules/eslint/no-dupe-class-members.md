---
title: "eslint/no-dupe-class-members | Oxlint"
rule: "eslint/no-dupe-class-members"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-dupe-class-members"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_dupe_class_members.rs`;
</script>

<RuleHeader />

### 作用

禁止重复的类成员。

对于 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器会强制进行此检查。

### 为什么不好？

如果类成员中存在相同名称的声明，最后的声明会静默覆盖其他声明。这可能导致意外行为。

### 示例

此规则**不正确**代码的示例：

```javascript
class A {
  foo() {
    console.log("foo");
  }
  foo = 123;
}
let a = new A();
a.foo(); // 未捕获的 TypeError: a.foo 不是函数
```

此规则**正确**代码的示例：

```javascript
class A {
  foo() {
    console.log("foo");
  }
}
let a = new A();
a.foo();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.3 中添加的。

## 参考资料

<RuleReferences />
