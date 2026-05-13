---
title: "eslint/no-empty-static-block | Oxlint"
rule: "eslint/no-empty-static-block"
category: "正确性"
version: "0.0.19"
default: true
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_empty_static_block.rs`;
</script>

<RuleHeader />

### 功能

不允许使用空的静态块。

### 为什么这不好？

空的块语句虽然严格来说不是错误，但通常是由于
未完成的重构导致的。它们在阅读代码时可能会造成困惑。

### 示例

以下是此规则的**错误**代码示例：

```js
class Foo {
  static {}
}
```

以下是此规则的**正确**代码示例：

```js
class Foo {
  static {
    // 带有注释的块是允许的
  }
}
class Bar {
  static {
    doSomething();
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.19 中添加的。

## 参考资料

<RuleReferences />
