---
title: "eslint/no-plusplus | Oxlint"
rule: "eslint/no-plusplus"
category: "Restriction"
version: "0.9.5"
default: false
type_aware: false
fix: "条件建议"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_plusplus.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用一元运算符 `++` 和 `--`。

### 为什么这不好？

因为一元 `++` 和 `--` 运算符会受到自动分号插入的影响，空白字符的差异可能会改变源代码的语义。例如，这两个代码块并不等价：

```js
var i = 10;
var j = 20;

i++;
j;
// => i = 11, j = 20
```

```js
var i = 10;
var j = 20;

i;
++j;
// => i = 10, j = 21
```

### 示例

此规则的**错误**代码示例：

```js
var x = 0;
x++;
var y = 0;
y--;
for (let i = 0; i < l; i++) {
  doSomething(i);
}
```

此规则的**正确**代码示例：

```js
var x = 0;
x += 1;
var y = 0;
y -= 1;
for (let i = 0; i < l; i += 1) {
  doSomething(i);
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowForLoopAfterthoughts

type: `boolean`

default: `false`

是否允许在 for 循环的 afterthoughts 中使用 `++` 和 `--`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.9.5 中添加。

## 参考资料

<RuleReferences />
