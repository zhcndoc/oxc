---
title: "unicorn/prefer-global-this | Oxlint"
rule: "unicorn/prefer-global-this"
category: "Style"
version: "0.16.12"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_global_this.rs`;
</script>

<RuleHeader />

### 作用

强制使用 [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 代替
特定环境的全局对象别名（`window`、`self` 或 `global`）。

使用标准的 `globalThis` 可以使你的代码在浏览器、Web Workers、Node.js，
以及未来的 JavaScript 运行时之间保持可移植性。

### 为什么这不好？

**可移植性** – `window` 只在浏览器主线程中定义，`self` 用于 Web Workers，
而 `global` 是 Node 特有的。选择错误的别名会导致代码在原始环境之外执行时发生运行时崩溃。

**清晰性** – `globalThis` 清楚地表明你指的是全局对象本身，
而不是某个特定平台。

### 示例

以下是此规则的**错误**代码示例：

```js
// 仅限浏览器
window.alert("Hi");

// 仅限 Node
if (typeof global.Buffer !== "undefined") {
}

// 仅限 Web Worker
self.postMessage("done");
```

以下是此规则的**正确**代码示例：

```js
globalThis.alert("Hi");

if (typeof globalThis.Buffer !== "undefined") {
}

globalThis.postMessage("done");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.12 中添加。

## 参考资料

<RuleReferences />
