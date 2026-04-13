---
title: "eslint/accessor-pairs"
category: "Pedantic"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/accessor_pairs.rs`;
</script>

<RuleHeader />

### 作用

强制在对象和类中使用 getter/setter 对。

### 为什么不好？

在 JavaScript 中，创建一个只有 setter 而没有对应 getter 的对象是一个常见错误。
如果没有 getter，你就无法读取该属性，因此它最终不会被使用。

### 示例

此规则**不正确**的代码示例：

```js
var o = {
  set a(value) {
    this.val = value;
  },
};

class C {
  set a(value) {
    this.val = value;
  }
}
```

此规则**正确**的代码示例：

```js
var o = {
  set a(value) {
    this.val = value;
  },
  get a() {
    return this.val;
  },
};

class C {
  set a(value) {
    this.val = value;
  }
  get a() {
    return this.val;
  }
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### enforceForClassMembers

type: `boolean`

default: `true`

对类成员强制此规则。

### enforceForTSTypes

type: `boolean`

default: `false`

对 TypeScript 接口和类型强制此规则。

### getWithoutSet

type: `boolean`

default: `false`

报告没有 setter 的 getter。

### setWithoutGet

type: `boolean`

default: `true`

报告没有 getter 的 setter。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
