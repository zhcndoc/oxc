---
title: "unicorn/prefer-modern-dom-apis | Oxlint"
rule: "unicorn/prefer-modern-dom-apis"
category: "Style"
version: "0.0.20"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_modern_dom_apis.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用：

- `childNode.replaceWith(newNode)`，而不是 `parentNode.replaceChild(newNode, oldNode)`
- `referenceNode.before(newNode)`，而不是 `parentNode.insertBefore(newNode, referenceNode)`
- `referenceNode.before('text')`，而不是 `referenceNode.insertAdjacentText('beforebegin', 'text')`
- `referenceNode.before(newNode)`，而不是 `referenceNode.insertAdjacentElement('beforebegin', newNode)`

### 为什么这不好？

使用较新的 DOM API 有一些优点，例如：

- 无需遍历到父节点。
- 可以一次追加多个节点。
- 既可以操作 `DOMString`，也可以操作 DOM 节点对象。

### 示例

以下是此规则的**错误**代码示例：

```javascript
oldChildNode.replaceWith(newChildNode);
```

以下是此规则的**正确**代码示例：

```javascript
parentNode.replaceChild(newChildNode, oldChildNode);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.20 中添加。

## 参考资料

<RuleReferences />
