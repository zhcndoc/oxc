---
title: "eslint/getter-return"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/getter_return.rs`;
</script>

<RuleHeader />

### 作用

要求所有 getter 都有一个 `return` 语句。

### 为什么不好？

Getter 应该始终返回一个值。如果没有，那可能是一个错误。

此规则不在 TypeScript 文件上运行，因为类型检查会
捕获没有返回值的 getter。

### 示例

此规则 **错误** 代码的示例：

```javascript
class Person {
  get name() {
    // 没有 return
  }
}

const obj = {
  get foo() {
    // 对象 getter 也会被检查
  },
};
```

此规则 **正确** 代码的示例：

```javascript
class Person {
  get name() {
    return this._name;
  }
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowImplicit

type: `boolean`

default: `false`

当设置为 `true` 时，允许 getter 通过包含无表达式的 `return` 语句隐式返回 `undefined`。

## 使用方法

<RuleHowToUse />

## 版本

此规则是在 v0.0.3 中添加的。

## 参考资料

<RuleReferences />
