---
title: "unicorn/prefer-object-from-entries"
category: "Style"
version: "0.16.12"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_object_from_entries.rs`;
</script>

<RuleHeader />

### 它的作用

鼓励在将键值对数组转换为对象时使用 `Object.fromEntries`。

### 为什么这不好？

使用 `reduce` 或 `forEach` 手动根据键值对构建对象更加冗长、容易出错，也更难理解。`Object.fromEntries` 方法更清晰、更具声明性，并且就是为此目的而设计的。

### 示例

以下是此规则的**错误**代码示例：

```js
const result = pairs.reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});

const result = {};
pairs.forEach(([key, value]) => {
  result[key] = value;
});
```

以下是此规则的**正确**代码示例：

```js
const result = Object.fromEntries(pairs);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### functions

type: `string[]`

default: `["_.fromPairs", "lodash.fromPairs"]`

要视为 `Object.fromEntries` 等价项的其他函数。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.12 中添加。

## 参考资料

<RuleReferences />
