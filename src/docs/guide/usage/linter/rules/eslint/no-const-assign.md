---
title: "eslint/no-const-assign"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_const_assign.rs`;
</script>

<RuleHeader />

### 作用

禁止重新赋值 `const` 变量。

### 为什么不好？

我们无法修改使用 `const` 关键字声明的变量，因为这会引发运行时错误。

注意，此规则对于 TypeScript 代码并非必要，因为 TypeScript 已经会将此捕获为错误。

### 示例

此规则的 **错误** 代码示例：

```js
const a = 0;
a = 1;

const b = 0;
b += 1;
```

此规则的 **正确** 代码示例：

```js
const a = 0;
console.log(a);

var b = 0;
b += 1;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.3 中添加的。

## 参考资料

<RuleReferences />
