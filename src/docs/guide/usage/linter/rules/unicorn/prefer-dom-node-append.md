---
title: "unicorn/prefer-dom-node-append"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_dom_node_append.rs`;
</script>

<RuleHeader />

### 作用

强制对 DOM 节点使用例如 `document.body.append(div);`，而不是 `document.body.appendChild(div);`。

### 为什么这不好？

使用 [`Node#append()`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append) 有一些优点，例如可以追加多个节点，以及可以同时追加 [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) 和 DOM 节点对象。

### 示例

以下是此规则的**错误**代码示例：

```javascript
foo.appendChild(bar);
```

以下是此规则的**正确**代码示例：

```javascript
foo.append(bar);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
