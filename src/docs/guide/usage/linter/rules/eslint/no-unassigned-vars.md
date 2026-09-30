---
title: "eslint/no-unassigned-vars | Oxlint"
rule: "eslint/no-unassigned-vars"
category: "Correctness"
version: "1.10.0"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-unassigned-vars"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unassigned_vars.rs`;
</script>

<RuleHeader />

### 作用

禁止读取但从未赋值的 let 或 var 变量。

#### 忽略的文件

此规则会完全忽略 `.svelte` 和 `.vue` 文件。Oxlint 只解析这些文件的 `<script>` 块，因此由模板赋值的绑定看起来像从未被赋值。在 Svelte 中，模板通过 `bind:this={el}` 和 `bind:value={x}` 写入；在 Vue 中，`<script setup>` 中的 `let` 是一个 `setup-let` 绑定，`v-model="x"` 和 `@click="x = 1"` 等内联处理程序会直接为其赋值。

### 为什么这是不好的做法？

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
