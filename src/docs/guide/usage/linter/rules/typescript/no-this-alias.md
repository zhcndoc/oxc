---
title: "typescript/no-this-alias"
category: "Correctness"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_this_alias.rs`;
</script>

<RuleHeader />

### 作用

禁止为 `this` 起别名。

### 为什么这不好？

将变量赋值为 `this`，而不是正确地使用箭头函数，可能表明这是 ES2015 之前的写法，或者说明没有很好地管理作用域。

### 示例

以下是此规则的**错误**代码示例：

```js
const self = this;

setTimeout(function () {
  self.doWork();
});
```

以下是此规则的**正确**代码示例：

```js
setTimeout(() => {
  this.doWork();
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowDestructuring

type: `boolean`

default: `true`

是否允许将 `this` 解构到局部变量中。

### allowedNames

type: `string[]`

default: `[]`

允许作为 `this` 别名的变量名数组。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v0.0.7 中添加。

## 参考资料

<RuleReferences />
