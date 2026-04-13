---
title: "eslint/array-callback-return"
category: "Pedantic"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/array_callback_return/mod.rs`;
</script>

<RuleHeader />

### 作用

强制要求在数组方法的回调中使用 return 语句。

### 为什么不好？

数组有多种用于过滤、映射和折叠的方法。
如果我们在这些方法的回调中忘记编写 return 语句，这可能是一个错误。
如果你不想使用 return 或不需要返回结果，
请考虑改用 .forEach。

### 示例

此规则 **错误** 代码示例：

```javascript
let foo = [1, 2, 3, 4];
foo.map((a) => {
  console.log(a);
});
```

此规则 **正确** 代码示例：

```javascript
let foo = [1, 2, 3, 4];
foo.map((a) => {
  console.log(a);
  return a;
});
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowImplicit

type: `boolean`

default: `false`

当设置为 true 时，允许需要返回值的方法的回调
通过包含无表达式的 return 语句隐式返回 undefined。

### allowVoid

type: `boolean`

default: `false`

当设置为 true 时，规则不会报告带有 void 操作符的返回值。
仅在 `checkForEach` 选项设置为 true 时有效。

### checkForEach

type: `boolean`

default: `false`

当设置为 true 时，规则还会报告返回值的 forEach 回调。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
