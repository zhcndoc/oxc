---
title: "eslint/no-this-before-super | Oxlint"
rule: "eslint/no-this-before-super"
category: "正确性"
version: "0.2.6"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_this_before_super.rs`;
</script>

<RuleHeader />

### 作用

要求在使用 `this` 或 `super` 之前先调用 `super()`。

如果是 TypeScript 代码，可以禁用此规则，因为 TypeScript 编译器
已经强制执行了这一检查。

### 为什么这不好？

在派生类的构造函数中，如果在调用 `super()` 之前使用了 `this`/`super`，
就会抛出 `ReferenceError`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
class A1 extends B {
  constructor() {
    // 必须先调用 super()
    this.a = 0;
    super();
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.2.6。

## 参考资料

<RuleReferences />
