---
title: "promise/spec-only | Oxlint"
rule: "promise/spec-only"
category: "Restriction"
version: "0.9.2"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/spec-only.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/spec_only.rs`;
</script>

<RuleHeader />

### 作用

禁止使用非标准的 Promise 静态方法。

### 为什么这不好？

非标准的 Promise 可能会带来更多维护工作。

### 示例

以下是此规则的**错误**代码示例：

```js
Promise.done();
```

以下是此规则的**正确**代码示例：

```js
Promise.resolve();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowedMethods

type: `string[]`

default: `null`

允许使用的 Promise 静态方法列表。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v0.9.2 中添加。

## 参考资料

<RuleReferences />
