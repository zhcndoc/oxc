---
title: "unicorn/prefer-dom-node-text-content"
category: "Style"
version: "0.0.21"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_dom_node_text_content.rs`;
</script>

<RuleHeader />

### 作用

强制在 DOM 节点上使用 `.textContent`，而不是 `.innerText`。

### 为什么这不好？

使用 .innerText 有一些缺点。

- `.innerText` 的性能开销大得多，因为它需要布局信息来返回结果。
- `.innerText` 仅针对 HTMLElement 对象定义，而 `.textContent` 针对所有 Node 对象定义。
- `.innerText` 不是标准的，例如，Firefox 中并没有它。

### 示例

此规则的**错误**代码示例：

```javascript
const text = foo.innerText;
```

此规则的**正确**代码示例：

```javascript
const text = foo.textContent;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.21 中新增。

## 参考资料

<RuleReferences />
