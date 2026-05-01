---
title: "unicorn/error-message"
category: "Style"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/error_message.rs`;
</script>

<RuleHeader />

### 它的作用

强制在创建内置 `Error` 对象时提供 `message`，以
提高可读性和调试体验。

### 这为什么不好？

抛出一个没有消息的 `Error`，例如 `throw new Error()`，不会提供关于
出错原因的上下文，使调试更加困难。清晰的错误消息可以提升
代码清晰度，并帮助开发者快速定位问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
throw Error();
throw new TypeError();
```

以下是此规则的**正确**代码示例：

```javascript
throw new Error("Unexpected token");
throw new TypeError("Number expected");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
