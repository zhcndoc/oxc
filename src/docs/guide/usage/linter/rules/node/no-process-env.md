---
title: "node/no-process-env | Oxlint"
rule: "node/no-process-env"
category: "Restriction"
version: "1.23.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_process_env.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `process.env`。

### 这为什么不好？

直接读取 `process.env` 可能导致隐式的运行时配置，
使代码更难测试，并绕过配置验证。

### 示例

以下是此规则的**不正确**代码示例：

```js
if (process.env.NODE_ENV === "development") {
  // ...
}
```

以下是此规则的**正确**代码示例：

```js
import config from "./config";

if (config.env === "development") {
  //...
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowedVariables

type: `string[]`

default: `[]`

允许在 `process.env` 上访问的变量名。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.23.0 中添加。

## 参考

<RuleReferences />
