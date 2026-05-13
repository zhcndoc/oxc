---
title: "typescript/prefer-includes | Oxlint"
rule: "typescript/prefer-includes"
category: "Pedantic"
version: "1.29.0"
default: false
type_aware: true
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_includes.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_includes/prefer_includes.go`;
</script>

<RuleHeader />

### 作用

强制使用 `.includes()`，而不是 `.indexOf() !== -1` 或 `/regex/.test()`。

### 为什么这不好？

与检查 `.indexOf() !== -1` 相比，`.includes()` 更易读，也更具表达性。
它清楚地传达了检查某个值是否存在的意图。
此外，对于简单的字符串搜索，`.includes()` 往往比正则表达式 `.test()` 更受青睐，因为它性能更好，也更清晰。

### 示例

此规则的**错误**代码示例：

```ts
// 使用 indexOf
const str = "hello world";
if (str.indexOf("world") !== -1) {
  console.log("found");
}

if (str.indexOf("world") != -1) {
  console.log("found");
}

if (str.indexOf("world") > -1) {
  console.log("found");
}

// 对简单字符串使用正则 test
if (/world/.test(str)) {
  console.log("found");
}

// 数组
const arr = [1, 2, 3];
if (arr.indexOf(2) !== -1) {
  console.log("found");
}
```

此规则的**正确**代码示例：

```ts
// 字符串使用 includes
const str = "hello world";
if (str.includes("world")) {
  console.log("found");
}

// 数组使用 includes
const arr = [1, 2, 3];
if (arr.includes(2)) {
  console.log("found");
}

// 允许复杂的正则模式
if (/wo+rld/.test(str)) {
  console.log("found");
}

// 带标志位的正则
if (/world/i.test(str)) {
  console.log("found");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.29.0 中添加。

## 参考资料

<RuleReferences />
