---
title: "unicorn/prefer-add-event-listener | Oxlint"
rule: "unicorn/prefer-add-event-listener"
category: "Suspicious"
version: "0.0.16"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_add_event_listener.rs`;
</script>

<RuleHeader />

### 作用

强制使用 `.addEventListener()` 和 `.removeEventListener()`，而不是它们对应的 `on` 函数形式。

例如，对于 HTML DOM 事件，`foo.addEventListener('click', handler);` 优先于 `foo.onclick = handler;`。

### 这为什么不好？

使用 [`addEventListener` 有许多优点](https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick/35093997#35093997)。这些优点包括注册无限个事件处理器，以及可选地让事件处理器只被调用一次。

### 示例

此规则的**错误**代码示例：

```javascript
foo.onclick = () => {};
```

此规则的**正确**代码示例：

```javascript
foo.addEventListener("click", () => {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
