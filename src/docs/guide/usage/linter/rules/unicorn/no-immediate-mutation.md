---
title: "unicorn/no-immediate-mutation | Oxlint"
rule: "unicorn/no-immediate-mutation"
category: "Pedantic"
version: "1.35.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_immediate_mutation.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在变量初始化后立即修改该变量。

### 为什么这不好？

当你初始化一个变量后又立即修改它时，最好直接在初始化时包含
这个修改。这样可以使代码更易读，并减少
语句数量。

### 示例

以下是此规则的**错误**代码示例：

```js
const array = [1, 2];
array.push(3);

const object = { foo: 1 };
object.bar = 2;

const set = new Set([1, 2]);
set.add(3);

const map = new Map([["foo", 1]]);
map.set("bar", 2);
```

以下是此规则的**正确**代码示例：

```js
const array = [1, 2, 3];

const object = { foo: 1, bar: 2 };

const set = new Set([1, 2, 3]);

const map = new Map([
  ["foo", 1],
  ["bar", 2],
]);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.35.0 中添加。

## 参考资料

<RuleReferences />
