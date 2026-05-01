---
title: "oxc/no-rest-spread-properties"
category: "Restriction"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_rest_spread_properties.rs`;
</script>

<RuleHeader />

### 作用

禁止 [对象 Rest/Spread 属性](https://github.com/tc39/proposal-object-rest-spread#readme)。

### 为什么这不好？

对象 rest/spread 属性是相对较新的 JavaScript 特性，可能
并非所有目标环境都支持。如果你需要支持不支持这些特性的较旧
浏览器或 JavaScript 引擎，使用它们
可能会导致运行时错误。此规则通过阻止使用这些现代语法特性，
帮助保持与较旧环境的兼容性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let { x, ...y } = z;
let z = { x, ...y };
```

## 配置

此规则接受一个包含以下属性的配置对象：

### objectRestMessage

type: `string`

default: `""`

当找到对象 rest 属性时显示的消息。

### objectSpreadMessage

type: `string`

default: `""`

当找到对象 spread 属性时显示的消息。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中添加。

## 参考

<RuleReferences />
