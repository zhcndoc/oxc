---
title: "node/no-top-level-await | Oxlint"
rule: "node/no-top-level-await"
category: "限制"
version: "1.75.0"
default: false
type_aware: false
fix: "无"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-top-level-await.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_top_level_await.rs`;
</script>

<RuleHeader />

### 功能

禁止使用顶层 `await`，包括不嵌套在函数内部的
`for await...of` 循环和 `await using` 声明。

### 为什么这不好？

Node.js v20.19 引入了 `require(esm)`，但包含顶层
`await` 的 ES 模块无法通过 `require(esm)` 加载。避免使用顶层 `await`
可以使模块既能通过 CommonJS 的 `require()` 加载，也能通过 ESM 的
`import` 导入。

### 示例

此规则下的**错误**代码示例：

```js
const foo = await import("foo");

for await (const e of asyncIterate()) {
  // ...
}
```

此规则下的**正确**代码示例：

```js
async function fn() {
  const foo = await import("foo");
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreBin

类型：`boolean`

默认值：`false`

如果为 `true`，则以 hashbang（`#!`）开头的文件中允许使用顶层
`await`；hashbang 表明这些文件是可执行脚本，而不是可导入的模块。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.75.0 中添加。

## 参考资料

<RuleReferences />
