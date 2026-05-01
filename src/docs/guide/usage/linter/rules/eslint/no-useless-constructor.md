---
title: "eslint/no-useless-constructor"
category: "可疑"
version: "0.4.4"
default: false
type_aware: false
fix: "可修复建议"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_constructor.rs`;
</script>

<RuleHeader />

### 它的作用

禁止可以在不改变类工作方式的情况下安全移除的构造函数。

### 为什么这不好？

如果未指定构造函数，ES2015 会提供一个默认的类构造函数。因此，提供一个空构造函数，或者一个仅仅委托给其父类的构造函数，都是没有必要的。

::: warning
注意：此 lint 规则会报告那些唯一目的在于更改父类构造函数可见性，或通过修饰符暴露参数属性的构造函数。这是因为该规则没有类型信息来判断父类构造函数是 `public`、`protected` 还是 `private`。
:::

### 示例

以下是此规则**错误**代码示例：

```javascript
class A {
  constructor() {}
}

class B extends A {
  constructor(...args) {
    super(...args);
  }
}
```

以下是此规则**正确**代码示例：

```javascript
class A {}

class B {
  constructor() {
    doSomething();
  }
}

class C extends A {
  constructor() {
    super("foo");
  }
}

class D extends A {
  constructor() {
    super();
    doSomething();
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中添加。

## 参考资料

<RuleReferences />
