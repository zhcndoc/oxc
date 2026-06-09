---
title: "unicorn/require-post-message-target-origin | Oxlint"
rule: "unicorn/require-post-message-target-origin"
category: "Suspicious"
version: "0.15.15"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/require_post_message_target_origin.rs`;
</script>

<RuleHeader />

### 它的作用

强制在使用 `window.postMessage()` 时传入 `targetOrigin` 参数。

请注意，此规则可能会产生误报，因为在没有类型信息的情况下，它无法正确检测所有情况。因此，在 `postMessage()` 可能与 `BroadcastChannel` 或 worker/service worker 上下文一起使用的场景中，启用此规则可能并不是个好主意（例如，`WorkerGlobalScope#postMessage`，其中第二个参数是传递列表或选项对象，而不是 `targetOrigin`）。

### 为什么这很糟糕？

在调用 `window.postMessage()` 时如果不传入 `targetOrigin` 参数，任何窗口都无法接收该消息。

### 示例

此规则的**错误**代码示例：

```js
window.postMessage(message);
```

此规则的**正确**代码示例：

```js
window.postMessage(message, "https://example.com");

window.postMessage(message, "*");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.15 中添加。

## 参考资料

<RuleReferences />
