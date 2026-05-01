---
title: "eslint/no-unassigned-vars"
category: "正确性"
version: "1.10.0"
default: true
type_aware: false
fix: "none"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unassigned_vars.rs`;
</script>

<RuleHeader />

### 作用

禁止读取但从未赋值的 let 或 var 变量。

### 为什么这不好？

此规则会标记那些从未被赋值、但仍在代码中被读取或使用的 let 或 var 声明。
由于这些变量的值始终为 `undefined`，它们的使用很可能是编程错误。

### 示例

此规则的**错误**代码示例：

```js
let status;
if (status === "ready") {
  console.log("Ready!");
}
```

此规则的**正确**代码示例：

```js
let message = "hello";
console.log(message);

let user;
user = getUser();
console.log(user.name);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.10.0。

## 参考资料

<RuleReferences />
