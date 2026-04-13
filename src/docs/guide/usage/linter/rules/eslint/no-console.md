---
title: "eslint/no-console"
category: "Restriction"
default: false
type_aware: false
fix: "conditional_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_console.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 console。

### 为什么不好？

在旨在浏览器中执行的 JavaScript 中，避免使用 console 上的方法被视为最佳实践。此类消息被认为是用于调试目的，因此不适合发布给客户端。通常，在使用 console 调用之前应该将其剥离，然后再推送到生产环境。

### 示例

此规则的 **错误** 代码示例：

```javascript
console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
console.log = foo();
```

此规则的 **正确** 代码示例：

```javascript
// 自定义 console
Console.log("Hello world!");
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allow

类型：`string[]`

默认值：`[]`

`allow` 选项允许将给定的 console 方法列表作为此规则的例外使用。

假设选项配置为 `{ "allow": ["info"] }`，则规则的行为如下：

此选项的 **错误** 代码示例：

```javascript
console.log("foo");
```

此选项的 **正确** 代码示例：

```javascript
console.info("foo");
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
