---
title: "eslint/no-extend-native"
category: "Suspicious"
version: "0.9.7"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_extend_native.rs`;
</script>

<RuleHeader />

### 它的作用

阻止使用新属性扩展 `Object`、`String` 或 `Array` 等原生全局对象。

### 为什么这不好？

扩展原生对象可能会导致意外行为，并与其他代码产生冲突。

例如：

```js
// 添加一个新属性，这看起来似乎没问题
Object.prototype.extra = 55;

// 定义一个用户对象
const users = {
  1: "user1",
  2: "user2",
};

for (const id in users) {
  // 这也会打印 "extra" 以及 "1" 和 "2"：
  console.log(id);
}
```

### 示例

此规则的**错误**代码示例：

```js
Object.prototype.p = 0;
Object.defineProperty(Array.prototype, "p", { value: 0 });
```

此规则的**正确**代码示例：

```js
x.prototype.p = 0;
Object.defineProperty(x.prototype, "p", { value: 0 });
```

## 配置

此规则接受一个包含以下属性的配置对象：

### exceptions

type: `string[]`

default: `[]`

允许作为该规则例外的对象列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.9.7 中添加。

## 参考资料

<RuleReferences />
