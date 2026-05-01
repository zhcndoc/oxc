---
title: "unicorn/no-static-only-class"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_static_only_class.rs`;
</script>

<RuleHeader />

### 它的作用

禁止仅包含 `static` 成员的 `class` 声明。

### 为什么这不好？

只有 `static` 成员的 `class` 应该直接定义为对象。

### 示例

以下是此规则的**错误**代码示例：

```javascript
class A {
  static a() {}
}
```

以下是此规则的**正确**代码示例：

```javascript
class A {
  static a() {}

  constructor() {}
}
```

```javascript
const X = {
  foo: false,
  bar() {},
};
```

```javascript
class X {
  static #foo = false; // 私有字段
  static bar() {}
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
