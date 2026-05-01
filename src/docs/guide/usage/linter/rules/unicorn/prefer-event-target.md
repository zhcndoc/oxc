---
title: "unicorn/prefer-event-target"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_event_target.rs`;
</script>

<RuleHeader />

### 作用

更倾向于使用 `EventTarget` 而不是 `EventEmitter`。

这条规则可以减小打包体积，并使你的代码更具跨平台友好性。

请参阅 `EventEmitter` 和 `EventTarget` 之间的[差异](https://nodejs.org/api/events.html#eventtarget-and-event-api)。

### 为什么这不好？

虽然 [`EventEmitter`](https://nodejs.org/api/events.html#class-eventemitter) 仅在 Node.js 中可用，但 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) 在 _Deno_ 和浏览器中也可用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
class Foo extends EventEmitter {}
```

以下是此规则的**正确**代码示例：

```javascript
class Foo extends OtherClass {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.18 中添加的。

## 参考资料

<RuleReferences />
