---
title: "unicorn/explicit-timer-delay | Oxlint"
rule: "unicorn/explicit-timer-delay"
category: "样式"
version: "1.73.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-timer-delay.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/explicit_timer_delay.rs`;
</script>

<RuleHeader />

### 功能

强制要求或禁止为 `setTimeout()` 和
`setInterval()` 显式提供 `delay` 参数。

### 为什么这不好？

使用 `setTimeout()` 或 `setInterval()` 时，`delay` 参数是
可选的，默认为 `0`。此规则允许你强制要求始终显式提供或省略
`delay` 参数（当其值为 `0` 时）。

### 示例

以下是此规则的**错误**代码示例：

```javascript
setTimeout(() => console.log("Hello"));
setInterval(callback);
window.setTimeout(() => console.log("Hello"));
globalThis.setInterval(callback);
```

以下是此规则的**正确**代码示例：

```javascript
setTimeout(() => console.log("Hello"), 0);
setInterval(callback, 0);
window.setTimeout(() => console.log("Hello"), 0);
globalThis.setInterval(callback, 0);
setTimeout(() => console.log("Hello"), 1000);
setInterval(callback, 100);
```

使用 `"never"` 选项时，不允许显式指定 `0` 延迟，
但仍允许指定非零延迟。

以下是使用 `"never"` 选项时的**错误**代码示例：

```javascript
setTimeout(() => console.log("Hello"), 0);
setInterval(callback, 0);
window.setTimeout(() => console.log("Hello"), 0);
globalThis.setInterval(callback, 0);
```

以下是使用 `"never"` 选项时的**正确**代码示例：

```javascript
setTimeout(() => console.log("Hello"));
setInterval(callback);
window.setTimeout(() => console.log("Hello"));
globalThis.setInterval(callback);
setTimeout(() => console.log("Hello"), 1000);
globalThis.setInterval(callback, 100);
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

为明确起见，要求显式传入 `delay` 参数。

### `"never"`

不允许显式设置 `0` 延迟，建议使用隐式默认值。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.73.0 中添加。

## 参考资料

<RuleReferences />
